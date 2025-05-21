import React from "react";
import ProductSkeleton from "./ProductSkeleton";

const ProductListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductListSkeleton;
