import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

def _send_email(to_emails, subject, body_html):
    sender_email = os.environ.get("SMTP_EMAIL")
    sender_password = os.environ.get("SMTP_PASSWORD")
    
    if not sender_email or not sender_password:
        print("WARNING: SMTP_EMAIL or SMTP_PASSWORD not configured. Email not sent.")
        return

    msg = MIMEMultipart()
    msg['From'] = f"WaterAudit System <{sender_email}>"
    msg['To'] = ", ".join(to_emails) if isinstance(to_emails, list) else to_emails
    msg['Subject'] = subject

    # Ensure noreply context and support email are included
    footer = f"""
    <hr style="border: none; border-top: 1px solid #eaeaea; margin-top: 30px; margin-bottom: 20px;" />
    <p style="font-size: 12px; color: #666; text-align: center;">
        This is a system-generated message. Please do not reply to this email.<br/>
        For any support inquiries, please contact us at <a href="mailto:wateraudit.support@gmail.com">wateraudit.support@gmail.com</a>.
    </p>
    """
    
    msg.attach(MIMEText(body_html + footer, 'html'))
    
    try:
        # Standard Gmail SMTP configuration
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print(f"INFO: Successfully sent system email to {msg['To']}")
    except Exception as e:
        print(f"ERROR: Failed to send email: {e}")

def send_new_admin_notification(superadmin_emails, new_user_email, new_user_name):
    subject = "Action Required: New Admin Request"
    body = f"""
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0284c7;">New Admin Access Request</h2>
        <p>Hello Superadmin,</p>
        <p>A user has requested Admin privileges on the WaterAudit platform. Please review their details below:</p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Name:</strong> {new_user_name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> {new_user_email}</p>
        </div>
        <p>You can approve or reject this request from the <a href="https://your-domain.com/dashboard/admin" style="color: #0284c7; font-weight: bold;">User Management Dashboard</a>.</p>
    </div>
    """
    _send_email(superadmin_emails, subject, body)

def send_access_revoked_notification(user_email, old_role):
    subject = "Notice: Admin Access Revoked"
    body = f"""
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ea580c;">Access Revoked</h2>
        <p>Hello,</p>
        <p>This is a notification that your <strong>{old_role.upper()}</strong> privileges on the WaterAudit platform have been revoked by a Superadmin.</p>
        <p>Your account has been reverted to a standard user role. You can still log in and view your profile, but you no longer have access to admin features.</p>
    </div>
    """
    _send_email([user_email], subject, body)

def send_access_granted_notification(user_email, new_role):
    subject = f"Notice: {new_role.capitalize()} Access Granted!"
    body = f"""
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Access Granted!</h2>
        <p>Hello,</p>
        <p>Great news! Your request for <strong>{new_role.upper()}</strong> privileges on the WaterAudit platform has been approved by a Superadmin.</p>
        <p>You can now log in and access all {new_role} features across the platform.</p>
        <div style="margin-top: 20px;">
            <a href="https://your-domain.com/dashboard" style="background-color: #0284c7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
        </div>
    </div>
    """
    _send_email([user_email], subject, body)
