import axios from 'axios';
const envUrl =import.meta.env.MODE ==="development"?import.meta.env.VITE_BASE_URL:import.meta.env.VITE_URL_PROD
export const apiClient = axios.create({
  baseURL: `${envUrl}/api/`,
});