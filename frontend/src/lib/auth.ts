import { apiFetch } from "./apiClient";

export interface AuthUser {
  id: number;
  firstname: string;
  lastname: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface VerifyResponse {
  userId: number;
}

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function getStoredTokens() {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
}

function storeTokens(accessToken: string, refreshToken?: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function login(
  username: string,
  password: string,
): Promise<AuthUser> {
  const data = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  storeTokens(data.accessToken, data.refreshToken);
  return data.user;
}

export async function refreshAccessToken(): Promise<string> {
  const { refreshToken } = getStoredTokens();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const data = await apiFetch<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  storeTokens(data.accessToken);
  return data.accessToken;
}

export async function verify(): Promise<number> {
  const data = await apiFetch<VerifyResponse>("/auth/verify", {
    method: "GET",
    auth: true,
  });

  return data.userId;
}

export function logout() {
  clearTokens();
}
