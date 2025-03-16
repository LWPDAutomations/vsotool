/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_WEBHOOK_URL: string;
  readonly VITE_AUTH_USERNAME: string;  // Toegevoegd
  readonly VITE_AUTH_PASSWORD: string;  // Toegevoegd
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}