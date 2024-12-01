// frontend/src/app/admin/dashboard/category/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

// Define the Category interface
interface Category {
  _id: string;
  name: string;
  type: string;
  parentCategory?: string;
}

const AdminCategoryDashboard = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({
    _id: '',
    name: '',
    type: 'Parent Category',
    parentCategory: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
    } else {
      fetchCategories();
    }
  }, [isAuthenticated, router]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data: Category[] = await response.json();
      // Add predefined parent categories if not present
      const predefinedParentCategories = [
        'Agencies',
        'Development',
        'IT Services',
        'Marketing',
        'Design',
        'Business Services',
      ];
      const enrichedCategories = [
        ...data,
        ...predefinedParentCategories
          .filter((name) => !data.some((category) => category.name === name))
          .map((name) => ({ _id: name.toLowerCase().replace(/\s+/g, '-'), name, type: 'Parent Category' })),
      ];
      setCategories(enrichedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((categoryId) => categoryId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedCategoryIds(selectAll ? [] : categories.map((category) => category._id));
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = async () => {
    if (selectedCategoryIds.length === 0) {
      alert('Please select at least one category to delete.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete the selected categories?');
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedCategoryIds.map((id) =>
          fetch(`http://localhost:5000/api/categories/${id}`, { method: 'DELETE' })
        )
      );
      setCategories((prev) => prev.filter((category) => !selectedCategoryIds.includes(category._id)));
      setSelectedCategoryIds([]);
      setSelectAll(false);
      alert('Selected categories have been deleted successfully.');
    } catch (error) {
      console.error('Error deleting categories:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCategories((prev) => prev.filter((category) => category._id !== id));
        alert('Category deleted successfully.');
      } else {
        alert('Failed to delete the category. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleAddOrEditCategory = async () => {
    if (!newCategory.name || (newCategory.type === 'Subcategory' && !newCategory.parentCategory)) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const url = isEditing
        ? `http://localhost:5000/api/categories/${editingCategoryId}`
        : 'http://localhost:5000/api/categories';

      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        fetchCategories();
        setAddCategoryModalOpen(false);
        resetForm();
      } else {
        alert(`Failed to ${isEditing ? 'edit' : 'add'} category.`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'editing' : 'adding'} category:`, error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEditCategory = (category: Category) => {
    setNewCategory({ ...category });
    setEditingCategoryId(category._id);
    setIsEditing(true);
    setAddCategoryModalOpen(true);
  };

  const resetForm = () => {
    setNewCategory({
      _id: '',
      name: '',
      type: 'Parent Category',
      parentCategory: '',
    });
    setIsEditing(false);
    setEditingCategoryId(null);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-100 p-6">
        <h2 className="text-xl font-bold text-center mb-4">Best DevShop</h2>
        <ul className="space-y-4">
          {[
            { name: 'Dashboard', path: '/admin/dashboard' },
            { name: 'Category', path: '/admin/dashboard/category' },
            { name: 'Company', path: '/admin/dashboard/company' },
            { name: 'Quotes', path: '/admin/dashboard/quotes' },
            { name: 'User', path: '/admin/dashboard/user' },
            { name: 'Settings', path: '/admin/dashboard/settings' },
          ].map((section) => (
            <li
              key={section.name}
              className={`p-2 rounded-md cursor-pointer ${
                section.name === 'Category'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
            >
              <Link href={section.path}>{section.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-gray-50 p-6">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setAddCategoryModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Category
          </button>
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Bulk Delete
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="p-3 text-left">Category/Subcategory Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Parent Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedCategoryIds.includes(category._id)}
                      onChange={() => handleSelectCategory(category._id)}
                    />
                  </td>
                  <td className="p-3">{category.name}</td>
                  <td className="p-3">{category.type}</td>
                  <td className="p-3">{category.parentCategory || 'N/A'}</td>
                  <td className="p-3">
                    <button
                      className="text-blue-500 hover:underline mr-4"
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isAddCategoryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Category/Subcategory Name"
                  className="w-full p-2 border rounded"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <select
                  name="type"
                  className="w-full p-2 border rounded"
                  value={newCategory.type}
                  onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
                >
                  <option value="Parent Category">Parent Category</option>
                  <option value="Subcategory">Subcategory</option>
                </select>
                {newCategory.type === 'Subcategory' && (
                  <select
                    name="parentCategory"
                    className="w-full p-2 border rounded"
                    value={newCategory.parentCategory}
                    onChange={(e) => setNewCategory({ ...newCategory, parentCategory: e.target.value })}
                  >
                    <option value="">Select Parent Category</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Business Services">Business Services</option>
                    {categories
                      .filter((category) => category.type === 'Parent Category')
                      .map((parentCategory) => (
                        <option key={parentCategory._id} value={parentCategory.name}>
                          {parentCategory.name}
                        </option>
                      ))}
                  </select>
                )}
                <button
                  type="button"
                  onClick={handleAddOrEditCategory}
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  {isEditing ? 'Save Changes' : 'Add Category'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddCategoryModalOpen(false);
                    resetForm();
                  }}
                  className="w-full bg-gray-500 text-white py-2 rounded mt-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategoryDashboard;
