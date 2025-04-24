export interface Client {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  enrolledPrograms?: Program[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
}

export interface Enrollment {
  clientId: string;
  programId: string;
}