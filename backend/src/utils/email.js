const { CLIENT_URL } = process.env;

// Email verification template
const getVerificationEmailTemplate = (firstName, verificationToken) => {
  const verificationUrl = `${CLIENT_URL}/admin/verify/email/${verificationToken}`;
  
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
          .warning { background: #C4E8D3; border-left: 4px solid #032e15; padding: 15px; margin: 20px 0; }
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
            
            <div class="warning">
            <p><strong>Note:</strong> This link will expire in 24 hours for security reasons.</p>
            
            <p>If you didn't create an account with PCSI, please ignore this email.</p>
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
      
      Thank you for registering with PCSI. To complete your registration and activate your account, please verify your email address by visiting the following link:
      
      ${verificationUrl}
      
      Note: This link will expire in 24 hours for security reasons.
      
      If you didn't create an account with PCSI, please ignore this email.
      
      Best regards,
      PCSI Team
    `
  };
};
const getChangeEmailOTPTemplate = (firstName, otp) => {
  return {
    subject: 'Password Reset OTP - PCSI',
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
          .otp-box {
            background: #f8f9fa;
            border: 2px solid #032e15;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .otp-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #032e15;
            font-family: 'Courier New', monospace;
          }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
          .warning { background: #C4E8D3; border-left: 4px solid #032e15; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Change Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName},</h2>
            <p>We received a request to change your email for your PCSI account. Use the following One-Time Password (OTP) to proceed with changing your email:</p>
            
            <div class="otp-box">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Your OTP Code:</p>
              <div class="otp-code">${otp}</div>
            </div>
            
            <p>Enter this code on the email change page to continue. This code is valid for <strong>10 minutes</strong>.</p>
            
            <div class="warning">
              <p><strong>Security Notice:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Never share this OTP with anyone</li>
                <li>PCSI staff will never ask for your OTP</li>
                <li>This code expires in 10 minutes</li>
              </ul>
              <p>If you didn't request a password reset, please ignore this email and consider changing your password immediately for security.</p>
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
      
      We received a request to change your email for your PCSI account. Use the following One-Time Password (OTP) to proceed with changing your email:
      
      OTP: ${otp}
      
      Enter this code on the email change page to continue. This code is valid for 1 hour.
      
      Security Notice:
      - Never share this OTP with anyone
      - PCSI staff will never ask for your OTP
      - This code expires in 10 minutes
      
      If you didn't request a password reset, please ignore this email and consider changing your password immediately for security.
      
      Best regards,
      PCSI Team
    `
  };
};

// Password reset template
const getPasswordResetEmailTemplate = (firstName, otp) => {
  return {
    subject: 'Password Reset OTP - PCSI',
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
          .otp-box {
            background: #f8f9fa;
            border: 2px solid #032e15;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .otp-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #032e15;
            font-family: 'Courier New', monospace;
          }
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
            <p>We received a request to reset your password for your PCSI account. Use the following One-Time Password (OTP) to proceed with resetting your password:</p>
            
            <div class="otp-box">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Your OTP Code:</p>
              <div class="otp-code">${otp}</div>
            </div>
            
            <p>Enter this code on the password reset page to continue. This code is valid for <strong>10 minutes</strong>.</p>
            
            <div class="warning">
              <p><strong>Security Notice:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Never share this OTP with anyone</li>
                <li>PCSI staff will never ask for your OTP</li>
                <li>This code expires in 10 minutes</li>
              </ul>
              <p>If you didn't request a password reset, please ignore this email and consider changing your password immediately for security.</p>
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
      
      We received a request to reset your password for your PCSI account. Use the following One-Time Password (OTP) to proceed with resetting your password:
      
      OTP: ${otp}
      
      Enter this code on the password reset page to continue. This code is valid for 1 hour.
      
      Security Notice:
      - Never share this OTP with anyone
      - PCSI staff will never ask for your OTP
      - This code expires in 10 minutes
      
      If you didn't request a password reset, please ignore this email and consider changing your password immediately for security.
      
      Best regards,
      PCSI Team
    `
  };
};

export {
  getChangeEmailOTPTemplate,
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate
};
