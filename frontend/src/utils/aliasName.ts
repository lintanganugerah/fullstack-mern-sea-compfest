export const aliasName = {
  role: "rl",
  user: "us",
  admin: "ad",
  access_token: "act",
  refresh_token: "rft",
  csrf_token: "cft",
  csrf_token_signed: "cfts",
  auth_cache: `${import.meta.env.VITE_AUTH_CACHE_KEY_NAME}`,
} as const;

export type AliasName = typeof aliasName;
