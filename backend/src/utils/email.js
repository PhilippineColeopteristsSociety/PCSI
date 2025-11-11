const { CLIENT_URL } = process.env;

// Email verification template
const getVerificationEmailTemplate = (firstName, verificationToken) => {
  const verificationUrl = `${CLIENT_URL}/verify-email/${verificationToken}`;
  
  return {
    subject: 'Verify Your Email - PCSI',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; }
          .button { 
            display: inline-block; 
            background: #2563eb; 
            color: #ffffff !important; 
            padding: 12px 24px; 
            text-decoration: none !important; 
            border-radius: 5px; 
            margin: 20px 0;
            font-weight: bold;
          }
          .button:hover { background: #1d4ed8; }
          .button:visited { color: #ffffff !important; }
          .button:active { color: #ffffff !important; }
          a.button { color: #ffffff !important; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to PCSI!</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName},</h2>
            <p>Thank you for registering with PCSI. To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button" style="color: #ffffff !important; text-decoration: none !important;">Verify Email Address</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            
            <p><strong>Note:</strong> This link will expire in 24 hours for security reasons.</p>
            
            <p>If you didn't create an account with PCSI, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 PCSI. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${firstName},
      
      Thank you for registering with PCSI. To complete your registration and activate your account, please verify your email address by visiting the following link:
      
      ${verificationUrl}
      
      Note: This link will expire in 24 hours for security reasons.
      
      If you didn't create an account with PCSI, please ignore this email.
      
      Best regards,
      PCSI Team
    `
  };
};

// Password reset template
const getPasswordResetEmailTemplate = (firstName, resetToken) => {
  const resetUrl = `${CLIENT_URL}/admin/auth/reset-password/${resetToken}`;
 
  return {
    subject: 'Reset Your Password - PCSI',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #032e15; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; }
          .button { 
            display: inline-block; 
            background: #032e15; 
            color: #ffffff !important; 
            padding: 12px 24px; 
            text-decoration: none !important; 
            border-radius: 5px; 
            margin: 20px 0;
            font-weight: bold;
          }
          .button:hover { background: #021a0d; }
          .button:visited { color: #ffffff !important; }
          .button:active { color: #ffffff !important; }
          a.button { color: #ffffff !important; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
          .warning { background: #C4E8D3; border-left: 4px solid #032e15; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName},</h2>
            <p>We received a request to reset your password for your PCSI account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button" style="color: #ffffff !important; text-decoration: none !important;">Reset Password</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            
            <div class="warning">
              <p><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
              <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2025 PCSI. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${firstName},
      
      We received a request to reset your password for your PCSI account. If you made this request, please visit the following link to reset your password:
      
      ${resetUrl}
      
      Important: This link will expire in 1 hour for security reasons.
      
      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
      
      Best regards,
      PCSI Team
    `
  };
};

export {
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate
};
