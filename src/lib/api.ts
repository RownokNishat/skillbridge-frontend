const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = {
  baseUrl: API_URL,

  async call(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  },

  // Helper methods for common operations
  get(endpoint: string, options?: RequestInit) {
    return this.call(endpoint, { method: "GET", ...options });
  },

  post(endpoint: string, body?: any, options?: RequestInit) {
    return this.call(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  },

  put(endpoint: string, body?: any, options?: RequestInit) {
    return this.call(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  },

  patch(endpoint: string, body?: any, options?: RequestInit) {
    return this.call(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  },

  delete(endpoint: string, options?: RequestInit) {
    return this.call(endpoint, { method: "DELETE", ...options });
  },
};

export default api;
