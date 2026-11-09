import createClient from "openapi-fetch";

import type { paths } from "@/lib/api/schema";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

// Typed API client. Auth rides on the backend session cookie, so every request
// sends credentials. Never hand-write calls or types; regenerate schema.ts.
export const api = createClient<paths>({ baseUrl, credentials: "include" });
