// frontend/src/app/admin/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Product {
  id: string;
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description?: string;
  image?: string;
  rating: number;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.065 5.639 1.672 8.055L12 18.769l-7.607 4.231L6.065 14.945 0 9.306l8.332-1.151L12 .587z" />
      </svg>
    ))}
  </div>
);

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]); // State for products
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    location: '',
    teamSize: '',
    rate: '',
    description: '',
    image: '',
    rating: 0,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [isEditing, setIsEditing] = useState(false); // Editing mode flag
  const [editingProductId, setEditingProductId] = useState<string | null>(null); // ID of the product being edited

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // If not authenticated, render nothing

  // Handle image upload for product
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or update product with validation
  const handleAddProduct = () => {
    const { name, location, teamSize, rate, rating } = newProduct;

    // Validation: check if required fields are filled and rating is in the correct range
    if (!name || !location || !teamSize || !rate || rating === undefined || rating < 0 || rating > 5) {
      alert("Please fill in all required fields and ensure rating is between 0 and 5.");
      return;
    }

    if (isEditing) {
      setProducts(products.map((product) => (product.id === editingProductId ? { ...newProduct, id: editingProductId } : product)));
      setIsEditing(false);
      setEditingProductId(null);
    } else {
      setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
    }
    resetForm();
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Edit product
  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setImagePreview(product.image || null);
    setIsEditing(true);
    setEditingProductId(product.id);
  };

  // Reset form after submission or canceling editing
  const resetForm = () => {
    setNewProduct({ id: '', name: '', location: '', teamSize: '', rate: '', description: '', image: '', rating: 0 });
    setImagePreview(null);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
      </div>

      {/* Add/Edit Product Section */}
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

        {/* Rating Input */}
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

        {/* Image Upload Field */}
        <div className="mb-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
          </div>
        )}

        <button onClick={handleAddProduct} className="w-full bg-blue-600 text-white py-2 rounded">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      {/* Product List */}
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.location}</p>
            <p>{product.teamSize}</p>
            <p>{product.rate}</p>
            <p>{product.description}</p>

            {/* Display Rating as Stars */}
            <StarRating rating={product.rating} />

            {/* Display Image */}
            {product.image && <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4" />}

            <button
              onClick={() => handleEditProduct(product)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
