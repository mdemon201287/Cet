// src/app/admin/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Define the Agency interface
interface Agency {
  _id: string;
  name: string;
  category: string;
  location: string;
  teamSize: string;
  rate: string;
  rating: number;
  image?: string;
  description?: string;
}

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [selectedAgencyIds, setSelectedAgencyIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAgencyId, setEditingAgencyId] = useState<string | null>(null);
  const [newCompany, setNewCompany] = useState<Agency>({
    _id: '',
    name: '',
    location: '',
    category: '',
    teamSize: '',
    rate: '',
    rating: 0,
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
    } else {
      fetchAgencies();
    }
  }, [isAuthenticated, router]);

  // Fetch agencies from the API
  const fetchAgencies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/agencies');
      const data: Agency[] = await response.json();
      setAgencies(data);
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };

  const handleSelectAgency = (id: string) => {
    if (selectedAgencyIds.includes(id)) {
      setSelectedAgencyIds(selectedAgencyIds.filter((agencyId) => agencyId !== id));
    } else {
      setSelectedAgencyIds([...selectedAgencyIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAgencyIds([]);
    } else {
      const allIds = agencies.map((agency) => agency._id);
      setSelectedAgencyIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = async () => {
    if (selectedAgencyIds.length === 0) {
      alert('Please select at least one agency to delete.');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete the selected agencies?'
    );
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedAgencyIds.map((id) =>
          fetch(`http://localhost:5000/api/agencies/${id}`, { method: 'DELETE' })
        )
      );
      setAgencies(agencies.filter((agency) => !selectedAgencyIds.includes(agency._id)));
      setSelectedAgencyIds([]);
      setSelectAll(false);
      alert('Selected agencies have been deleted successfully.');
    } catch (error) {
      console.error('Error deleting agencies:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDeleteAgency = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this agency?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/agencies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAgencies((prevAgencies) => prevAgencies.filter((agency) => agency._id !== id));
        alert('Agency deleted successfully.');
      } else {
        alert('Failed to delete the agency. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting agency:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleAddOrEditCompany = async () => {
    if (
      !newCompany.name ||
      !newCompany.location ||
      !newCompany.category ||
      !newCompany.teamSize ||
      !newCompany.rate ||
      newCompany.rating < 1 || // Ensure rating is >= 1
      newCompany.rating > 5 // Ensure rating is <= 5
    ) {
      alert('Please fill in all fields and ensure rating is between 1 and 5.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newCompany.name);
      formData.append('location', newCompany.location);
      formData.append('category', newCompany.category);
      formData.append('teamSize', newCompany.teamSize);
      formData.append('rate', newCompany.rate);
      formData.append('rating', newCompany.rating.toString());
      formData.append('description', newCompany.description || '');
      if (imageFile) formData.append('image', imageFile);

      const url = isEditing
        ? `http://localhost:5000/api/agencies/${editingAgencyId}`
        : 'http://localhost:5000/api/agencies';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        fetchAgencies();
        setAddCompanyModalOpen(false);
        resetForm();
      } else {
        alert(`Failed to ${isEditing ? 'edit' : 'add'} company.`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'editing' : 'adding'} company:`, error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEditAgency = (agency: Agency) => {
    setNewCompany({
      ...agency,
    });
    setEditingAgencyId(agency._id);
    setImagePreview(
      agency.image ? `http://localhost:5000/uploads/${agency.image}` : null
    );
    setImageFile(null); // Reset image for new upload
    setIsEditing(true);
    setAddCompanyModalOpen(true);
  };

  const resetForm = () => {
    setNewCompany({
      _id: '',
      name: '',
      location: '',
      category: '',
      teamSize: '',
      rate: '',
      rating: 0,
      description: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingAgencyId(null);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-100 p-6">
        <h2 className="text-xl font-bold text-center mb-4">Best DevShop</h2>
        <ul className="space-y-4">
          {['Dashboard', 'Category', 'Company', 'Quotes', 'User', 'Settings'].map(
            (section) => (
              <li
                key={section}
                className={`p-2 rounded-md cursor-pointer ${
                  section === 'Company' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'
                }`}
              >
                {section}
              </li>
            )
          )}
        </ul>
      </div>
      <div className="w-3/4 bg-gray-50 p-6">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setAddCompanyModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Agency
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
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-3 text-left">Logo</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Hourly Rate</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency) => (
                <tr key={agency._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedAgencyIds.includes(agency._id)}
                      onChange={() => handleSelectAgency(agency._id)}
                    />
                  </td>
                  <td className="p-3">
                    <img
                      src={agency.image || '/placeholder-logo.png'}
                      alt="Logo"
                      className="w-10 h-10 object-cover"
                    />
                  </td>
                  <td className="p-3">{agency.name}</td>
                  <td className="p-3">{agency.category}</td>
                  <td className="p-3">{agency.location}</td>
                  <td className="p-3">{agency.rating}</td>
                  <td className="p-3">{agency.rate}</td>
                  <td className="p-3">
                    <button
                      className="text-blue-500 hover:underline mr-4"
                      onClick={() => handleEditAgency(agency)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteAgency(agency._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isAddCompanyModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Agency' : 'Add New Agency'}
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Agency Name"
                  className="w-full p-2 border rounded"
                  value={newCompany.name}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="w-full p-2 border rounded"
                  value={newCompany.location}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, location: e.target.value })
                  }
                />
                <select
                  name="category"
                  className="w-full p-2 border rounded"
                  value={newCompany.category}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Business Services">Business Services</option>
                </select>
                <input
                  type="text"
                  name="teamSize"
                  placeholder="Team Size"
                  className="w-full p-2 border rounded"
                  value={newCompany.teamSize}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, teamSize: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="rate"
                  placeholder="Hourly Rate"
                  className="w-full p-2 border rounded"
                  value={newCompany.rate}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, rate: e.target.value })
                  }
                />
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (0-5)"
                  className="w-full p-2 border rounded"
                  value={newCompany.rating}
                  min={1}
                  max={5}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, rating: parseFloat(e.target.value) })
                  }
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  value={newCompany.description}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, description: e.target.value })
                  }
                ></textarea>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full p-2"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover mx-auto"
                  />
                )}
                <button
                  type="button"
                  onClick={handleAddOrEditCompany}
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  {isEditing ? 'Save Changes' : 'Add Agency'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddCompanyModalOpen(false);
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

export default AdminDashboard;
