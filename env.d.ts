/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEDS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
