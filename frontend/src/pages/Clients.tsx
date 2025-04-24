
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from "@/components/ui/sonner";
import { fetchClients, createClient, searchClients } from '@/services/apiService';
import { Client } from '@/types';
import { PlusIcon, Search } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  
  // New client form state
  const [newClientName, setNewClientName] = useState('');
  const [newClientAge, setNewClientAge] = useState('');
  const [newClientGender, setNewClientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Initial load of clients
  useEffect(() => {
    loadClients();
  }, []);
  
  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      await loadClients();
      return;
    }
    
    try {
      setSearching(true);
      const results = await searchClients(searchQuery);
      setClients(results);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Failed to search clients");
    } finally {
      setSearching(false);
    }
  };
  
  const handleCreateClient = async () => {
    if (!newClientName.trim()) {
      toast.error("Client name is required");
      return;
    }
    
    const age = parseInt(newClientAge);
    if (isNaN(age) || age <= 0) {
      toast.error("Please enter a valid age");
      return;
    }
    
    try {
      const newClient = await createClient({
        name: newClientName,
        age,
        gender: newClientGender
      });
      
      setClients(prev => [...prev, newClient]);
      toast.success("Client created successfully");
      
      // Reset form
      setNewClientName('');
      setNewClientAge('');
      setNewClientGender('Male');
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to create client:", error);
      toast.error("Failed to create client");
    }
  };
  
  const ClientCard = ({ client }: { client: Client }) => (
    <Card className="hover:border-health-teal transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{client.name}</h3>
            <p className="text-sm text-gray-500">
              {client.age} years • {client.gender}
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={`#/clients/${client.id}`}>View Profile</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-health-teal hover:bg-health-teal/90">
              <PlusIcon className="mr-2 h-4 w-4" /> Register New Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter client name" 
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Enter age" 
                  value={newClientAge}
                  onChange={(e) => setNewClientAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup 
                  value={newClientGender} 
                  onValueChange={(value) => setNewClientGender(value as 'Male' | 'Female' | 'Other')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button className="w-full bg-health-teal hover:bg-health-teal/90" onClick={handleCreateClient}>
                Register Client
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search clients by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch} variant="outline">
          Search
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-health-teal">Loading clients...</div>
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-600">No clients found</h3>
          <p className="text-gray-500 mt-1">
            {searchQuery ? "Try a different search term" : "Register your first client to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;