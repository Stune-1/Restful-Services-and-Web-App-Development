import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const createEmployee = async (data: any) => {
  const response = await api.post('/employees', data);
  return response.data;
};

export const getEmployees = async (page: number = 1, limit: number = 10) => {
  const response = await api.get(`/employees?page=${page}&limit=${limit}`);
  return response.data;
};

export default api;
