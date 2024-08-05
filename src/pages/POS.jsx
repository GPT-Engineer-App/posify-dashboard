import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const POS = () => {
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState('');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(res => res.json()),
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>
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
