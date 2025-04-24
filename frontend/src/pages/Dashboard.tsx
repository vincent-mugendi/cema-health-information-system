import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/services/apiService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Dashboard component for displaying key statistics and program enrollment chart.
 * 
 * Fetches and presents:
 * - Total clients
 * - Total health programs
 * - Total enrollments
 * - Program-wise enrollment statistics via bar chart
 * 
 * @returns {JSX.Element} The dashboard UI
 */
const Dashboard = () => {
  const [stats, setStats] = useState<{
    totalClients: number;
    totalPrograms: number;
    totalEnrollments: number;
    programStats: { program: string; count: number }[];
  } | null>(null);
  
  const [loading, setLoading] = useState(true);

  /**
   * Fetches dashboard statistics from the backend service.
   * Handles loading and error state appropriately.
   */
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-health-teal">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-health-teal">{stats?.totalClients || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Health Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-health-blue">{stats?.totalPrograms || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-health-indigo">{stats?.totalEnrollments || 0}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Program Enrollment Statistics</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats?.programStats || []}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#14b8a6" name="Enrollments" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="bg-health-light p-6 rounded-lg border border-health-teal border-opacity-20">
        <h2 className="text-lg font-semibold text-health-teal mb-2">Welcome to CEMA Health Information System</h2>
        <p className="text-gray-700">
          This health information system helps you manage client health records and program enrollments.
          Use the navigation menu to access different features of the system.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
