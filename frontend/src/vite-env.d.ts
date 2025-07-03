/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REST_ENDPOINT: string;
  readonly VITE_ENDPOINT_VERSION: string;
  readonly VITE_AUTH_CACHE_KEY_NAME: string;
  readonly VITE_AUTH_CACHE_DURATION_MS: string;
  readonly VITE_MAX_FILE_SIZE_KB: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
