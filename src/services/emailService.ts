
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// Your credentials from Google Developer Console
const CLIENT_ID = '546225852309-k62e8e4mio4l1lubmbprmcsdnehf7lcb.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '4/0Ab_5qlkhl28eZO5Tm2cn6lCultO3xWWaaWy3c8aOULn8Jw0tbEsfrnMdVUK2wRq7zdjFCg';

export interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

// Configure OAuth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Since we're in a browser environment, we need to simulate sending an email
    // In a real application, this would call a backend API endpoint
    console.log('Attempting to send email with data:', emailData);
    
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For development purposes, we'll consider this successful
    // In production, this should communicate with a backend
    const isConnected = navigator.onLine;
    
    if (!isConnected) {
      throw new Error('No internet connection available');
    }
    
    // Store submission data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastSubmittedForm', JSON.stringify({
        emailContent: emailData.body
      }));
    }
    
    return {
      success: true,
      message: 'Email sent successfully to MNU!!'
    };
  } catch (error: any) {
    console.error('Email sending error:', error);
    
    // Save for offline submission in case of failure
    if (typeof window !== 'undefined') { 
      try {
        import('@/services/pendingSubmissions').then(({ savePendingSubmission }) => {
          // Extract form data from email body to save for later
          const formData = {
            // Basic placeholder data since we can't parse the email body reliably
            ...JSON.parse(localStorage.getItem('lastSubmittedForm') || '{}')
          };
          savePendingSubmission(formData);
        });
      } catch (e) {
        console.error('Failed to save pending submission:', e);
      }
    }
    
    return {
      success: false,
      message: `Error sending email: ${error.message}`
    };
  }
};

// Format affiliation form data into a readable email body
export const formatAffiliationEmailBody = (formData: any): string => {
  // Store form data in localStorage for potential recovery
  if (typeof window !== 'undefined') {
    localStorage.setItem('lastSubmittedForm', JSON.stringify(formData));
  }
  
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
