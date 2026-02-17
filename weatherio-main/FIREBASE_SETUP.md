# Firebase Authentication Setup Guide

This guide will walk you through setting up Firebase Authentication for the Weatherio app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "weatherio")
4. Click **"Continue"**
5. (Optional) Disable Google Analytics if you don't need it, or enable it if you do
6. Click **"Create project"**
7. Wait for the project to be created, then click **"Continue"**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click on the **Web icon** (`</>`) to add a web app
2. Enter an app nickname (e.g., "Weatherio Web")
3. (Optional) Check "Also set up Firebase Hosting" if you plan to use it
4. Click **"Register app"**
5. **IMPORTANT**: Copy the `firebaseConfig` object that appears. It will look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```

## Step 3: Enable Authentication

1. In the Firebase Console, click on **"Authentication"** in the left sidebar
2. Click **"Get started"** (if you see this button)
3. Click on the **"Sign-in method"** tab
4. Click on **"Email/Password"** from the list of sign-in providers
5. Toggle **"Enable"** to turn on Email/Password authentication
6. Click **"Save"**

## Step 4: Add Firebase Config to Your Project

1. Open `index.html` in your project
2. Find the Firebase configuration section (around line 28-44)
3. Replace the placeholder `firebaseConfig` object with your actual configuration from Step 2

### Example:

**Before (placeholder):**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDemo_Replace_With_Your_Config",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

**After (your actual config):**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "weatherio-12345.firebaseapp.com",
    projectId: "weatherio-12345",
    storageBucket: "weatherio-12345.appspot.com",
    messagingSenderId: "987654321098",
    appId: "1:987654321098:web:a1b2c3d4e5f6"
};
```

4. Save the file

## Step 5: Test Your Setup

1. Open your project in a web browser
2. Click the **"Sign In"** button in the header
3. Try creating a new account:
   - Click **"Sign Up"** link in the modal
   - Enter an email and password (minimum 6 characters)
   - Click **"Sign Up"**
4. You should see the modal close and your email displayed on the button
5. Click the button again to sign out

## Troubleshooting

### Error: "Firebase Auth is not initialized"
- Make sure you've replaced the Firebase config with your actual values
- Check the browser console for any error messages
- Verify that the Firebase config values are correct (no typos)

### Error: "This email is already registered"
- The email is already in use. Try signing in instead or use a different email

### Modal doesn't open
- Check browser console for JavaScript errors
- Ensure `auth.js` is loading correctly
- Verify that all Firebase SDK scripts are loading

### Authentication not working
- Verify Email/Password is enabled in Firebase Console (Authentication > Sign-in method)
- Check that your Firebase config matches your project
- Look at the browser console for specific error messages

## Security Notes

⚠️ **Important**: The Firebase API key in your config is safe to expose in client-side code. Firebase has built-in security rules that protect your backend. However, you should:

1. Set up Firebase Security Rules for any databases you might use
2. Enable App Check for additional protection (optional)
3. Never expose your Firebase Admin SDK keys

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

**Need Help?** Check the browser console (F12) for detailed error messages that can help diagnose issues.



