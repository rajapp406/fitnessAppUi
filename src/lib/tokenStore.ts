// Token storage strategy interface
export interface TokenStorageStrategy {
  getAccessToken(): string | null;
  setAccessToken(token: string | null): void;
  getRefreshToken(): string | null;
  setRefreshToken(token: string | null): void;
  clear(): void;
}

// In-memory strategy
class MemoryTokenStorage implements TokenStorageStrategy {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  getAccessToken() {
    return this.accessToken;
  }
  setAccessToken(token: string | null) {
    this.accessToken = token;
  }
  getRefreshToken() {
    return this.refreshToken;
  }
  setRefreshToken(token: string | null) {
    this.refreshToken = token;
  }
  clear() {
    this.accessToken = null;
    this.refreshToken = null;
  }
}

// localStorage strategy
class LocalStorageTokenStorage implements TokenStorageStrategy {
  private accessKey = 'accessToken';
  private refreshKey = 'refreshToken';

  getAccessToken() {
    return localStorage.getItem(this.accessKey);
  }
  setAccessToken(token: string | null) {
    if (token) localStorage.setItem(this.accessKey, token);
    else localStorage.removeItem(this.accessKey);
  }
  getRefreshToken() {
    return localStorage.getItem(this.refreshKey);
  }
  setRefreshToken(token: string | null) {
    if (token) localStorage.setItem(this.refreshKey, token);
    else localStorage.removeItem(this.refreshKey);
  }
  clear() {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
  }
}

// sessionStorage strategy
class SessionStorageTokenStorage implements TokenStorageStrategy {
  private accessKey = 'accessToken';
  private refreshKey = 'refreshToken';

  getAccessToken() {
    return sessionStorage.getItem(this.accessKey);
  }
  setAccessToken(token: string | null) {
    if (token) sessionStorage.setItem(this.accessKey, token);
    else sessionStorage.removeItem(this.accessKey);
  }
  getRefreshToken() {
    return sessionStorage.getItem(this.refreshKey);
  }
  setRefreshToken(token: string | null) {
    if (token) sessionStorage.setItem(this.refreshKey, token);
    else sessionStorage.removeItem(this.refreshKey);
  }
  clear() {
    sessionStorage.removeItem(this.accessKey);
    sessionStorage.removeItem(this.refreshKey);
  }
}

// TokenStore with pluggable strategy
class TokenStore implements TokenStorageStrategy {
  private strategy: TokenStorageStrategy;
  constructor(strategy: TokenStorageStrategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy: TokenStorageStrategy) {
    this.strategy = strategy;
  }
  getAccessToken() {
    return this.strategy.getAccessToken();
  }
  setAccessToken(token: string | null) {
    this.strategy.setAccessToken(token);
  }
  getRefreshToken() {
    return this.strategy.getRefreshToken();
  }
  setRefreshToken(token: string | null) {
    this.strategy.setRefreshToken(token);
  }
  clear() {
    this.strategy.clear();
  }
}

// Export strategies and a default instance (in-memory by default)
export const memoryTokenStorage = new MemoryTokenStorage();
export const localStorageTokenStorage = new LocalStorageTokenStorage();
export const sessionStorageTokenStorage = new SessionStorageTokenStorage();

const tokenStore = new TokenStore(memoryTokenStorage);
export default tokenStore; 