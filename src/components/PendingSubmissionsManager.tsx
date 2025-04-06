
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  getPendingSubmissions, 
  removePendingSubmission, 
  updateSubmissionAttempt, 
  PendingSubmission 
} from '@/services/pendingSubmissions';
import { sendEmail, formatAffiliationEmailBody, EmailData } from '@/services/emailService';
import { toast } from '@/hooks/use-toast';

const PendingSubmissionsManager: React.FC = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([]);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Load pending submissions on component mount
    loadPendingSubmissions();
  }, []);

  const loadPendingSubmissions = () => {
    const submissions = getPendingSubmissions();
    setPendingSubmissions(submissions);
  };

  const retrySubmission = async (submission: PendingSubmission) => {
    setIsRetrying(true);
    
    try {
      const emailData: EmailData = {
        to: 'mkhontonationalunion@gmail.com',
        subject: 'New MNU Affiliation Form Submission',
        body: formatAffiliationEmailBody(submission.formData)
      };
      
      const result = await sendEmail(emailData);
      
      if (result.success) {
        removePendingSubmission(submission.id);
        toast({
          title: "Success!",
          description: "Pending submission sent successfully",
        });
        loadPendingSubmissions();
      } else {
        updateSubmissionAttempt(submission.id);
        toast({
          variant: "destructive",
          title: "Error sending submission",
          description: result.message,
        });
        loadPendingSubmissions();
      }
    } catch (error) {
      console.error('Error retrying submission:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while retrying the submission",
      });
    } finally {
      setIsRetrying(false);
    }
  };
  
  const retryAll = async () => {
    setIsRetrying(true);
    
    for (const submission of pendingSubmissions) {
      try {
        const emailData: EmailData = {
          to: 'mkhontonationalunion@gmail.com',
          subject: 'New MNU Affiliation Form Submission',
          body: formatAffiliationEmailBody(submission.formData)
        };
        
        const result = await sendEmail(emailData);
        
        if (result.success) {
          removePendingSubmission(submission.id);
        } else {
          updateSubmissionAttempt(submission.id);
        }
      } catch (error) {
        console.error('Error retrying submission:', error);
        updateSubmissionAttempt(submission.id);
      }
    }
    
    loadPendingSubmissions();
    setIsRetrying(false);
    
    toast({
      title: "Retry Complete",
      description: `${pendingSubmissions.length - getPendingSubmissions().length} of ${pendingSubmissions.length} submissions sent successfully`,
    });
  };

  const deleteSubmission = (id: string) => {
    removePendingSubmission(id);
    loadPendingSubmissions();
    toast({
      description: "Submission deleted",
    });
  };
  
  if (pendingSubmissions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Pending Form Submissions</h3>
      <p className="text-gray-600 mb-4">
        {pendingSubmissions.length} submission(s) are waiting to be sent
      </p>
      
      <div className="mb-6">
        <Button 
          onClick={retryAll} 
          disabled={isRetrying}
          className="w-full"
        >
          {isRetrying ? 'Retrying...' : 'Retry All Submissions'}
        </Button>
      </div>
      
      <div className="space-y-4">
        {pendingSubmissions.map((submission) => (
          <div key={submission.id} className="border rounded-md p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">
                  {submission.formData.name} {submission.formData.surname}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(submission.timestamp).toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Attempts: {submission.attemptCount}
              </p>
            </div>
            <div className="flex space-x-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => retrySubmission(submission)}
                disabled={isRetrying}
              >
                Retry
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteSubmission(submission.id)}
                disabled={isRetrying}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingSubmissionsManager;
