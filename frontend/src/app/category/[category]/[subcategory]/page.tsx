// src/app/subcategory/[category]/[subCategory]/page.tsx

import React from 'react';
import { useRouter } from 'next/router';

const SubcategoryPage = () => {
  const router = useRouter();
  const { category, subCategory } = router.query;

  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Subcategory: {subCategory}</h2>
      {/* Render content specific to this category/subcategory */}
    </div>
  );
};

export default SubcategoryPage;
