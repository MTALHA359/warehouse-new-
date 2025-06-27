'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function PurchasesPage() {
  const [form, setForm] = useState({
    productName: '',
    quantity: '',
    purchasePrice: '',
  });

  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    const res = await fetch('/api/purchases');
    const data = await res.json();
    if (data.success) setPurchases(data.purchases);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, purchasedBy: 'Admin' }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success('Purchase logged!');
      setForm({ productName: '', quantity: '', purchasePrice: '' });
      fetchPurchases();
    } else {
      toast.error('Failed to log purchase');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧾 Add Purchase</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <Label>Product Name</Label>
          <Input
            name="productName"
            value={form.productName}
            onChange={handleChange}
            placeholder="e.g. Samsung TV"
          />
        </div>
        <div>
          <Label>Quantity</Label>
          <Input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Purchase Price</Label>
          <Input
            type="number"
            name="purchasePrice"
            value={form.purchasePrice}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <Button type="submit" className="w-full">
            ➕ Add Purchase
          </Button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">📋 Purchase Logs</h2>
      <div className="space-y-3">
        {purchases.map((p) => (
          <div
            key={p._id}
            className="flex justify-between border p-3 rounded shadow-sm"
          >
            <div>
              <p className="font-medium">{p.productName}</p>
              <p className="text-sm text-gray-500">
                Qty: {p.quantity} | Rs {p.purchasePrice}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(p.date).toLocaleDateString()}
              </p>
            </div>
            <p className="text-right font-bold text-orange-500">
              Rs {p.totalCost}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
