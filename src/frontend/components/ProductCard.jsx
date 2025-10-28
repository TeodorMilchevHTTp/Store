import React from "react";

export default function ProductCard({ product }) {
  const { name, image, description, price } = product;

  return (
    <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition">
      <img src={image} alt={name} className="w-16 h-16 rounded mr-4 object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <p className="text-orange-600 font-bold mt-1">${price}</p>
      </div>
      <button className="ml-4 bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition">
        Add
      </button>
    </div>
  );
}
