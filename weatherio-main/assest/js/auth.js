'use strict';

import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Get DOM elements
const authBtn = document.querySelector('[data-auth-btn]');
const authBtnText = document.querySelector('[data-auth-btn-text]');
const authModal = document.querySelector('[data-auth-modal]');
const authModalOverlay = document.querySelector('[data-auth-modal-overlay]');
const authModalClose = document.querySelector('[data-auth-modal-close]');
const authForm = document.querySelector('[data-auth-form]');
const authEmail = document.querySelector('[data-auth-email]');
const authPassword = document.querySelector('[data-auth-password]');
const authError = document.querySelector('[data-auth-error]');
const authTitle = document.querySelector('[data-auth-title]');
const authSubtitle = document.querySelector('[data-auth-subtitle]');
const authSubmit = document.querySelector('[data-auth-submit]');
const authSubmitText = document.querySelector('[data-auth-submit-text]');
const authToggleBtn = document.querySelector('[data-auth-toggle-btn]');
const authToggleText = document.querySelector('[data-auth-toggle-text]');
const authToggleLink = document.querySelector('[data-auth-toggle-link]');

let isSignUp = false;

// Initialize OAuth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

// Add scopes for providers
googleProvider.addScope('email');
googleProvider.addScope('profile');
githubProvider.addScope('user:email');
microsoftProvider.addScope('email');
microsoftProvider.addScope('profile');

// Toggle modal
const toggleAuthModal = () => {
    authModal.classList.toggle('active');
    if (authModal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        authEmail.focus();
    } else {
        document.body.style.overflow = '';
        authForm.reset();
        authError.textContent = '';
    }
};

// Handle auth button click
authBtn?.addEventListener('click', async () => {
    if (window.firebaseAuth) {
        const user = window.firebaseAuth.currentUser;
        if (user) {
            // User is signed in, offer logout
            if (confirm('Do you want to sign out?')) {
                try {
                    await signOut(window.firebaseAuth);
                } catch (error) {
                    console.error('Sign out error:', error);
                    alert('Failed to sign out. Please try again.');
                }
            }
        } else {
            // User is not signed in, show modal
            toggleAuthModal();
        }
    } else {
        // Firebase not initialized, just show modal
        toggleAuthModal();
    }
});
authModalOverlay?.addEventListener('click', toggleAuthModal);
authModalClose?.addEventListener('click', toggleAuthModal);

// Toggle between sign in and sign up
authToggleBtn?.addEventListener('click', () => {
    isSignUp = !isSignUp;
    
    if (isSignUp) {
        authTitle.textContent = 'Sign Up';
        authSubtitle.textContent = 'Create a new account to get started.';
        authSubmitText.textContent = 'Sign Up';
        authToggleText.textContent = 'Already have an account?';
        authToggleLink.textContent = 'Sign In';
    } else {
        authTitle.textContent = 'Sign In';
        authSubtitle.textContent = 'Welcome back! Please sign in to your account.';
        authSubmitText.textContent = 'Sign In';
        authToggleText.textContent = "Don't have an account?";
        authToggleLink.textContent = 'Sign Up';
    }
    
    authError.textContent = '';
});

// Handle form submission
authForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = authEmail.value.trim();
    const password = authPassword.value.trim();
    
    // Clear previous errors
    authError.textContent = '';
    authSubmit.disabled = true;
    authSubmitText.textContent = isSignUp ? 'Signing Up...' : 'Signing In...';
    
    // Check if Firebase Auth is initialized
    if (!window.firebaseAuth) {
        authError.textContent = 'Firebase Auth is not initialized. Please refresh the page and check your Firebase configuration.';
        authError.classList.add('active');
        authSubmit.disabled = false;
        authSubmitText.textContent = isSignUp ? 'Sign Up' : 'Sign In';
        return;
    }
    
    try {
        if (isSignUp) {
            await createUserWithEmailAndPassword(window.firebaseAuth, email, password);
        } else {
            await signInWithEmailAndPassword(window.firebaseAuth, email, password);
        }
        // Success - modal will be closed by auth state change handler
    } catch (error) {
        let errorMessage = 'An error occurred. Please try again.';
        
        switch (error.code) {
            case 'auth/configuration-not-found':
                errorMessage = 'Authentication is not configured. Please enable Email/Password authentication in Firebase Console: Authentication > Sign-in method > Email/Password';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered. Please sign in instead.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email. Please sign up.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/Password authentication is not enabled. Please enable it in Firebase Console.';
                break;
            default:
                errorMessage = error.message || errorMessage;
                console.error('Firebase Auth Error:', error.code, error.message);
        }
        
        authError.textContent = errorMessage;
        authError.classList.add('active');
        
        setTimeout(() => {
            authError.classList.remove('active');
        }, 5000);
    } finally {
        authSubmit.disabled = false;
        authSubmitText.textContent = isSignUp ? 'Sign Up' : 'Sign In';
    }
});

// Monitor auth state changes
if (window.firebaseAuth) {
    onAuthStateChanged(window.firebaseAuth, (user) => {
        if (user) {
            // User is signed in
            authBtnText.textContent = user.email || 'Account';
            authModal.classList.remove('active');
            document.body.style.overflow = '';
            authForm.reset();
            authError.textContent = '';
        } else {
            // User is signed out
            authBtnText.textContent = 'Sign In';
        }
    });
}

// Social sign-in handlers
const handleSocialSignIn = async (provider, providerName) => {
    if (!window.firebaseAuth) {
        authError.textContent = 'Firebase Auth is not initialized. Please refresh the page and check your Firebase configuration.';
        authError.classList.add('active');
        return;
    }
    
    try {
        authError.textContent = '';
        await signInWithPopup(window.firebaseAuth, provider);
        // Success - modal will be closed by auth state change handler
    } catch (error) {
        let errorMessage = 'An error occurred. Please try again.';
        
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                errorMessage = 'Sign-in popup was closed. Please try again.';
                break;
            case 'auth/popup-blocked':
                errorMessage = 'Popup was blocked. Please allow popups and try again.';
                break;
            case 'auth/account-exists-with-different-credential':
                errorMessage = 'An account already exists with this email using a different sign-in method.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = `${providerName} sign-in is not enabled. Please enable it in Firebase Console.`;
                break;
            case 'auth/configuration-not-found':
                errorMessage = `${providerName} authentication is not configured. Please enable it in Firebase Console.`;
                break;
            default:
                errorMessage = error.message || `Failed to sign in with ${providerName}. Please try again.`;
                console.error(`${providerName} Sign-In Error:`, error.code, error.message);
        }
        
        authError.textContent = errorMessage;
        authError.classList.add('active');
        
        setTimeout(() => {
            authError.classList.remove('active');
        }, 5000);
    }
};

// Add event listeners for social sign-in buttons
const googleBtn = document.querySelector('[data-auth-google]');
const githubBtn = document.querySelector('[data-auth-github]');
const microsoftBtn = document.querySelector('[data-auth-microsoft]');

googleBtn?.addEventListener('click', () => handleSocialSignIn(googleProvider, 'Google'));
githubBtn?.addEventListener('click', () => handleSocialSignIn(githubProvider, 'GitHub'));
microsoftBtn?.addEventListener('click', () => handleSocialSignIn(microsoftProvider, 'Microsoft'));

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModal.classList.contains('active')) {
        toggleAuthModal();
    }
});

