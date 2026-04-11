export const config = {
  DEVTOOLS_ENABLED: import.meta.env.VITE_ENV === 'localhost',
  API_URL: import.meta.env.VITE_API_URL,
}
