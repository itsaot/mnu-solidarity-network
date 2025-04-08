
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { sendEmail, formatAffiliationEmailBody, validateSAID, extractAgeFromSAID } from "@/services/emailService";
import { savePendingSubmission } from "@/services/pendingSubmissions";
import PendingSubmissionsManager from "@/components/PendingSubmissionsManager";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters" }),
  idNumber: z.string().refine(validateSAID, {
    message: "Please enter a valid 13-digit South African ID number",
  }),
  gender: z.string().min(1, { message: "Please select your gender" }),
  sector: z.string().min(1, { message: "Please select your sector" }),
  disability: z.string().min(1, { message: "Please specify if you have a disability" }),
  nationality: z.string().min(2, { message: "Please select your nationality" }),
  province: z.string().min(2, { message: "Please select your province" }),
  municipality: z.string().min(2, { message: "Please select your municipality" }),
  ward: z.string().min(1, { message: "Ward must be at least 1 character" }),
  qualifications: z.string().min(1, { message: "Please select your highest qualification" }),
  // Document fields - optional since some users may not have documents ready
  idDocument: z.any().optional(),
  proofOfAddress: z.any().optional(),
  cvDocument: z.any().optional(),
  otherDocument: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AffiliationForm = () => {
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const [documents, setDocuments] = useState<{[key: string]: {name: string; data: string}}>({});
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      idNumber: "",
      gender: "",
      sector: "",
      disability: "No",
      nationality: "South African",
      province: "",
      municipality: "",
      ward: "",
      qualifications: "",
    },
  });

  // Watch for province changes to update municipalities
  const selectedProvince = form.watch("province");
  
  useEffect(() => {
    if (selectedProvince) {
      // Update municipalities based on selected province
      setMunicipalities(getMunicipalitiesByProvince(selectedProvince));
      
      // Reset municipality selection when province changes
      form.setValue("municipality", "");
    }
  }, [selectedProvince, form]);
  
  // Handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload a file smaller than 3MB",
      });
      return;
    }
    
    // Convert file to base64 for email attachments
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      setDocuments(prev => ({
        ...prev,
        [documentType]: {
          name: file.name,
          data: base64Data.split(',')[1] // Remove the data:application/pdf;base64, part
        }
      }));
      
      toast({
        title: "Document uploaded",
        description: `${file.name} has been added to your application`,
      });
    };
    reader.readAsDataURL(file);
  };
  
  const onSubmit = async (data: FormValues) => {
    try {
      // Get attachments from the documents state
      const attachments = Object.entries(documents).map(([type, doc]) => ({
        filename: doc.name,
        content: doc.data
      }));
      
      // Format the data for email
      const emailData = {
        to: 'mkhontonationalunion@gmail.com',
        subject: 'New MNU Affiliation Form Submission',
        body: formatAffiliationEmailBody(data),
        attachments: attachments.length > 0 ? attachments : undefined
      };
      
      toast({
        title: "Opening email client...",
        description: "Please wait while we prepare your submission.",
      });
      
      const result = await sendEmail(emailData);
      
      if (result.success) {
        toast({
          title: "Email client opened!",
          description: "Please review and send the email with your application details.",
        });
      } else {
        // Save submission for later retry
        savePendingSubmission({...data, documents});
        toast({
          variant: "destructive",
          title: "Could not open email client",
          description: "Your submission has been saved locally and will be sent automatically when connection is restored.",
        });
      }
    } catch (error) {
      // Save submission for later retry
      savePendingSubmission({...data, documents});
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "There was a problem submitting your application",
        description: "Your submission has been saved locally and will be sent automatically when connection is restored.",
      });
    }
  };

  const provinces = [
    "Eastern Cape", 
    "Free State", 
    "Gauteng", 
    "KwaZulu-Natal", 
    "Limpopo", 
    "Mpumalanga", 
    "North West", 
    "Northern Cape", 
    "Western Cape"
  ];

  const qualificationOptions = [
    "Below Matric",
    "Matric",
    "Higher Certificate",
    "Diploma",
    "Advanced Diploma",
    "Bachelor's Degree",
    "Honours Degree",
    "Master's Degree",
    "Doctoral Degree",
    "Professional Qualification",
    "Other"
  ];

  const nationalities = [
    "South African",
    "Afghan",
    "Albanian",
    "Algerian",
    "Angolan",
    "Argentinian",
    "Australian",
    "Austrian",
    "Bangladeshi",
    "Belgian",
    "Botswanan",
    "Brazilian",
    "British",
    "Burundian",
    "Cameroonian",
    "Canadian",
    "Chinese",
    "Colombian",
    "Congolese",
    "Egyptian",
    "Ethiopian",
    "French",
    "German",
    "Ghanaian",
    "Greek",
    "Indian",
    "Indonesian",
    "Iranian",
    "Irish",
    "Italian",
    "Jamaican",
    "Japanese",
    "Kenyan",
    "Lesotho",
    "Liberian",
    "Malawian",
    "Malaysian",
    "Mexican",
    "Moroccan",
    "Mozambican",
    "Namibian",
    "Nigerian",
    "Pakistani",
    "Portuguese",
    "Russian",
    "Rwandan",
    "Saudi",
    "Senegalese",
    "Somalian",
    "Spanish",
    "Sudanese",
    "Swazi",
    "Swedish",
    "Swiss",
    "Tanzanian",
    "Thai",
    "Tunisian",
    "Turkish",
    "Ugandan",
    "Ukrainian",
    "American",
    "Venezuelan",
    "Vietnamese",
    "Zambian",
    "Zimbabwean",
    "Other"
  ];

  // Function to get municipalities based on province
  const getMunicipalitiesByProvince = (province: string): string[] => {
    const municipalitiesMap: { [key: string]: string[] } = {
      "Eastern Cape": [
        "Buffalo City", "Nelson Mandela Bay", "Amathole", "Chris Hani", 
        "Joe Gqabi", "OR Tambo", "Sarah Baartman", "Alfred Nzo"
      ],
      "Free State": [
        "Mangaung", "Fezile Dabi", "Lejweleputswa", "Thabo Mofutsanyana", "Xhariep"
      ],
      "Gauteng": [
        "City of Johannesburg", "City of Tshwane", "Ekurhuleni", 
        "Sedibeng", "West Rand"
      ],
      "KwaZulu-Natal": [
        "eThekwini", "Amajuba", "Harry Gwala", "iLembe", "King Cetshwayo", 
        "Ugu", "uMgungundlovu", "uMkhanyakude", "uMzinyathi", "uThukela", "Zululand"
      ],
      "Limpopo": [
        "Capricorn", "Mopani", "Sekhukhune", "Vhembe", "Waterberg"
      ],
      "Mpumalanga": [
        "Ehlanzeni", "Gert Sibande", "Nkangala"
      ],
      "North West": [
        "Bojanala Platinum", "Dr Kenneth Kaunda", "Dr Ruth Segomotsi Mompati", "Ngaka Modiri Molema"
      ],
      "Northern Cape": [
        "Frances Baard", "John Taolo Gaetsewe", "Namakwa", "Pixley ka Seme", "ZF Mgcawu"
      ],
      "Western Cape": [
        "City of Cape Town", "Cape Winelands", "Central Karoo", "Garden Route", 
        "Overberg", "West Coast"
      ]
    };
    
    return municipalitiesMap[province] || [];
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">Affiliate with MNU</h2>
      
      <PendingSubmissionsManager />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-medium mb-4 text-mnu-green">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name and surname fields */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Your surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* ID Number and gender fields */}
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>South African ID Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="13-digit ID number" 
                        maxLength={13} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value}
                        className="flex flex-col space-y-1 mt-2"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Male" id="male" />
                            <FormLabel htmlFor="male" className="font-normal">Male</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Female" id="female" />
                            <FormLabel htmlFor="female" className="font-normal">Female</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Other" id="other" />
                            <FormLabel htmlFor="other" className="font-normal">Other</FormLabel>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Sector and disability fields */}
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value}
                        className="flex flex-col space-y-1 mt-2"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Government" id="government" />
                            <FormLabel htmlFor="government" className="font-normal">Government</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Private" id="private" />
                            <FormLabel htmlFor="private" className="font-normal">Private</FormLabel>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="disability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have a disability?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value}
                        className="flex flex-col space-y-1 mt-2"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="yes-disability" />
                            <FormLabel htmlFor="yes-disability" className="font-normal">Yes</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="no-disability" />
                            <FormLabel htmlFor="no-disability" className="font-normal">No</FormLabel>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Qualifications field - dropdown */}
            <div className="mt-4">
              <FormField
                control={form.control}
                name="qualifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highest Qualification</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select highest qualification" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {qualificationOptions.map((qualification) => (
                          <SelectItem key={qualification} value={qualification}>
                            {qualification}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Location Information Section */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-medium mb-4 text-mnu-green">Location Information</h3>
            
            {/* Nationality field - dropdown */}
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nationalities.map((nationality) => (
                        <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Province field */}
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Municipality field - dropdown */}
              <FormField
                control={form.control}
                name="municipality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local Municipality</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={municipalities.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            selectedProvince 
                              ? "Select municipality" 
                              : "Select province first"
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {municipalities.map((municipality) => (
                          <SelectItem key={municipality} value={municipality}>
                            {municipality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Ward field */}
            <div className="mt-4">
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward</FormLabel>
                    <FormControl>
                      <Input placeholder="Your ward number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Documents Upload Section */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-medium mb-4 text-mnu-green">Supporting Documents</h3>
            <p className="text-sm text-gray-500 mb-4">
              Please upload any relevant documents to support your application. 
              All documents will be attached to your email submission.
            </p>
            
            <div className="space-y-4">
              {/* ID Document Upload */}
              <div className="border rounded p-4 bg-white">
                <FormLabel htmlFor="idDocument" className="block mb-2">ID Document</FormLabel>
                <Input
                  id="idDocument"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'idDocument')}
                  className="w-full"
                />
                {documents.idDocument && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {documents.idDocument.name} uploaded
                  </p>
                )}
              </div>
              
              {/* Proof of Address Upload */}
              <div className="border rounded p-4 bg-white">
                <FormLabel htmlFor="proofOfAddress" className="block mb-2">Proof of Address</FormLabel>
                <Input
                  id="proofOfAddress"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'proofOfAddress')}
                  className="w-full"
                />
                {documents.proofOfAddress && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {documents.proofOfAddress.name} uploaded
                  </p>
                )}
              </div>
              
              {/* CV Document Upload */}
              <div className="border rounded p-4 bg-white">
                <FormLabel htmlFor="cvDocument" className="block mb-2">Curriculum Vitae (CV)</FormLabel>
                <Input
                  id="cvDocument"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'cvDocument')}
                  className="w-full"
                />
                {documents.cvDocument && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {documents.cvDocument.name} uploaded
                  </p>
                )}
              </div>
              
              {/* Other Document Upload */}
              <div className="border rounded p-4 bg-white">
                <FormLabel htmlFor="otherDocument" className="block mb-2">Other Supporting Document</FormLabel>
                <Input
                  id="otherDocument"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'otherDocument')}
                  className="w-full"
                />
                {documents.otherDocument && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {documents.otherDocument.name} uploaded
                  </p>
                )}
              </div>
            </div>
            
            <p className="text-sm text-amber-600 mt-4">
              Note: Documents must be less than 3MB each. Supported formats include PDF, JPG, PNG, and DOC.
            </p>
          </div>
          
          {/* Submit button */}
          <div className="text-center">
            <Button 
              type="submit" 
              className="bg-mnu-green hover:bg-mnu-green/90 text-white w-full md:w-auto px-8 hover-scale"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AffiliationForm;
