
export interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

// This is a browser-compatible version of the email service
// In a real application, this would call a backend API endpoint
export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // In a production environment, we would make an API call to a server endpoint
    // that handles the actual email sending using nodemailer and googleapis
    console.log('Sending email with data:', emailData);
    
    // Simulate network conditions - occasionally "fail" to test offline functionality
    if (Math.random() < 0.2) {
      throw new Error('Simulated network error');
    }
    
    // This is just a mock implementation for the client side
    // In reality, we'd send this data to a backend API
    return {
      success: true,
      message: 'Email sent successfully to MNU!',
    };
  } catch (error: any) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: `Error sending email: ${error.message}`,
    };
  }
};

// Format affiliation form data into a readable email body
export const formatAffiliationEmailBody = (formData: any): string => {
  return `
New MNU Affiliation Form Submission:
====================================

Personal Information:
- Name: ${formData.name}
- Surname: ${formData.surname}
- Age: ${formData.age}
- Gender: ${formData.gender}
- Sector: ${formData.sector}
- Disability: ${formData.disability}

Location:
- Nationality: ${formData.nationality}
- Province: ${formData.province}
- Municipality: ${formData.municipality}
- Ward: ${formData.ward}

Qualifications:
${formData.qualifications || 'None provided'}

Submission Date: ${new Date().toLocaleString()}
`;
};
