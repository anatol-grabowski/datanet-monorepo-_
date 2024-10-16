# Step-by-Step Guide for OAuth Configuration:

1. Navigate to OAuth consent screen:
- Go to the Google Cloud Console (https://console.cloud.google.com/apis/credentials).
- Select your project.
- Navigate to APIs & Services > OAuth consent screen.

2. Configure OAuth Consent Screen:
- Application type: Choose either Internal (only available to users within your organization) or External (available to any Google account).
- App name: Enter a name for your application.
- User support email: Enter a support email.
- Scopes for Google APIs: Add scopes you need (usually profile and email).
- Authorized domains: For localhost testing, you can skip this step. However, ensure you add the domains you'll use in production here.
- Developer contact information: Add your email.

3. Create OAuth 2.0 Client ID:
- Go to APIs & Services > Credentials.
- Click Create Credentials and select OAuth 2.0 Client ID.
- Application type: Select "Web application".
- Name: Provide a name for the client ID.
- Authorized JavaScript origins: Add http://localhost:8080 and http://localhost (for some reason it's important to have both) for local development.
- Authorized redirect URIs: Add http://localhost:8080/auth/callback.

4. Get Client ID:
- After creating the OAuth 2.0 Client ID, copy the Client ID. You'll use this in your application.
