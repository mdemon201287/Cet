// src/app/admin/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Agency {
  _id: string;  // Update to use _id instead of id
  name: string;
  location: string;
  teamSize: string; // Keep as string
  rate: string;
  description?: string;
  image?: string;
  rating: number;
}

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [newAgency, setNewAgency] = useState<Agency>({
    _id: '',
    name: '',
    location: '',
    teamSize: '', // Keep as string
    rate: '',
    description: '',
    image: '',
    rating: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAgencyId, setEditingAgencyId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin'); // Redirect to login if not authenticated
    } else {
      fetchAgencies();
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const fetchAgencies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/agencies');
      const data = await response.json();
      setAgencies(data); // Update the agencies state
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddAgency = async () => {
    const { name, location, teamSize, rate, rating, description } = newAgency;
  
    // Validation: Ensure all required fields are filled
    if (!name || !location || !teamSize || !rate || rating < 0 || rating > 5) {
      alert("Please fill in all fields and ensure rating is between 0 and 5.");
      return;
    }
  
    // Log data to check everything is correct
    console.log({
      name,
      location,
      teamSize,
      rate,
      rating,
      description,
      imageFile
    });
  
    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('teamSize', teamSize); // Keep as string
    formData.append('rate', rate);
    formData.append('rating', rating.toString());
    formData.append('description', description || '');
    if (imageFile) formData.append('image', imageFile);
  
    try {
      const response = await fetch('http://localhost:5000/api/agencies', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save agency:', errorData);
        alert(`Failed to save agency: ${errorData.message || 'Unknown error'}`);
        return;
      }
  
      console.log('Agency added successfully');
      fetchAgencies(); // Refresh agency list
      resetForm(); // Clear form fields
    } catch (error) {
      console.error('Error adding agency:', error);
      alert('Error adding agency. Check console for more details.');
    }
  };
  
  const handleDeleteAgency = async (id: string) => {
    console.log(`Trying to delete agency with ID: ${id}`);
    try {
      const response = await fetch(`http://localhost:5000/api/agencies/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert(`Failed to delete agency: ${errorText}`);
        return;
      }

      console.log('Delete successful');
      setAgencies(agencies.filter((agency) => agency._id !== id));
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to delete agency');
    }
  };

  const resetForm = () => {
    setNewAgency({
      _id: '',
      name: '',
      location: '',
      teamSize: '', // Keep as string
      rate: '',
      description: '',
      image: '',
      rating: 0,
    });
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button onClick={logout} className="mb-4 bg-red-600 text-white px-4 py-2 rounded">Logout</button>

      <div className="mb-6 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Agency' : 'Add New Agency'}</h2>
        <input type="text" placeholder="Name" value={newAgency.name} onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })} className="w-full p-2 border rounded mb-4" />
        <input type="text" placeholder="Location" value={newAgency.location} onChange={(e) => setNewAgency({ ...newAgency, location: e.target.value })} className="w-full p-2 border rounded mb-4" />
        <input type="text" placeholder="Team Size" value={newAgency.teamSize} onChange={(e) => setNewAgency({ ...newAgency, teamSize: e.target.value })} className="w-full p-2 border rounded mb-4" />
        <input type="text" placeholder="Rate" value={newAgency.rate} onChange={(e) => setNewAgency({ ...newAgency, rate: e.target.value })} className="w-full p-2 border rounded mb-4" />
        <input type="number" min="0" max="5" placeholder="Rating" value={newAgency.rating} onChange={(e) => setNewAgency({ ...newAgency, rating: Number(e.target.value) })} className="w-full p-2 border rounded mb-4" />
        <textarea placeholder="Description" value={newAgency.description} onChange={(e) => setNewAgency({ ...newAgency, description: e.target.value })} className="w-full p-2 border rounded mb-4"></textarea>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
        {imagePreview && <img src={imagePreview} alt="Preview" className="mb-4" style={{ maxWidth: '200px' }} />}
        <button onClick={handleAddAgency} className="bg-blue-600 text-white px-4 py-2 rounded">{isEditing ? 'Update Agency' : 'Add Agency'}</button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Agencies</h2>
      <ul className="list-disc pl-5">
        {agencies.map((agency) => (
          <li key={agency._id} className="flex justify-between items-center mb-2">
            <span>{agency.name} - {agency.location} - {agency.teamSize} - {agency.rate} - {agency.rating}</span>
            <button onClick={() => handleDeleteAgency(agency._id)} className="ml-2 bg-red-600 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
