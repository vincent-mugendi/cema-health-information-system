import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/sonner";
import { fetchPrograms, createProgram, getClientsByProgramId } from '@/services/apiService';
import { Program, Client } from '@/types';
import { PlusIcon } from 'lucide-react';

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New program form state
  const [newProgramName, setNewProgramName] = useState('');
  const [newProgramDescription, setNewProgramDescription] = useState('');
  
  // Program clients details
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [programClients, setProgramClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  // Load programs on initial render
  useEffect(() => {
    loadPrograms();
  }, []);
  
  /**
   * Fetches health programs from the API and updates the state.
   * If an error occurs, an error toast is displayed.
   */
  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await fetchPrograms();
      setPrograms(data);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
      toast.error("Failed to load health programs");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the creation of a new health program.
   * Validates the form data and calls the API to create a new program.
   * If successful, the new program is added to the state, and a success toast is displayed.
   * If an error occurs, an error toast is shown.
   */
  const handleCreateProgram = async () => {
    if (!newProgramName.trim()) {
      toast.error("Program name is required");
      return;
    }
    
    try {
      const newProgram = await createProgram({
        name: newProgramName,
        description: newProgramDescription || "No description provided"
      });
      
      setPrograms(prev => [...prev, newProgram]);
      toast.success("Health program created successfully");
      
      // Reset form
      setNewProgramName('');
      setNewProgramDescription('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to create program:", error);
      toast.error("Failed to create program");
    }
  };
  
  /**
   * Fetches the clients enrolled in a specific program and opens the details dialog.
   * If successful, the clients are displayed; if not, an error toast is shown.
   * @param program - The program for which to fetch the clients.
   */
  const handleViewProgramDetails = async (program: Program) => {
    setSelectedProgram(program);
    setDetailsDialogOpen(true);
    
    try {
      setLoadingClients(true);
      const clients = await getClientsByProgramId(program.id);
      setProgramClients(clients);
    } catch (error) {
      console.error("Failed to fetch program clients:", error);
      toast.error("Failed to load program clients");
    } finally {
      setLoadingClients(false);
    }
  };
  
  /**
   * Renders a card component for a health program, displaying its name, description, and a button
   * to view more details about the program.
   * @param program - The program to display.
   */
  const ProgramCard = ({ program }: { program: Program }) => (
    <Card className="hover:border-health-teal transition-colors">
      <CardHeader className="pb-2">
        <CardTitle>{program.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{program.description}</p>
        <Button 
          variant="outline" 
          className="w-full text-health-teal border-health-teal hover:bg-health-light"
          onClick={() => handleViewProgramDetails(program)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Health Programs</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-health-teal hover:bg-health-teal/90">
              <PlusIcon className="mr-2 h-4 w-4" /> Create New Program
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Health Program</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g., Tuberculosis Control" 
                  value={newProgramName}
                  onChange={(e) => setNewProgramName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter program description" 
                  value={newProgramDescription}
                  onChange={(e) => setNewProgramDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <Button className="w-full bg-health-teal hover:bg-health-teal/90" onClick={handleCreateProgram}>
                Create Program
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-health-teal">Loading health programs...</div>
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-600">No health programs found</h3>
          <p className="text-gray-500 mt-1">Create your first health program to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
      
      {/* Program Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-health-teal">{selectedProgram?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-health-light p-4 rounded-md">
              <h4 className="font-medium mb-1">Description</h4>
              <p className="text-gray-700">{selectedProgram?.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Enrolled Clients ({programClients.length})</h4>
               {/* Client table content goes here */}
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Programs;
