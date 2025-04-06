
// This is a simulation of how you would integrate with Gmail API
// You can replace this with actual Gmail API integration code later

export interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  console.log('Simulating email sending via Gmail API:', emailData);
  
  // This is where you would implement the actual Gmail API call
  // For now, we'll simulate a successful response after a short delay
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful sending
      resolve({
        success: true,
        message: 'Email sent successfully via Gmail API simulation'
      });
      
      // Uncomment to simulate an error
      /*
      resolve({
        success: false,
        message: 'Error sending email: Gmail API quota exceeded'
      });
      */
    }, 1500);
  });
};

export const formatAffiliationEmailBody = (formData: any): string => {
  return `
New Affiliation Form Submission:

Name: ${formData.name} ${formData.surname}
Age: ${formData.age}
Gender: ${formData.gender}
Sector: ${formData.sector}
Disability: ${formData.disability || 'None specified'}
Nationality: ${formData.nationality}
Province: ${formData.province}
Local Municipality: ${formData.localMunicipality}
Ward: ${formData.ward}
Qualifications: ${formData.qualifications || 'None specified'}

This form was submitted on ${new Date().toLocaleString()}.
`;
};
