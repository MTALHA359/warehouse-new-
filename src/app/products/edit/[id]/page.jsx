'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';

export default function EditProduct({ params }) {
  const router = useRouter();
  const { id } = params;

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm(data.product);
        } else {
          toast.error('Failed to load product');
        }
      })
      .catch(() => toast.error('Error fetching product'))
      .finally(() => setLoading(false));
  }, [id]);

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
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('✅ Product updated!');
        router.push('/products');
      } else {
        toast.error(data.message || 'Failed to update');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Product</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
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
            <Input name="warehouse" value={form.warehouse} onChange={handleChange} />
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
              Update Product
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
