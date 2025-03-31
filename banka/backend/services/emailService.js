const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}); 

// Function to send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  // Updated to use query parameter for the token
  const resetUrl = `http://localhost:5173/new-password?token=${resetToken}`; 


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

const sendContactEmail = async (name, email, message) => {
    const headback = `http://localhost:5173/`
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, 
    subject: `Contact Form Submission from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}\n\n Kindly head back to enjoy seamless transaction: ${headback}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = { sendPasswordResetEmail, sendContactEmail };
