/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BUGSNAG_KEY: string;
  readonly VITE_RELEASE_STAGE: 'development' | 'staging' | 'production';
}
