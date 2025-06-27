'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function InvoicePage() {
  const params = useParams();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    async function fetchSale() {
      const res = await fetch(`/api/sales/${params.id}`);
      const data = await res.json();
      if (data.success) setSale(data.sale);
    }
    fetchSale();
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  if (!sale) return <p className="p-6">Loading invoice...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow print:shadow-none print:bg-white">
      <h1 className="text-2xl font-bold mb-2">🧾 Invoice</h1>
      <p>Date: {new Date(sale.date).toLocaleString()}</p>
      <p>Customer: {sale.customerName}</p>
      <p>Staff: {sale.staffName}</p>
      <p>Warehouse: {sale.warehouse}</p>

      <hr className="my-4" />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border px-3 py-2">Product</th>
            <th className="border px-3 py-2">Qty</th>
            <th className="border px-3 py-2">Price</th>
            <th className="border px-3 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {sale.products.map((item) => (
            <tr key={item.productId}>
              <td className="border px-3 py-2">{item.name}</td>
              <td className="border px-3 py-2">{item.quantity}</td>
              <td className="border px-3 py-2">Rs {item.price}</td>
              <td className="border px-3 py-2">
                Rs {item.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6">Total: Rs {sale.totalAmount}</h2>

      <div className="mt-4 print:hidden">
        <Button onClick={handlePrint}>🖨️ Print Invoice</Button>
      </div>
    </div>
  );
}
