# services/notification_service.py
import smtplib
from email.mime.text import MIMEText

class NotificationService:
    def send_email_alert(self, subject, message):
        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = 'alert@yourcompany.com'
        msg['To'] = 'recipient@yourcompany.com'

        with smtplib.SMTP('your_internal_smtp_server') as server:
            server.send_message(msg)
