'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';

export default function WarehousesPage() {
  const [form, setForm] = useState({ name: '', location: '' });
  const [warehouses, setWarehouses] = useState([]);

  const fetchWarehouses = async () => {
    const res = await fetch('/api/warehouses');
    const data = await res.json();
    if (data.success) setWarehouses(data.warehouses);
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/warehouses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      toast.success('Warehouse added!');
      setForm({ name: '', location: '' });
      fetchWarehouses();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/warehouses/${id}`, { method: 'DELETE' });
    toast.success('Warehouse deleted');
    fetchWarehouses();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🏢 Warehouses</h1>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <div>
          <Label>Name</Label>
          <Input
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Location</Label>
          <Input
            name="location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="flex items-end">
          <Button type="submit">Add Warehouse</Button>
        </div>
      </form>

      <div className="space-y-4">
        {warehouses.map((w) => (
          <div
            key={w._id}
            className="flex justify-between bg-white p-4 shadow rounded"
          >
            <div>
              <p className="font-semibold">{w.name}</p>
              <p className="text-sm text-gray-500">{w.location}</p>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(w._id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
