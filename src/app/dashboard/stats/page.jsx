'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FiDollarSign, FiTrendingUp, FiCreditCard } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function StatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/dashboard/summary');
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        } else {
          toast.error('Failed to fetch stats');
        }
      } catch (err) {
        toast.error('Server error');
      }
    }

    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-center mt-10">Loading stats...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card className="shadow-md border">
        <CardContent className="flex justify-between items-center py-6">
          <div>
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold">Rs {stats.totalSales}</p>
          </div>
          <FiTrendingUp className="text-green-500 text-3xl" />
        </CardContent>
      </Card>

      <Card className="shadow-md border">
        <CardContent className="flex justify-between items-center py-6">
          <div>
            <p className="text-sm text-gray-500">Daily Expenses</p>
            <p className="text-2xl font-bold">Rs {stats.totalExpenses}</p>
          </div>
          <FiCreditCard className="text-red-500 text-3xl" />
        </CardContent>
      </Card>

      <Card className="shadow-md border">
        <CardContent className="flex justify-between items-center py-6">
          <div>
            <p className="text-sm text-gray-500">Net Profit</p>
            <p className="text-2xl font-bold text-blue-600">Rs {stats.profit}</p>
          </div>
          <FiDollarSign className="text-blue-500 text-3xl" />
        </CardContent>
      </Card>
    </div>
  );
}
