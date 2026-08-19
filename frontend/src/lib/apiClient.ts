const BASE_URL = import.meta.env.VITE_API_URL as string;

const API_ORIGIN = BASE_URL.replace(/\/api\/?$/, "");

export function getAssetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { auth, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (auth) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
  });

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    // response had no JSON body
  }

  if (!res.ok) {
    throw new ApiError(
      res.status,
      body?.message ?? `Request failed with status ${res.status}`,
    );
  }

  return body as T;
}
