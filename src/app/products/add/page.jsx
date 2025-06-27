// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { toast } from 'react-hot-toast';
// export default function AddProduct() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: '',
//     sku: '',
//     category: '',
//     warehouse: '',
//     purchasePrice: '',
//     salePrice: '',
//     quantity: '',
//     lowStockLimit: '',
//     image: '',
//   });

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append(
//       'upload_preset',
//       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
//     );

//     try {
//       const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//       const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//       const res = await fetch(uploadUrl, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok && data.secure_url) {
//         setForm((prev) => ({ ...prev, image: data.secure_url }));
//         toast.success('Image uploaded!');
//       } else {
//         toast.error('Upload failed');
//       }
//     } catch (err) {
//       toast.error('Image upload failed');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success('Product added!');
//         router.push('/products');
//       } else {
//         toast.error(data.message || 'Failed to add product');
//       }
//     } catch (err) {
//       toast.error('Server error');
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">➕ Add Product</h1>
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         <div>
//           <Label>Name</Label>
//           <Input name="name" value={form.name} onChange={handleChange} />
//         </div>
//         <div>
//           <Label>SKU</Label>
//           <Input name="sku" value={form.sku} onChange={handleChange} />
//         </div>
//         <div>
//           <Label>Category</Label>
//           <Input name="category" value={form.category} onChange={handleChange} />
//         </div>
//         <div>
//           <Label>Warehouse</Label>
//           <Input name="warehouse" value={form.warehouse} onChange={handleChange} />
//         </div>
//         <div>
//           <Label>Purchase Price</Label>
//           <Input
//             type="number"
//             name="purchasePrice"
//             value={form.purchasePrice}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <Label>Sale Price</Label>
//           <Input
//             type="number"
//             name="salePrice"
//             value={form.salePrice}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <Label>Quantity</Label>
//           <Input
//             type="number"
//             name="quantity"
//             value={form.quantity}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <Label>Low Stock Limit</Label>
//           <Input
//             type="number"
//             name="lowStockLimit"
//             value={form.lowStockLimit}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="col-span-2">
//           <Label>Image</Label>
//           <Input type="file" onChange={handleImageUpload} />
//           {form.image && (
//             <img
//               src={form.image}
//               alt="Preview"
//               className="mt-3 h-32 rounded border object-contain"
//             />
//           )}
//         </div>
//         <div className="col-span-2 mt-4">
//           <Button type="submit" className="w-full">
//             Add Product
//                   </Button>
//         </div>
//       </form>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: '',
    warehouse: '',
    purchasePrice: '',
    salePrice: '',
    quantity: '',
    lowStockLimit: '',
    image: '',
  });

  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function fetchWarehouses() {
      const res = await fetch('/api/warehouses');
      const data = await res.json();
      if (data.success) setWarehouses(data.warehouses);
    }
    fetchWarehouses();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.secure_url) {
        setForm((prev) => ({ ...prev, image: data.secure_url }));
        toast.success('Image uploaded!');
      } else {
        toast.error('Upload failed');
      }
    } catch (err) {
      toast.error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Product added!');
        router.push('/products');
      } else {
        toast.error(data.message || 'Failed to add product');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">➕ Add Product</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label>SKU</Label>
          <Input name="sku" value={form.sku} onChange={handleChange} />
        </div>
        <div>
          <Label>Category</Label>
          <Input name="category" value={form.category} onChange={handleChange} />
        </div>
        <div>
          <Label>Warehouse</Label>
          <select
            name="warehouse"
            value={form.warehouse}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select warehouse</option>
            {warehouses.map((wh) => (
              <option key={wh._id} value={wh.name}>
                {wh.name} {wh.location && `(${wh.location})`}
              </option>
            ))}
          </select>
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
        <div>
          <Label>Sale Price</Label>
          <Input
            type="number"
            name="salePrice"
            value={form.salePrice}
            onChange={handleChange}
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
          <Label>Low Stock Limit</Label>
          <Input
            type="number"
            name="lowStockLimit"
            value={form.lowStockLimit}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <Label>Image</Label>
          <Input type="file" onChange={handleImageUpload} />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-3 h-32 rounded border object-contain"
            />
          )}
        </div>
        <div className="col-span-2 mt-4">
          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
}
