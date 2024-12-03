import { useState } from "react";

interface AddCategoryProps {
  onCategoryAdded: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState<string>("");

  const handleAddCategory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        setCategoryName("");
        onCategoryAdded(); // Refresh the categories
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category Name"
        className="border px-2 py-1 rounded mr-2"
      />
      <button
        onClick={handleAddCategory}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Category
      </button>
    </div>
  );
};

export default AddCategory;
