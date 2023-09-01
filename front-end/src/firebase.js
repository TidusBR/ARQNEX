import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { config } from './config';
  
export const fireApp = initializeApp(config.firebase);
export const fireAuth = getAuth(fireApp);

export const FacebookProvider = new FacebookAuthProvider();
FacebookProvider.addScope("email");
FacebookProvider.setCustomParameters({
    'display': 'popup'
});

export const GoogleProvider = new GoogleAuthProvider();

/**
 * @param {BaseOAuthProvider} provider 
 */
export async function DoLogin(provider) {
    const { user } = await signInWithPopup(fireAuth, provider);
    
    const request = await fetch(`${config.api}${config.endpoints.account.signin_firebase}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            providerId: provider.providerId
        })
    });

    const response = await request.json();
    
    if (!response.ok) {
        return response.message;
    } else {
        window.location.href = "/";
    }
}