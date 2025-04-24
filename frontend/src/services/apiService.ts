import { Client, Program, Enrollment } from "@/types";

// Mock data
let clients: Client[] = [
  { id: "1", name: "John Doe", age: 35, gender: "Male" },
  { id: "2", name: "Jane Smith", age: 28, gender: "Female" },
];

let programs: Program[] = [
  { id: "1", name: "Tuberculosis", description: "TB treatment and prevention program" },
  { id: "2", name: "HIV/AIDS", description: "HIV care and management program" },
  { id: "3", name: "Malaria", description: "Malaria prevention and treatment program" },
];

let enrollments: Enrollment[] = [
  { clientId: "1", programId: "1" },
  { clientId: "2", programId: "3" },
];

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Client APIs
export const fetchClients = async (): Promise<Client[]> => {
  await delay(300);
  return [...clients];
};

// Implement other API methods for clients, programs, and enrollments
