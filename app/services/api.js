import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (userData) => api.post('/auth/register', userData);

// Doctor APIs
export const getDoctors = () => api.get('/doctors');
export const getDoctorById = (id) => api.get(`/doctors/${id}`);
export const searchDoctors = (query) => api.get(`/doctors/search?q=${query}`);

// Appointment APIs
export const getAppointments = () => api.get('/appointments');
export const createAppointment = (appointmentData) => api.post('/appointments', appointmentData);
export const updateAppointment = (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

// Medication APIs
export const getMedications = () => api.get('/medications');
export const createMedication = (medicationData) => api.post('/medications', medicationData);
export const updateMedication = (id, medicationData) => api.put(`/medications/${id}`, medicationData);
export const deleteMedication = (id) => api.delete(`/medications/${id}`);
export const toggleMedicationTaken = (id) => api.put(`/medications/${id}/toggle`);

// Medical History APIs
export const getMedicalHistory = () => api.get('/medical-history');
export const updateMedicalHistory = (historyData) => api.put('/medical-history', historyData);
export const addMedicalHistoryItem = (category, itemData) => api.post(`/medical-history/${category}`, itemData);
export const deleteMedicalHistoryItem = (category, itemId) => api.delete(`/medical-history/${category}/${itemId}`);

export default api; 