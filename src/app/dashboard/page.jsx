
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import {
// // //   FiDollarSign,
// // //   FiTrendingUp,
// // //   FiShoppingCart,
// // //   FiAlertCircle,
// // //   FiBarChart,
// // // } from 'react-icons/fi';
// // // import { Card, CardContent } from '@/components/ui/card';
// // // import { Bar } from 'react-chartjs-2';
// // // import { toast } from 'react-hot-toast';
// // // import 'chart.js/auto';

// // // export default function DashboardPage() {
// // //   const [stats, setStats] = useState(null);
// // //   const [totalPurchases, setTotalPurchases] = useState(0); // 👈 new state
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchSummary = async () => {
// // //       try {
// // //         const res = await fetch('/api/dashboard/summary');
// // //         const data = await res.json();
// // //         if (data.success) {
// // //           const statData = data.data || data.stats;
// // //           setStats(statData);
// // //           setTotalPurchases(statData.totalPurchases || 0); // ✅ update UI
// // //         } else {
// // //           toast.error('❌ Failed to load dashboard stats');
// // //         }
// // //       } catch (error) {
// // //         toast.error('🚨 Error loading dashboard data');
// // //         console.error(error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchSummary();
// // //   }, []);

// // //   if (loading) return <p className="p-6 text-lg">📊 Loading dashboard...</p>;
// // //   if (!stats) return <p className="p-6 text-red-500">❌ Failed to load dashboard data.</p>;

// // //   return (
// // //     <div className="p-6 max-w-6xl mx-auto space-y-8">
// // //       <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>

// // //       {/* Stat Cards */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         <Card>
// // //           <CardContent className="p-6 flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Total Sales</p>
// // //               <p className="text-xl font-semibold">Rs {stats.totalSales}</p>
// // //             </div>
// // //             <FiTrendingUp className="text-green-500 text-3xl" />
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6 flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Total Purchases</p>
// // //               <p className="text-xl font-semibold">Rs {totalPurchases}</p> {/* ✅ using state */}
// // //             </div>
// // //             <FiShoppingCart className="text-blue-500 text-3xl" />
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6 flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Total Expenses</p>
// // //               <p className="text-xl font-semibold">Rs {stats.totalExpenses}</p>
// // //             </div>
// // //             <FiDollarSign className="text-red-500 text-3xl" />
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6 flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Net Profit</p>
// // //               <p className="text-xl font-semibold">Rs {stats.profit}</p>
// // //             </div>
// // //             <FiBarChart className="text-purple-500 text-3xl" />
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6 flex items-center justify-between">
// // //             <div>
// // //               <p className="text-sm text-gray-500">Low Stock Items</p>
// // //               <p className="text-xl font-semibold">{stats.lowStockCount}</p>
// // //             </div>
// // //             <FiAlertCircle className="text-yellow-500 text-3xl" />
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       {/* Top Selling Bar Chart */}
// // //       <div className="bg-white shadow-md p-6 rounded-xl">
// // //         <h2 className="text-xl font-semibold mb-4">🔥 Top Selling Products</h2>
// // //         {stats.topSelling?.length ? (
// // //           <Bar
// // //             data={{
// // //               labels: stats.topSelling.map((item) => item.name),
// // //               datasets: [
// // //                 {
// // //                   label: 'Quantity Sold',
// // //                   data: stats.topSelling.map((item) => item.qty),
// // //                   backgroundColor: '#4F46E5',
// // //                 },
// // //               ],
// // //             }}
// // //             options={{
// // //               responsive: true,
// // //               plugins: {
// // //                 legend: {
// // //                   display: false,
// // //                 },
// // //               },
// // //             }}
// // //           />
// // //         ) : (
// // //           <p className="text-gray-500">No top products found.</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // 'use client';

// // import { useEffect, useState } from 'react';
// // import {
// //   FiDollarSign,
// //   FiTrendingUp,
// //   FiShoppingCart,
// //   FiAlertCircle,
// //   FiBarChart,
// // } from 'react-icons/fi';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Bar } from 'react-chartjs-2';
// // import { toast } from 'react-hot-toast';
// // import 'chart.js/auto';

// // // Helper function to format large numbers
// // const formatNumber = (num) => {
// //   if (num === null || num === undefined) return '0';
// //   return new Intl.NumberFormat('en-IN').format(num);
// // };

// // export default function DashboardPage() {
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchSummary = async () => {
// //       try {
// //         const res = await fetch('/api/dashboard/summary');
// //         const data = await res.json();
// //         if (data.success) {
// //           const statData = data.data || data.stats;
// //           // Validate and format numbers before setting state
// //           const formattedStats = {
// //             ...statData,
// //             totalSales: statData.totalSales || 0,
// //             totalPurchases: statData.totalPurchases || 0,
// //             totalExpenses: statData.totalExpenses || 0,
// //             profit: statData.profit || 0,
// //             lowStockCount: statData.lowStockCount || 0
// //           };
// //           setStats(formattedStats);
// //         } else {
// //           toast.error('❌ Failed to load dashboard stats');
// //         }
// //       } catch (error) {
// //         toast.error('🚨 Error loading dashboard data');
// //         console.error(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchSummary();
// //   }, []);

// //   if (loading) return <p className="p-6 text-lg">📊 Loading dashboard...</p>;
// //   if (!stats) return <p className="p-6 text-red-500">❌ Failed to load dashboard data.</p>;

// //   return (
// //     <div className="p-6 max-w-6xl mx-auto space-y-8">
// //       <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>

// //       {/* Stat Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         <Card>
// //           <CardContent className="p-6 flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-500">Total Sales</p>
// //               <p className="text-xl font-semibold">Rs {formatNumber(stats.totalSales)}</p>
// //             </div>
// //             <FiTrendingUp className="text-green-500 text-3xl" />
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardContent className="p-6 flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-500">Total Purchases</p>
// //               <p className="text-xl font-semibold">Rs {formatNumber(stats.totalPurchases)}</p>
// //             </div>
// //             <FiShoppingCart className="text-blue-500 text-3xl" />
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardContent className="p-6 flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-500">Total Expenses</p>
// //               <p className="text-xl font-semibold">Rs {formatNumber(stats.totalExpenses)}</p>
// //             </div>
// //             <FiDollarSign className="text-red-500 text-3xl" />
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardContent className="p-6 flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-500">Net Profit</p>
// //               <p className="text-xl font-semibold">Rs {formatNumber(stats.profit)}</p>
// //             </div>
// //             <FiBarChart className="text-purple-500 text-3xl" />
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardContent className="p-6 flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-500">Low Stock Items</p>
// //               <p className="text-xl font-semibold">{formatNumber(stats.lowStockCount)}</p>
// //             </div>
// //             <FiAlertCircle className="text-yellow-500 text-3xl" />
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Top Selling Bar Chart */}
// //       <div className="bg-white shadow-md p-6 rounded-xl">
// //         <h2 className="text-xl font-semibold mb-4">🔥 Top Selling Products</h2>
// //         {stats.topSelling?.length ? (
// //           <Bar
// //             data={{
// //               labels: stats.topSelling.map((item) => item.name),
// //               datasets: [
// //                 {
// //                   label: 'Quantity Sold',
// //                   data: stats.topSelling.map((item) => item.qty),
// //                   backgroundColor: '#4F46E5',
// //                 },
// //               ],
// //             }}
// //             options={{
// //               responsive: true,
// //               plugins: {
// //                 legend: {
// //                   display: false,
// //                 },
// //               },
// //             }}
// //           />
// //         ) : (
// //           <p className="text-gray-500">No top products found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   FiDollarSign,
//   FiTrendingUp,
//   FiShoppingCart,
//   FiAlertCircle,
//   FiBarChart,
// } from 'react-icons/fi';
// import { Card, CardContent } from '@/components/ui/card';
// import { Bar } from 'react-chartjs-2';
// import { toast } from 'react-hot-toast';
// import 'chart.js/auto';

// // Helper function to format large numbers
// const formatNumber = (num) => {
//   if (num === null || num === undefined) return '0';
//   return new Intl.NumberFormat('en-IN').format(num);
// };

// export default function DashboardPage() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const res = await fetch('/api/dashboard/summary');
//         const data = await res.json();
//         if (data.success) {
//           const statData = data.data || data.stats;
//           const formattedStats = {
//             ...statData,
//             totalSales: statData.totalSales || 0,
//             totalPurchases: statData.totalPurchases || 0,
//             totalExpenses: statData.totalExpenses || 0,
//             profit: statData.profit || 0,
//             lowStockCount: statData.lowStockCount || 0
//           };
//           setStats(formattedStats);
//         } else {
//           toast.error('❌ Failed to load dashboard stats');
//         }
//       } catch (error) {
//         toast.error('🚨 Error loading dashboard data');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSummary();
//   }, []);

//   if (loading) return <p className="p-6 text-lg">📊 Loading dashboard...</p>;
//   if (!stats) return <p className="p-6 text-red-500">❌ Failed to load dashboard data.</p>;

//   return (
//     <div className="flex min-h-screen">
      
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white p-6">
//         <h2 className="text-2xl font-bold mb-8">📋 Menu</h2>
//         <ul className="space-y-4">
//           <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
//           <li className="hover:text-blue-400 cursor-pointer">Reports</li>
//           <li className="hover:text-blue-400 cursor-pointer">Products</li>
//           <li className="hover:text-blue-400 cursor-pointer">Settings</li>
//         </ul>
//       </aside>

//       {/* Dashboard Content */}
//       <main className="flex-1 p-6 space-y-8 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>

//         {/* Stat Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <Card>
//             <CardContent className="p-6 flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Sales</p>
//                 <p className="text-xl font-semibold">Rs {formatNumber(stats.totalSales)}</p>
//               </div>
//               <FiTrendingUp className="text-green-500 text-3xl" />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6 flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Purchases</p>
//                 <p className="text-xl font-semibold">Rs {formatNumber(stats.totalPurchases)}</p>
//               </div>
//               <FiShoppingCart className="text-blue-500 text-3xl" />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6 flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Expenses</p>
//                 <p className="text-xl font-semibold">Rs {formatNumber(stats.totalExpenses)}</p>
//               </div>
//               <FiDollarSign className="text-red-500 text-3xl" />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6 flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Net Profit</p>
//                 <p className="text-xl font-semibold">Rs {formatNumber(stats.profit)}</p>
//               </div>
//               <FiBarChart className="text-purple-500 text-3xl" />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6 flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Low Stock Items</p>
//                 <p className="text-xl font-semibold">{formatNumber(stats.lowStockCount)}</p>
//               </div>
//               <FiAlertCircle className="text-yellow-500 text-3xl" />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Top Selling Bar Chart */}
//         <div className="bg-white shadow-md p-6 rounded-xl">
//           <h2 className="text-xl font-semibold mb-4">🔥 Top Selling Products</h2>
//           {stats.topSelling?.length ? (
//             <Bar
//               data={{
//                 labels: stats.topSelling.map((item) => item.name),
//                 datasets: [
//                   {
//                     label: 'Quantity Sold',
//                     data: stats.topSelling.map((item) => item.qty),
//                     backgroundColor: '#4F46E5',
//                   },
//                 ],
//               }}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: { display: false },
//                 },
//               }}
//             />
//           ) : (
//             <p className="text-gray-500">No top products found.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
