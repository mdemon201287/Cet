'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Product {
  _id: string;
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description?: string;
  image?: string;
  rating: number;
}

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, '_id'>>({
    name: '',
    location: '',
    teamSize: '',
    rate: '',
    description: '',
    image: '',
    rating: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
    } else {
      fetchProducts();
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/agencies');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleAddProduct = async () => {
    const { name, location, teamSize, rate, rating } = newProduct;
    if (!name || !location || !teamSize || !rate || rating < 0 || rating > 5) {
      alert('Please fill in all fields and ensure rating is between 0 and 5.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('location', newProduct.location);
    formData.append('teamSize', newProduct.teamSize);
    formData.append('rate', newProduct.rate);
    formData.append('rating', newProduct.rating.toString());
    formData.append('description', newProduct.description || '');
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = isEditing
        ? await fetch(`http://localhost:5000/api/agencies/${editingProductId}`, {
            method: 'PUT',
            body: formData,
          })
        : await fetch('http://localhost:5000/api/agencies', {
            method: 'POST',
            body: formData,
          });

      if (!response.ok) throw new Error('Failed to save product');
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/agencies/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      location: product.location,
      teamSize: product.teamSize,
      rate: product.rate,
      description: product.description,
      image: product.image,
      rating: product.rating,
    });
    setEditingProductId(product._id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setNewProduct({ name: '', location: '', teamSize: '', rate: '', description: '', image: '', rating: 0 });
    setImageFile(null);
    setIsEditing(false);
    setEditingProductId(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button onClick={logout} className="mb-4 bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
      </div>

      <div className="mb-6 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newProduct.location}
          onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Team Size"
          value={newProduct.teamSize}
          onChange={(e) => setNewProduct({ ...newProduct, teamSize: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Rate"
          value={newProduct.rate}
          onChange={(e) => setNewProduct({ ...newProduct, rate: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          min="0"
          max="5"
          placeholder="Rating (0-5)"
          value={newProduct.rating}
          onChange={(e) => setNewProduct({ ...newProduct, rating: Number(e.target.value) })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" />

        {imageFile && (
          <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-32 h-32 object-cover rounded mt-4" />
        )}

        <button onClick={handleAddProduct} className="w-full bg-blue-600 text-white py-2 rounded mt-4">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.location}</p>
            <p>{product.teamSize}</p>
            <p>{product.rate}</p>
            <p>{product.description}</p>
            {product.image && (
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="w-32 h-32 object-cover mb-4"
              />
            )}
            <button onClick={() => handleEditProduct(product)} className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-600 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
