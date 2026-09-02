def send_new_admin_notification(superadmin_emails, new_user_email, new_user_name):
    print(f"Mock email: New admin registered - {new_user_email} ({new_user_name}) sent to {superadmin_emails}")

def send_access_revoked_notification(user_email, old_role):
    print(f"Mock email: Access revoked for {user_email}, old role was {old_role}")
