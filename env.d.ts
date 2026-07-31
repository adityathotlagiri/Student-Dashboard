interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PROJECT_ID: string;
  // Add your other variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
