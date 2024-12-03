import { useState, useEffect } from "react";

interface Category {
  _id: string;
  name: string;
}

const Navbar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      if (response.ok) {
        const data: Category[] = await response.json();
        setCategories(data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-200">
      <div className="font-bold text-lg">BestDevShop</div>
      <ul className="flex space-x-4">
        {categories.map((category) => (
          <li key={category._id} className="relative group">
            <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-300">
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
