// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error('Failed to fetch products');
//       }
//     } catch {
//       toast.error('Error loading products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure to delete this product?')) return;

//     try {
//       const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (data.success) {
//         toast.success('Deleted!');
//         fetchProducts(); // refresh list
//       } else {
//         toast.error('Failed to delete');
//       }
//     } catch {
//       toast.error('Server error');
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">📦 All Products</h1>
//         <Link href="/products/add">
//           <Button>Add New Product</Button>
//         </Link>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="overflow-x-auto rounded shadow bg-white">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase">
//               <tr>
//                 <th className="px-4 py-3">Image</th>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">SKU</th>
//                 <th className="px-4 py-3">Price</th>
//                 <th className="px-4 py-3">Stock</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">
//                     <img
//                       src={p.image}
//                       alt={p.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                   </td>
//                   <td className="px-4 py-2">{p.name}</td>
//                   <td className="px-4 py-2">{p.sku}</td>
//                   <td className="px-4 py-2">Rs {p.salePrice}</td>
//                   <td className="px-4 py-2">{p.quantity}</td>
//                   <td className="px-4 py-2 space-x-2">
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => handleDelete(p._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Sidebar from '@/components/custom/Sidebar';
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
<Sidebar/>
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.products);
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          📦 All Products
        </h1>
        <Link href="/products/add">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Warehouse</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded border"
                  />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3">{product.sku}</td>
                <td className="p-3">{product.warehouse}</td>
                <td className="p-3">Rs {product.salePrice}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
