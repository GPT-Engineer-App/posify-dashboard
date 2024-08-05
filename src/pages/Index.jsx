import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">POS System Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/pos" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          POS
        </Link>
        <Link to="/inventory" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Inventory
        </Link>
        <Link to="/suppliers" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Suppliers
        </Link>
        <Link to="/expenses" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Expenses
        </Link>
        <Link to="/reports" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
          Reports
        </Link>
        <Link to="/settings" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Index;
