'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';

export default function ExpensesPage() {
  const [form, setForm] = useState({ type: '', amount: '' });
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    if (data.success) setExpenses(data.expenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, addedBy: 'Admin' }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success('Expense added!');
      setForm({ type: '', amount: '' });
      fetchExpenses();
    } else {
      toast.error('Failed to add');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💸 Add Expense</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <Label>Expense Type</Label>
          <Input
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            placeholder="e.g. Electricity, Rent"
          />
        </div>
        <div>
          <Label>Amount</Label>
          <Input
            type="number"
            name="amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="Enter amount"
          />
        </div>
        <div className="col-span-2">
          <Button type="submit" className="w-full">
            ➕ Add Expense
          </Button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">📋 All Expenses</h2>
      <div className="space-y-3">
        {expenses.map((exp) => (
          <div
            key={exp._id}
            className="flex justify-between border p-3 rounded shadow-sm"
          >
            <div>
              <p className="font-medium">{exp.type}</p>
              <p className="text-sm text-gray-500">
                {new Date(exp.date).toLocaleDateString()}
              </p>
            </div>
            <p className="text-right text-green-600 font-bold">Rs {exp.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
