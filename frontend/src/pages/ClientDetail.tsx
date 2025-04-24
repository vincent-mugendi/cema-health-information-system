import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchClientById } from "@/services/apiService";
import { Client } from "@/types";
import { ArrowLeft } from 'lucide-react';

/**
 * Displays detailed information about a specific client, including
 * personal data and enrolled health programs. Provides API access
 * information and error handling for loading states.
 *
 * @component
 */
const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fetches client data from the API based on the URL parameter `id`.
     * Handles loading state, error messaging, and sets the client state.
     *
     * @async
     * @function loadClient
     */
    const loadClient = async () => {
      if (!id) {
        setError("Client ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchClientById(id);
        if (data) {
          setClient(data);
        } else {
          setError("Client not found");
        }
      } catch (err) {
        console.error("Failed to fetch client details:", err);
        setError("Failed to load client data");
      } finally {
        setLoading(false);
      }
    };

    loadClient();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-health-teal">Loading client profile...</div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <h3 className="text-lg font-medium text-red-800">Error</h3>
        <p className="text-red-600 mt-1">{error || "Unknown error occurred"}</p>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/clients">Back to Clients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to="/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Client Profile</h1>
      </div>

      <Card className="overflow-hidden">
        <div className="h-12 bg-health-teal" />
        <CardHeader className="pb-2">
          <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span className="text-2xl">{client.name}</span>
            <Badge className="bg-health-indigo">{`ID: ${client.id}`}</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-lg font-medium">{client.age} years</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="text-lg font-medium">{client.gender}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Enrolled Programs</p>
              <p className="text-lg font-medium">{client.enrolledPrograms?.length || 0}</p>
            </div>
          </div>

          {/* Enrolled Programs */}
          <div>
            <h3 className="text-lg font-medium mb-3">Enrolled Health Programs</h3>

            {client.enrolledPrograms && client.enrolledPrograms.length > 0 ? (
              <div className="grid gap-3">
                {client.enrolledPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white border border-gray-200 rounded-md p-4 hover:border-health-teal transition-colors"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-health-teal">{program.name}</h4>
                        <p className="text-sm text-gray-600">{program.description}</p>
                      </div>
                      <Badge variant="outline" className="self-start">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">
                  This client is not enrolled in any health programs
                </p>
                <Button asChild className="mt-3 bg-health-blue hover:bg-health-blue/90">
                  <Link to="/enroll">Enroll in a Program</Link>
                </Button>
              </div>
            )}
          </div>

          {/* API Access */}
          <div className="bg-health-light p-4 rounded-md border border-health-teal border-opacity-20">
            <h3 className="text-lg font-medium mb-2">API Access</h3>
            <p className="text-sm text-gray-600 mb-3">
              Access this client's data programmatically via our API:
            </p>
            <code className="block bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto">
              GET /api/clients/{client.id}
            </code>
            <div className="mt-3 text-right">
              <Button variant="outline" size="sm" className="text-health-teal">
                Copy API URL
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetail;