import axios from 'axios';
import { Client, Program, Enrollment } from "@/types";

// Replace this URL with your backend URL if necessary
const API_URL = 'http://127.0.0.1:8000'; // FastAPI URL

// Client APIs

export const fetchClients = async (): Promise<Client[]> => {
  const response = await axios.get(`${API_URL}/clients`);
  return response.data;
};

export const fetchClientById = async (id: string): Promise<Client | undefined> => {
  const response = await axios.get(`${API_URL}/clients/${id}`);
  return response.data || undefined;
};

export const searchClients = async (query: string): Promise<Client[]> => {
  const response = await axios.get(`${API_URL}/clients?search=${query}`);
  return response.data;
};

export const createClient = async (client: Omit<Client, "id">): Promise<Client> => {
  const response = await axios.post(`${API_URL}/clients`, client);
  return response.data;
};

// Program APIs

export const fetchPrograms = async (): Promise<Program[]> => {
  const response = await axios.get(`${API_URL}/programs`);
  return response.data;
};

export const createProgram = async (program: Omit<Program, "id">): Promise<Program> => {
  const response = await axios.post(`${API_URL}/programs`, program);
  return response.data;
};

// Enrollment APIs

export const enrollClient = async (enrollment: Enrollment): Promise<string> => {
  const response = await axios.post(`${API_URL}/enrollments`, enrollment);
  return response.data.message; // Now it matches the backend
};


export const getClientsByProgramId = async (programId: string): Promise<Client[]> => {
  const response = await axios.get(`${API_URL}/programs/${programId}/clients`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard/stats`);
  return response.data;
};
