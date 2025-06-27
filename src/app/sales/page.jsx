

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { toast } from 'react-hot-toast';

// export default function SalesPage() {
//   const [products, setProducts] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [staffName, setStaffName] = useState('John Doe'); // Replace with session later
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchProducts() {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       if (data.success) setProducts(data.products);
//     }
//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const addToCart = (product) => {
//     const exists = selected.find((item) => item.productId === product._id);
//     if (exists) return;
//     setSelected([
//       ...selected,
//       {
//         productId: product._id,
//         name: product.name,
//         price: product.salePrice,
//         quantity: 1,
//       },
//     ]);
//   };

//   const updateQuantity = (index, qty) => {
//     const updated = [...selected];
//     updated[index].quantity = qty;
//     setSelected(updated);
//   };

//   const total = selected.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   const handleSubmit = async () => {
//     if (!customerName || selected.length === 0) {
//       return toast.error('Please enter customer name and select at least one product.');
//     }

//     try {
//       const res = await fetch('/api/sales', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           customerName,
//           staffName,
//           warehouse: 'Main Warehouse',
//           products: selected,
//           totalAmount: total,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success('Sale completed!');
//         setSelected([]);
//         setCustomerName('');

//         // ✅ Redirect to invoice page
//         router.push(`/sales/invoice/${data.sale._id}`);
//       } else {
//         toast.error(data.message || 'Failed to save sale.');
//       }
//     } catch (err) {
//       toast.error('Server error');
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">🧾 Sales / Billing</h1>

//       <Label className="mb-1 block">Search Products</Label>
//       <Input
//         placeholder="Type product name..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="mb-4"
//       />

//       <div className="flex flex-wrap gap-3 mb-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((p) => (
//             <Button
//               key={p._id}
//               onClick={() => addToCart(p)}
//               disabled={p.quantity <= 0}
//               variant="outline"
//               className="text-sm"
//             >
//               {p.name} (Qty: {p.quantity})
//             </Button>
//           ))
//         ) : (
//           <p className="text-gray-500">No products found.</p>
//         )}
//       </div>

//       <div className="space-y-2">
//         {selected.map((item, idx) => (
//           <div
//             key={item.productId}
//             className="flex items-center justify-between bg-white rounded p-3 shadow"
//           >
//             <span>{item.name}</span>
//             <Input
//               type="number"
//               min="1"
//               value={item.quantity}
//               onChange={(e) => updateQuantity(idx, parseInt(e.target.value))}
//               className="w-20"
//             />
//             <span>Rs {item.price}</span>
//             <span>Total: Rs {item.price * item.quantity}</span>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <Label>Customer Name</Label>
//         <Input
//           placeholder="Enter customer name"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           className="mb-4"
//         />
//         <p className="text-lg font-semibold">Total: Rs {total}</p>
//         <Button className="mt-2" onClick={handleSubmit}>
//           Complete Sale
//         </Button>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';

export default function SalesPage() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [staffName, setStaffName] = useState('John Doe'); // Replace with session
  const [lastSale, setLastSale] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.products);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const exists = selected.find((item) => item.productId === product._id);
    if (exists) return;
    setSelected([
      ...selected,
      {
        productId: product._id,
        name: product.name,
        price: product.salePrice,
        quantity: 1,
      },
    ]);
  };

  const updateQuantity = (index, qty) => {
    const updated = [...selected];
    updated[index].quantity = qty;
    setSelected(updated);
  };

  const total = selected.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async () => {
    if (!customerName || selected.length === 0) {
      return toast.error('Please enter customer name and select products.');
    }

    try {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          staffName,
          warehouse: 'Main Warehouse',
          products: selected,
          totalAmount: total,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Sale completed!');
        setSelected([]);
        setCustomerName('');
        setLastSale(data.sale); // ✅ Show invoice
      } else {
        toast.error(data.message || 'Failed to save sale.');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 Sales / Billing</h1>

      <div className="print:hidden">
        <Label className="mb-1 block">Search Products</Label>
        <Input
          placeholder="Type product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        <div className="flex flex-wrap gap-3 mb-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <Button
                key={p._id}
                onClick={() => addToCart(p)}
                disabled={p.quantity <= 0}
                variant="outline"
                className="text-sm"
              >
                {p.name} (Qty: {p.quantity})
              </Button>
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>

        <div className="space-y-2">
          {selected.map((item, idx) => (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-white rounded p-3 shadow"
            >
              <span>{item.name}</span>
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(idx, parseInt(e.target.value))}
                className="w-20"
              />
              <span>Rs {item.price}</span>
              <span>Total: Rs {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Label>Customer Name</Label>
          <Input
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mb-4"
          />
          <p className="text-lg font-semibold">Total: Rs {total}</p>
          <Button className="mt-2" onClick={handleSubmit}>
            Complete Sale
          </Button>
        </div>
      </div>

      {/* ✅ INVOICE DISPLAY */}
      {lastSale && (
        <div className="mt-10 p-6 bg-white rounded shadow border print:border-none print:shadow-none">
          <h2 className="text-xl font-bold mb-2">🧾 Invoice Preview</h2>
          <p><strong>Customer:</strong> {lastSale.customerName}</p>
          <p><strong>Staff:</strong> {lastSale.staffName}</p>
          <p><strong>Date:</strong> {new Date(lastSale.date).toLocaleString()}</p>
          <hr className="my-3" />

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-left">Product</th>
                <th className="border px-3 py-2">Qty</th>
                <th className="border px-3 py-2">Price</th>
                <th className="border px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {lastSale.products.map((item, index) => (
                <tr key={index}>
                  <td className="border px-3 py-1">{item.name}</td>
                  <td className="border px-3 py-1 text-center">{item.quantity}</td>
                  <td className="border px-3 py-1 text-right">Rs {item.price}</td>
                  <td className="border px-3 py-1 text-right">Rs {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 text-lg font-semibold">Total: Rs {lastSale.totalAmount}</p>

          <div className="mt-4 print:hidden">
            <Button onClick={() => window.print()}>🖨️ Print Invoice</Button>
          </div>
        </div>
      )}
    </div>
  );
}
