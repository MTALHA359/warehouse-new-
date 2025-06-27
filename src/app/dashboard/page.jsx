
// 'use client';

// import { useEffect, useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { FiDollarSign, FiTrendingUp, FiBox, FiAlertCircle, FiBarChart } from 'react-icons/fi';
// import { toast } from 'react-hot-toast';

// export default function DashboardPage() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const res = await fetch('/api/dashboard/summary');
//         const data = await res.json();
//         if (data.success) {
//           setStats(data.data);
//         } else {
//           toast.error('Failed to load dashboard stats');
//         }
//         setLoading(false);
//       } catch (err) {
//         toast.error('Dashboard error');
//         setLoading(false);
//       }
//     }
//     fetchStats();
//   }, []);

//   if (loading) return <p className="p-6 text-lg">📊 Loading dashboard...</p>;
//   if (!stats) return <p className="p-6 text-red-500">❌ Failed to load dashboard data.</p>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         <Card>
//           <CardContent className="p-6 flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Sales</p>
//               <p className="text-xl font-semibold">Rs {stats.totalSales}</p>
//             </div>
//             <FiTrendingUp className="text-green-500 text-3xl" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6 flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Expenses</p>
//               <p className="text-xl font-semibold">Rs {stats.totalExpenses}</p>
//             </div>
//             <FiDollarSign className="text-red-500 text-3xl" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6 flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Net Profit</p>
//               <p className="text-xl font-semibold">Rs {stats.profit}</p>
//             </div>
//             <FiBarChart className="text-blue-500 text-3xl" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6 flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Low Stock</p>
//               <p className="text-xl font-semibold">{stats.lowStockCount} items</p>
//             </div>
//             <FiAlertCircle className="text-yellow-500 text-3xl" />
//           </CardContent>
//         </Card>
//       </div>

//       <h2 className="text-xl font-semibold mb-4">🔥 Top Selling Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {stats.topProducts.map((p, idx) => (
//           <Card key={idx}>
//             <CardContent className="p-4 flex flex-col items-start">
//               <p className="text-md font-medium">{p.name}</p>
//               <p className="text-sm text-gray-600">Sold: {p.qty}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import {
  FiDollarSign,
  FiTrendingUp,
  FiShoppingCart,
  FiAlertCircle,
  FiBarChart,
} from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-hot-toast';
import 'chart.js/auto';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard/summary');
        const data = await res.json();
        if (data.success) {
          setStats(data.data || data.stats); // support both field names
        } else {
          toast.error('❌ Failed to load dashboard stats');
        }
      } catch (error) {
        toast.error('🚨 Error loading dashboard data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="p-6 text-lg">📊 Loading dashboard...</p>;
  if (!stats) return <p className="p-6 text-red-500">❌ Failed to load dashboard data.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-xl font-semibold">Rs {stats.totalSales}</p>
            </div>
            <FiTrendingUp className="text-green-500 text-3xl" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Purchases</p>
              <p className="text-xl font-semibold">Rs {stats.totalPurchases}</p>
            </div>
            <FiShoppingCart className="text-blue-500 text-3xl" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-xl font-semibold">Rs {stats.totalExpenses}</p>
            </div>
            <FiDollarSign className="text-red-500 text-3xl" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Net Profit</p>
              <p className="text-xl font-semibold">Rs {stats.profit}</p>
            </div>
            <FiBarChart className="text-purple-500 text-3xl" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-xl font-semibold">{stats.lowStockCount}</p>
            </div>
            <FiAlertCircle className="text-yellow-500 text-3xl" />
          </CardContent>
        </Card>
      </div>

      {/* Top Selling Bar Chart */}
      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">🔥 Top Selling Products</h2>
        {stats.topSelling?.length ? (
          <Bar
            data={{
              labels: stats.topSelling.map((item) => item.name),
              datasets: [
                {
                  label: 'Quantity Sold',
                  data: stats.topSelling.map((item) => item.qty),
                  backgroundColor: '#4F46E5',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        ) : (
          <p className="text-gray-500">No top products found.</p>
        )}
      </div>
    </div>
  );
}
