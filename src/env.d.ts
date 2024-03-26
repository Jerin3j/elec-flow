
declare global {
  namespace NodeJS {
    interface ProcessEnv {
     REACT_APP_SUPABASE_URL: string;
     REACT_APP_ANON_KEY: string;
     REACT_APP_GEOAPI_KEY: string;
    NODE_ENV: "development"| "production"
    }
  }
}
export{}