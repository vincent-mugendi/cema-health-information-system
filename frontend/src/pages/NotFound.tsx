
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-health-light p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-health-teal rounded-full flex items-center justify-center mx-auto">
          <span className="text-4xl font-bold text-white">404</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1>
        
        <p className="text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="inline-flex items-center">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
