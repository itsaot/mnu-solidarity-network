
// This service helps store form submissions locally when email fails
// So they can be retried later when connectivity is restored

export interface PendingSubmission {
  id: string;
  formData: any;
  timestamp: number;
  attemptCount: number;
}

const STORAGE_KEY = 'mnu-pending-submissions';

export const savePendingSubmission = (formData: any): void => {
  const pendingSubmissions = getPendingSubmissions();
  
  const newSubmission: PendingSubmission = {
    id: generateId(),
    formData,
    timestamp: Date.now(),
    attemptCount: 0
  };
  
  pendingSubmissions.push(newSubmission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingSubmissions));
};

export const getPendingSubmissions = (): PendingSubmission[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const removePendingSubmission = (id: string): void => {
  const pendingSubmissions = getPendingSubmissions();
  const updated = pendingSubmissions.filter(submission => submission.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const updateSubmissionAttempt = (id: string): void => {
  const pendingSubmissions = getPendingSubmissions();
  const updated = pendingSubmissions.map(submission => {
    if (submission.id === id) {
      return {
        ...submission,
        attemptCount: submission.attemptCount + 1
      };
    }
    return submission;
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// Helper function to generate random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
