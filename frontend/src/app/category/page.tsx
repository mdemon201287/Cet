// app/category/page.tsx

import { useEffect, useState } from "react";
import Link from "next/link";

const CategoryPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Fetch categories
    fetch('/api/agencies/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));

    // Fetch subcategories for each category
    categories.forEach((category) => {
      fetch(`/api/agencies/subcategories/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setSubCategories((prev) => ({ ...prev, [category]: data }));
        });
    });
  }, [categories]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="mt-4">
        {categories.map((category) => (
          <div key={category}>
            <div className="font-semibold">{category}</div>
            <ul className="ml-4">
              {subCategories[category]?.map((subCategory) => (
                <li key={subCategory}>
                  <Link href={`/category/${category}/${subCategory}`} className="text-blue-600">
                    {subCategory}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
