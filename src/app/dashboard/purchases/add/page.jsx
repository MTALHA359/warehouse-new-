'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AddPurchasePage() {
  const router = useRouter();
  const [supplier, setSupplier] = useState('');
  const [products, setProducts] = useState([{ productId: '', quantity: 1, price: 0 }]);
  const [allProducts, setAllProducts] = useState([]);
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  // Fetch product list from DB
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setAllProducts(data.products);
      else toast.error('❌ Failed to load products');
    };
    fetchProducts();
  }, []);

  const handleAddRow = () => {
    setProducts([...products, { productId: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = field === 'quantity' || field === 'price' ? +value : value;
    setProducts(updated);
  };

  const totalPrice = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplier, products, totalPrice, purchaseDate }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('✅ Purchase added');
        router.push('/dashboard/purchases');
      } else {
        toast.error(data.message || '❌ Failed to add purchase');
      }
    } catch (err) {
      console.error(err);
      toast.error('🚨 Error while adding purchase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Add Purchase</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Supplier</label>
          <input
            required
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Supplier Name"
          />
        </div>

        <div>
          <label className="block mb-1">Purchase Date</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <h4 className="font-semibold mb-2">Products</h4>
          {products.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2">
              <select
                value={item.productId}
                onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                className="border p-2"
                required
              >
                <option value="">-- Select Product --</option>
                {allProducts.map((p) => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>

              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                className="border p-2"
                placeholder="Qty"
              />

              <input
                type="number"
                min={0}
                value={item.price}
                onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                className="border p-2"
                placeholder="Price"
              />

              <button
                type="button"
                onClick={() => handleRemoveRow(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                ❌
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddRow}
            className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
          >
            ➕ Add Product
          </button>
        </div>

        <div className="text-lg font-semibold">
          Total: Rs {totalPrice}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Purchase'}
        </button>
      </form>
    </div>
  );
}
