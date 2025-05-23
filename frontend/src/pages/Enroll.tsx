import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { fetchClients, fetchPrograms, enrollClient } from '@/services/apiService';
import { Client, Program } from '@/types';
import { CheckIcon } from 'lucide-react';

/**
 * Enroll component for enrolling clients into health programs.
 * Provides a UI for selecting clients and programs and enrolling the client.
 * 
 * @returns {JSX.Element} The Enroll component UI.
 */
const Enroll = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  
  /**
   * Loads client and program data from the API when the component mounts.
   * Sets the state for clients and programs, and handles loading and error states.
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [clientsData, programsData] = await Promise.all([
          fetchClients(),
          fetchPrograms()
        ]);
        
        setClients(clientsData);
        setPrograms(programsData);
      } catch (error) {
        console.error("Failed to load enrollment data:", error);
        toast.error("Failed to load data for enrollment");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  /**
   * Handles the enrollment of a client into a selected health program.
   * Validates inputs, makes the API call to enroll the client, and shows appropriate feedback.
   */
  const handleEnroll = async () => {
    // Validate selections
    if (!selectedClientId || !selectedProgramId) return;

    // Check if client is already enrolled in the selected program
    const isClientEnrolled = clients.some(client =>
      client.id === selectedClientId &&
      client.enrolledPrograms && // Ensure enrolledPrograms is not undefined
      client.enrolledPrograms.some((program: Program) => program.id === selectedProgramId)
    );

    if (isClientEnrolled) {
      toast.error("This client is already enrolled in this program.");
      return;
    }

    try {
      setEnrolling(true);
      
      // Create the enrollment document
      const message = await enrollClient({
        client_id: selectedClientId,
        program_id: selectedProgramId
      });

      alert(message);

      // Now update the client's enrolled_programs in the clients collection
      const updatedClient = await updateClientEnrolledPrograms(selectedClientId, selectedProgramId);

      // Refresh the clients list after enrollment
      const updatedClients = await fetchClients();
      setClients(updatedClients);  // Update the clients state with the new list
      setEnrollmentSuccess(true);
    } catch (error: any) {
      console.error('Enrollment error:', error);
      alert(
        error?.response?.data?.detail ||
        'An error occurred during enrollment.'
      );
    } finally {
      setEnrolling(false);
    }
  };

  /**
   * Updates the enrolled_programs array in the client's document
   * after a successful enrollment.
   */
  const updateClientEnrolledPrograms = async (clientId: string, programId: string) => {
    try {
      // Log the clientId to ensure it's valid
      console.log('Updating client with ID:', clientId);

      const response = await fetch(`/clients/${clientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          $push: {
            enrolled_programs: {
              id: programId,
              enrolled_at: new Date().toISOString()
            }
          }
        })
      });

      if (!response.ok) {
        // Log detailed error if response is not OK
        const errorDetails = await response.json();
        console.error('Error details:', errorDetails);
        throw new Error('Failed to update client enrolled programs');
      }

      // Log success if everything goes well
      console.log('Client updated successfully:', await response.json());
      return await response.json();
    } catch (error) {
      console.error('Error updating client enrolled programs:', error);
      throw error;
    }
  };

  const selectedClient = clients.find(c => c.id === selectedClientId);
  const selectedProgram = programs.find(p => p.id === selectedProgramId);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800">Enroll Clients in Programs</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-health-teal">Loading enrollment data...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Client</label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Health Program</label>
                <Select value={selectedProgramId} onValueChange={setSelectedProgramId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full mt-4 bg-health-teal hover:bg-health-teal/90" 
                onClick={handleEnroll}
                disabled={!selectedClientId || !selectedProgramId || enrolling}
              >
                {enrolling ? "Processing..." : enrollmentSuccess ? (
                  <span className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> Enrolled Successfully
                  </span>
                ) : "Enroll Client"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Enrollment Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedClient && selectedProgram ? (
                <div className="space-y-4">
                  <div className="bg-health-light p-4 rounded-md">
                    <h3 className="font-medium text-health-teal">Client Information</h3>
                    <div className="mt-2">
                      <p><span className="font-medium">Name:</span> {selectedClient.name}</p>
                      <p><span className="font-medium">Age:</span> {selectedClient.age} years</p>
                      <p><span className="font-medium">Gender:</span> {selectedClient.gender}</p>
                    </div>
                  </div>
                  
                  <div className="bg-health-light p-4 rounded-md">
                    <h3 className="font-medium text-health-teal">Program Information</h3>
                    <div className="mt-2">
                      <p><span className="font-medium">Name:</span> {selectedProgram.name}</p>
                      <p><span className="font-medium">Description:</span> {selectedProgram.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                    <h3 className="font-medium text-yellow-800">Note</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      After enrollment, this client will have access to all features and benefits of the {selectedProgram.name} program.
                      The enrollment can be viewed from the client's profile page.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                  <p>Select both a client and a program to see the enrollment preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Help Section */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">How Enrollment Works</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Choose a client to enroll.</li>
            <li>Select a health program for the client.</li>
            <li>Click the "Enroll Client" button to finalize the enrollment.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default Enroll;
