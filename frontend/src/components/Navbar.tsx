// src/components/Navbar.tsx

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Fetch categories
    fetch('/api/agencies/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));

    // Fetch subcategories for each category
    categories.forEach((category) => {
      fetch(`/api/agencies/subcategories/${category}`)
        .then((response) => response.json())
        .then((data) => {
          setSubCategories((prev) => ({ ...prev, [category]: data }));
        });
    });
  }, [categories]);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        {categories.map((category) => (
          <li key={category} className="relative group">
            <span className="cursor-pointer">{category}</span>
            {subCategories[category] && subCategories[category].length > 0 && (
              <ul className="absolute left-0 bg-white text-black mt-2 shadow-lg hidden group-hover:block">
                {subCategories[category].map((subCategory) => (
                  <li key={subCategory} className="px-4 py-2">
                    <Link href={`/subcategory/${category}/${subCategory}`}>
                      {subCategory}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
