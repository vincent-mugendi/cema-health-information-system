
import { Client, Program, Enrollment } from "@/types";

// Mock data
let clients: Client[] = [
  { id: "1", name: "John Doe", age: 35, gender: "Male" },
  { id: "2", name: "Jane Smith", age: 28, gender: "Female" },
  { id: "3", name: "Michael Johnson", age: 42, gender: "Male" },
  { id: "4", name: "Sarah Williams", age: 31, gender: "Female" },
];

let programs: Program[] = [
  { id: "1", name: "Tuberculosis", description: "TB treatment and prevention program" },
  { id: "2", name: "HIV/AIDS", description: "HIV care and management program" },
  { id: "3", name: "Malaria", description: "Malaria prevention and treatment program" },
];

let enrollments: Enrollment[] = [
  { clientId: "1", programId: "1" },
  { clientId: "1", programId: "2" },
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

export const fetchClientById = async (id: string): Promise<Client | undefined> => {
  await delay(200);
  const client = clients.find(c => c.id === id);
  
  if (client) {
    // Attach enrolled programs
    const clientEnrollments = enrollments.filter(e => e.clientId === id);
    const enrolledPrograms = programs.filter(p => 
      clientEnrollments.some(e => e.programId === p.id)
    );
    
    return { ...client, enrolledPrograms };
  }
  
  return undefined;
};

export const searchClients = async (query: string): Promise<Client[]> => {
  await delay(300);
  if (!query) return [];
  
  const lowercasedQuery = query.toLowerCase();
  return clients.filter(client => 
    client.name.toLowerCase().includes(lowercasedQuery)
  );
};

export const createClient = async (client: Omit<Client, "id">): Promise<Client> => {
  await delay(500);
  const newClient = { ...client, id: generateId() };
  clients = [...clients, newClient];
  return newClient;
};

// Program APIs
export const fetchPrograms = async (): Promise<Program[]> => {
  await delay(300);
  return [...programs];
};

export const createProgram = async (program: Omit<Program, "id">): Promise<Program> => {
  await delay(500);
  const newProgram = { ...program, id: generateId() };
  programs = [...programs, newProgram];
  return newProgram;
};

// Enrollment APIs
export const enrollClient = async (enrollment: Enrollment): Promise<boolean> => {
  await delay(500);
  
  // Check if client and program exist
  const clientExists = clients.some(c => c.id === enrollment.clientId);
  const programExists = programs.some(p => p.id === enrollment.programId);
  
  if (!clientExists || !programExists) {
    return false;
  }
  
  // Check if already enrolled
  const alreadyEnrolled = enrollments.some(
    e => e.clientId === enrollment.clientId && e.programId === enrollment.programId
  );
  
  if (alreadyEnrolled) {
    return false;
  }
  
  enrollments.push(enrollment);
  return true;
};

export const getClientsByProgramId = async (programId: string): Promise<Client[]> => {
  await delay(300);
  
  const programEnrollments = enrollments.filter(e => e.programId === programId);
  return clients.filter(client => 
    programEnrollments.some(e => e.clientId === client.id)
  );
};

export const getDashboardStats = async () => {
  await delay(300);
  
  return {
    totalClients: clients.length,
    totalPrograms: programs.length,
    totalEnrollments: enrollments.length,
    programStats: programs.map(program => {
      const count = enrollments.filter(e => e.programId === program.id).length;
      return { program: program.name, count };
    }),
  };
};