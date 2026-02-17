# Social Authentication Setup Guide

This guide explains how to enable Google, GitHub, and Microsoft sign-in providers in Firebase.

## Prerequisites

- You already have Firebase Authentication enabled with Email/Password
- Your Firebase project is configured in `index.html`

## Enable Social Sign-In Providers

### 1. Enable Google Sign-In

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **weatherio-ed8f6**
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** from the list
5. Toggle **Enable** to ON
6. Enter a **Project support email** (your email address)
7. (Optional) You can customize the OAuth consent screen
8. Click **Save**

**Note:** Google Sign-In should work immediately after enabling.

---

### 2. Enable GitHub Sign-In

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **GitHub** from the list
3. Toggle **Enable** to ON
4. You'll need to create a GitHub OAuth App first:
   
   **Create GitHub OAuth App:**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click **OAuth Apps** → **New OAuth App**
   - Fill in the form:
     - **Application name**: Weatherio (or your preferred name)
     - **Homepage URL**: `https://your-domain.com` (or `http://localhost:3000` for local testing)
     - **Authorization callback URL**: 
       - For production: `https://your-project-id.firebaseapp.com/__/auth/handler`
       - Or use: `https://weatherio-ed8f6.firebaseapp.com/__/auth/handler`
   - Click **Register application**
   - Copy the **Client ID** and **Client secret**

5. Back in Firebase Console, paste:
   - **Client ID** from GitHub
   - **Client secret** from GitHub
6. Click **Save**

---

### 3. Enable Microsoft Sign-In

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Microsoft** from the list
3. Toggle **Enable** to ON
4. You'll need to register an app in Azure:

   **Register App in Azure:**
   - Go to [Azure Portal](https://portal.azure.com/)
   - Navigate to **Azure Active Directory** → **App registrations**
   - Click **New registration**
   - Fill in:
     - **Name**: Weatherio (or your preferred name)
     - **Supported account types**: Choose based on your needs
     - **Redirect URI**: 
       - Platform: Web
       - URI: `https://your-project-id.firebaseapp.com/__/auth/handler`
   - Click **Register**
   - Copy the **Application (client) ID**
   - Go to **Certificates & secrets** → Create a new client secret
   - Copy the **Client secret** (save it now, it won't be shown again)

5. Back in Firebase Console, paste:
   - **Client ID** (Application ID from Azure)
   - **Client secret** from Azure
6. Click **Save**

---

## Testing Social Sign-In

After enabling the providers:

1. Refresh your app in the browser
2. Click the **"Sign In"** button
3. You should see three social sign-in buttons:
   - **Google** (white button with Google logo)
   - **GitHub** (dark button with GitHub logo)
   - **Microsoft** (white button with Microsoft logo)
4. Click any button to test sign-in
5. A popup window will appear for authentication
6. After successful authentication, the modal will close and your email will be displayed

---

## Troubleshooting

### "Operation not allowed" Error

**Solution:** The provider hasn't been enabled in Firebase Console.
- Go to Authentication → Sign-in method
- Enable the provider you're trying to use
- Make sure you've saved the configuration

### Popup Blocked Error

**Solution:** Your browser is blocking popups.
- Allow popups for your domain
- Try a different browser
- Check browser settings for popup blockers

### "Configuration not found" Error

**Solution:** The OAuth app isn't properly configured.
- Verify the Client ID and Client secret are correct
- Make sure the redirect URI matches exactly
- For GitHub/Microsoft: Double-check your OAuth app settings

### GitHub/Microsoft Sign-In Not Working

**Common Issues:**
- **Redirect URI mismatch**: Make sure the redirect URI in your OAuth app matches Firebase's callback URL
- **Client Secret expired**: Microsoft secrets expire - create a new one if needed
- **Wrong credentials**: Double-check Client ID and Client secret

### Redirect URI Format

For Firebase projects, use this format:
```
https://YOUR-PROJECT-ID.firebaseapp.com/__/auth/handler
```

Replace `YOUR-PROJECT-ID` with your actual project ID (e.g., `weatherio-ed8f6`)

---

## Provider-Specific Notes

### Google
- ✅ Easiest to set up (no additional registration needed)
- ✅ Works immediately after enabling in Firebase

### GitHub
- ⚠️ Requires creating a GitHub OAuth App
- ⚠️ Need to set correct redirect URI
- ✅ Free for public repos

### Microsoft
- ⚠️ Requires Azure account (free tier available)
- ⚠️ Client secrets expire (need to renew periodically)
- ✅ Good for enterprise users

---

## Security Best Practices

1. **Never commit secrets**: Keep Client IDs and Client secrets secure
2. **Use environment variables**: For production, consider using environment variables
3. **Restrict redirect URIs**: Only allow your Firebase project's callback URL
4. **Monitor usage**: Check Firebase Console regularly for suspicious activity

---

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google Sign-In Setup](https://firebase.google.com/docs/auth/web/google-signin)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
- [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/)

---

**Need Help?** Check the browser console (F12) for detailed error messages.

