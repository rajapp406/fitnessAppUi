// Social authentication service
export interface SocialAuthProvider {
  name: string;
  initialize: () => Promise<void>;
  login: () => Promise<SocialAuthResult>;
  logout?: () => Promise<void>;
}

export interface SocialAuthResult {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  token: string;
  provider: string;
}

// Google OAuth Service
export class GoogleAuthService implements SocialAuthProvider {
  name = 'google';
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    console.log(clientId);
    if (!clientId || clientId === 'your-google-oauth-client-id') {
      throw new Error('Google Client ID is not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file.');
    }

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (window.google) {
          try {
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: () => {
                console.log('Google SDK initialized successfully');
              }, // Will be set during login
            });
            this.isInitialized = true;
            resolve();
          } catch (error) {
            reject(new Error('Failed to initialize Google SDK: ' + (error as Error).message));
          }
        } else {
          reject(new Error('Google SDK failed to load'));
        }
      };
      
      script.onerror = () => reject(new Error('Failed to load Google SDK'));
      document.head.appendChild(script);
    });
  }

  async login(): Promise<SocialAuthResult> {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId === 'your-google-oauth-client-id') {
      throw new Error('Google Client ID is not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file.');
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      if (window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: any) => {
              try {
                console.log('Google login response:', response);
                // Decode JWT token
                const payload = JSON.parse(atob(response.credential.split('.')[1]));
                
                const result: SocialAuthResult = {
                  user: {
                    id: payload.sub,
                    email: payload.email,
                    name: payload.name,
                    avatar: payload.picture,
                  },
                  token: response.credential,
                  provider: 'google',
                };
                
                resolve(result);
              } catch (error) {
                reject(new Error('Failed to process Google login response'));
              }
            },
          });
          
          window.google.accounts.id.prompt();
        } catch (error) {
          reject(new Error('Failed to prompt Google login: ' + (error as Error).message));
        }
      } else {
        reject(new Error('Google SDK not available'));
      }
    });
  }
}

// Facebook OAuth Service
export class FacebookAuthService implements SocialAuthProvider {
  name = 'facebook';
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
    if (!appId || appId === 'your-facebook-app-id') {
      throw new Error('Facebook App ID is not configured. Please set VITE_FACEBOOK_APP_ID in your .env file.');
    }

    return new Promise((resolve, reject) => {
      // Load Facebook SDK
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (window.FB) {
          try {
            window.FB.init({
              appId: appId,
              cookie: true,
              xfbml: true,
              version: 'v18.0'
            });
            this.isInitialized = true;
            resolve();
          } catch (error) {
            reject(new Error('Failed to initialize Facebook SDK: ' + (error as Error).message));
          }
        } else {
          reject(new Error('Facebook SDK failed to load'));
        }
      };
      
      script.onerror = () => reject(new Error('Failed to load Facebook SDK'));
      document.head.appendChild(script);
    });
  }

  async login(): Promise<SocialAuthResult> {
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
    if (!appId || appId === 'your-facebook-app-id') {
      throw new Error('Facebook App ID is not configured. Please set VITE_FACEBOOK_APP_ID in your .env file.');
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      if (window.FB) {
        window.FB.login((response: any) => {
          if (response.authResponse) {
            window.FB.api('/me', { fields: 'name,email,picture' }, (userInfo: any) => {
              const result: SocialAuthResult = {
                user: {
                  id: userInfo.id,
                  email: userInfo.email || `${userInfo.id}@facebook.com`,
                  name: userInfo.name,
                  avatar: userInfo.picture?.data?.url,
                },
                token: response.authResponse.accessToken,
                provider: 'facebook',
              };
              
              resolve(result);
            });
          } else {
            reject(new Error('Facebook login was cancelled'));
          }
        }, { scope: 'email' });
      } else {
        reject(new Error('Facebook SDK not available'));
      }
    });
  }

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      if (window.FB) {
        window.FB.logout(() => resolve());
      } else {
        resolve();
      }
    });
  }
}

// Social Auth Manager
export class SocialAuthManager {
  private providers: Map<string, SocialAuthProvider> = new Map();

  constructor() {
    this.providers.set('google', new GoogleAuthService());
    this.providers.set('facebook', new FacebookAuthService());
  }

  async loginWith(providerName: string): Promise<SocialAuthResult> {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Provider ${providerName} not found`);
    }

    return provider.login();
  }

  async logoutFrom(providerName: string): Promise<void> {
    const provider = this.providers.get(providerName);
    if (provider?.logout) {
      await provider.logout();
    }
  }

  getProvider(name: string): SocialAuthProvider | undefined {
    return this.providers.get(name);
  }
}

// Global instance
export const socialAuthManager = new SocialAuthManager();

// Type declarations for global objects
declare global {
  interface Window {
    google: any;
    FB: any;
  }
}