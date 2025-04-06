import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

// Your credentials from Google Developer Console
const CLIENT_ID = '546225852309-k62e8e4mio4l1lubmbprmcsdnehf7lcb.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '4/0Ab_5qlkhl28eZO5Tm2cn6lCultO3xWWaaWy3c8aOULn8Jw0tbEsfrnMdVUK2wRq7zdjFCg';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'mkhontonationalunion@gmail.com', 
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token || '',
      },
    });

    const mailOptions = {
      from: 'Umkhonto National Union <mkhontonationalunion@gmail.com>', // change to your name and email
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.body,
      attachments: emailData.attachments?.map((file) => ({
        filename: file.filename,
        content: file.content,
      })),
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Email sent successfully to MNU!!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error sending email: ${error.message}`,
    };
  }
};
