// 'use client';
// import Link from 'next/link';
// import { FaBox, FaChartBar, FaMoneyBill, FaBarcode } from 'react-icons/fa';
// import { FaWarehouse } from 'react-icons/fa';

// const Sidebar = () => {
//   const links = [
//     { label: 'Dashboard', href: '/dashboard', icon: <FaChartBar /> },
//     { label: 'Products', href: '/products', icon: <FaBox /> },
//     { label: 'Sales', href: '/sales', icon: <FaBarcode /> },
//       { label: 'Reports', href: '/reports', icon: <FaMoneyBill /> },
//       { label: 'Warehouses', href: '/warehouses', icon: <FaWarehouse /> },

//   ];

//   return (
//     <aside className="w-[260px] bg-gray-900 text-white h-screen p-4">
//       <h2 className="text-xl font-bold mb-6">📦 WarehousePro+</h2>
//       <ul className="space-y-3">
//         {links.map((link) => (
//           <li key={link.href}>
//             <Link
//               href={link.href}
//               className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
//             >
//               {link.icon}
//               {link.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;


'use client';

import Link from 'next/link';
import { FaBox, FaChartBar, FaHome, FaWarehouse, FaBarcode } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { FiCreditCard } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';

const links = [
  { label: 'Dashboard', href: '/', icon: <FaChartBar /> },
  { label: 'Products', href: '/products', icon: <FaBox /> },
    { label: 'Sales', href: '/sales', icon: <FaBarcode /> },
    { label: 'Stats', href: '/dashboard/stats', icon: <FiBarChart /> },
    { label: 'Expenses', href: '/dashboard/expenses', icon: <FiCreditCard /> },
    { label: 'Purchases', href: '/dashboard/purchases', icon: <FiShoppingCart /> },
  { label: 'Reports', href: '/reports', icon: <FaHome /> },
  { label: 'Warehouses', href: '/warehouses', icon: <FaWarehouse /> },
];

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-[#0e1628] text-white p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-6">📦 WarehousePro+</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 hover:bg-[#1e2d4d] p-2 rounded"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
