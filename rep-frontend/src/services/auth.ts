const TOKEN_KEY = "authToken";
const EXPIRATION_KEY = "authTokenExpiration";
const TTL_MS = 8 * 60 * 60 * 1000;

export function saveToken(token: string) {
  const expiresAt = Date.now() + TTL_MS;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRATION_KEY, expiresAt.toString());
}

export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiresAt = localStorage.getItem(EXPIRATION_KEY);

  if (!token || !expiresAt) return null;

  if (Date.now() > parseInt(expiresAt, 10)) {
    removeToken();
    return null;
  }

  return token;
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_KEY);
}
