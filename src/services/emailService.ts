
// This file simulates email service functionality for the browser environment
// In a production environment, this would connect to a backend email service

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
  try {
    // Create a mailto URL to open the system's email client
    const mailtoUrl = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
    
    // Open the email client
    window.location.href = mailtoUrl;
    
    // Store submission data in localStorage
    localStorage.setItem('lastSubmittedForm', JSON.stringify({
      emailContent: emailData.body
    }));
    
    return {
      success: true,
      message: 'Email client opened successfully!'
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
      message: `Error opening email client: ${error.message}`
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
- ID Number: ${formData.idNumber}
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

// Helper function to extract age from South African ID number
export const extractAgeFromSAID = (idNumber: string): number | null => {
  if (!idNumber || idNumber.length !== 13) {
    return null;
  }
  
  // Extract birth year from SA ID
  const birthYear = idNumber.substring(0, 2);
  const currentYear = new Date().getFullYear() % 100; // Last two digits of current year
  
  // Determine the century
  const century = parseInt(birthYear) <= currentYear ? 2000 : 1900;
  const fullBirthYear = century + parseInt(birthYear);
  
  // Calculate age
  const age = new Date().getFullYear() - fullBirthYear;
  
  return age;
};

// Validate South African ID number
export const validateSAID = (idNumber: string): boolean => {
  // Basic validation - check length
  if (!idNumber || idNumber.length !== 13) {
    return false;
  }
  
  // Check if it contains only digits
  if (!/^\d+$/.test(idNumber)) {
    return false;
  }
  
  // Extract date components
  const year = parseInt(idNumber.substring(0, 2));
  const month = parseInt(idNumber.substring(2, 4));
  const day = parseInt(idNumber.substring(4, 6));
  
  // Basic date validation
  if (month < 1 || month > 12) {
    return false;
  }
  
  if (day < 1 || day > 31) {
    return false;
  }
  
  // More complex validation with Luhn algorithm could be added
  // But this basic validation should suffice for most cases
  
  return true;
};
