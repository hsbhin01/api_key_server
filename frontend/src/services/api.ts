import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setApiKey = (key: string) => {
  localStorage.setItem('apiKey', key);
};

export const getRoot = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getProtected = async (apiKey: string) => {
  const response = await api.get('/protected', {
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return response.data;
};

export const generateApiKey = async () => {
  const response = await api.post('/generate-key');
  return response.data;
}; 