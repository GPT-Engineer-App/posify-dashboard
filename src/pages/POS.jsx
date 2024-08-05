import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const POS = () => {
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState('');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`API error: ${res.status} ${res.statusText}\n${errorText}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: Expected an array of products');
        }
        return data;
      } catch (err) {
        if (err.message.includes('Unexpected token')) {
          throw new Error('The server returned an invalid response. This might be due to a server-side error or misconfiguration.');
        }
        throw err;
      }
    },
  });

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => p.barcode === barcode);
    if (product) {
      setCart([...cart, product]);
      setBarcode('');
    } else {
      alert('Product not found');
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return (
    <div className="container mx-auto p-4">
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Failed to load products. Please try again later.</p>
          <details className="mt-2">
            <summary>Error details</summary>
            <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
          </details>
        </AlertDescription>
      </Alert>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Point of Sale</h1>
      <form onSubmit={handleBarcodeSubmit} className="mb-4">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Scan barcode"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Item</button>
      </form>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Products</h2>
          <div className="grid grid-cols-3 gap-2">
            {products.map(product => (
              <button
                key={product.id}
                onClick={() => setCart([...cart, product])}
                className="bg-gray-200 p-2 rounded"
              >
                {product.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Cart</h2>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <div className="font-bold mt-4">
            Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </div>
          <button
            onClick={() => {
              // Here you would typically process the payment
              alert('Payment processed!');
              setCart([]);
            }}
            className="bg-green-500 text-white p-2 rounded mt-4 w-full"
          >
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
