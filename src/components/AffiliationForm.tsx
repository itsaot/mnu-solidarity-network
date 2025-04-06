
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { sendEmail, formatAffiliationEmailBody } from "@/services/emailService";
import { savePendingSubmission } from "@/services/pendingSubmissions";
import PendingSubmissionsManager from "@/components/PendingSubmissionsManager";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters" }),
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 18, {
    message: "Age must be a number and at least 18",
  }),
  gender: z.string().min(1, { message: "Please select your gender" }),
  sector: z.string().min(1, { message: "Please select your sector" }),
  disability: z.string().min(1, { message: "Please specify if you have a disability" }),
  nationality: z.string().min(2, { message: "Please select your nationality" }),
  province: z.string().min(2, { message: "Please select your province" }),
  municipality: z.string().min(2, { message: "Please select your municipality" }),
  ward: z.string().min(1, { message: "Ward must be at least 1 character" }),
  qualifications: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const AffiliationForm = () => {
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: "",
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
  
  const onSubmit = async (data: FormValues) => {
    try {
      // Format the data for email
      const emailData = {
        to: 'mkhontonationalunion@gmail.com',
        subject: 'New MNU Affiliation Form Submission',
        body: formatAffiliationEmailBody(data)
      };
      
      toast({
        title: "Submitting your application...",
        description: "Please wait while we process your submission.",
      });
      
      const result = await sendEmail(emailData);
      
      if (result.success) {
        toast({
          title: "Application submitted successfully!",
          description: "We'll contact you soon. A copy has been sent to mkhontonationalunion@gmail.com",
        });
        form.reset();
      } else {
        // Save submission for later retry
        savePendingSubmission(data);
        toast({
          variant: "destructive",
          title: "Could not send your application",
          description: "Your submission has been saved locally and will be sent automatically when connection is restored.",
        });
      }
    } catch (error) {
      // Save submission for later retry
      savePendingSubmission(data);
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age and gender fields */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="Your age" type="number" min="18" {...field} />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          {/* Nationality field - converted to dropdown */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            {/* Municipality field - converted to dropdown */}
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
          
          {/* Qualifications field */}
          <FormField
            control={form.control}
            name="qualifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualifications (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List your qualifications and experience" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
