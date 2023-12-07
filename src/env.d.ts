// .env.d.ts (TypeScript definition file)
interface ProcessEnv {
  REACT_APP_SUPABASE_URL: string;
  REACT_APP_ANON_KEY: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ProcessEnv {}
  }
}
