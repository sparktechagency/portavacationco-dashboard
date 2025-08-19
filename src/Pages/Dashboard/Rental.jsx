"use client";

import { useState } from "react";
import classNames from "classnames";
import propertyImage from "../../assets/propCardImg.png";
import PropertyCard from "../../components/Shared/PropertyCard";

const properties = [
  {
    id: 1,
    image: propertyImage,
    title: "The Island House at Anglers Court",
    description: "Speaks to your role as both host and travel expert",
    rating: 4.9,
    reviews: 23,
    bedrooms: 2,
    bathrooms: 1,
    guests: 6,
  },
  {
    id: 2,
    image: propertyImage,
    title: "Oceanview Luxury Villa",
    description: "Stunning views of the Pacific with private beach access",
    rating: 4.8,
    reviews: 42,
    bedrooms: 3,
    bathrooms: 2,
    guests: 8,
  },
  {
    id: 4,
    image: propertyImage,
    title: "Downtown Modern Loft",
    description: "Chic urban living in the heart of the city",
    rating: 4.7,
    reviews: 35,
    bedrooms: 1,
    bathrooms: 1,
    guests: 4,
  },
  {
    id: 5,
    image: propertyImage,
    title: "Mountain Retreat Cabin",
    description: "Cozy getaway surrounded by nature and hiking trails",
    rating: 4.9,
    reviews: 28,
    bedrooms: 2,
    bathrooms: 1,
    guests: 5,
  },
  {
    id: 6,
    image: propertyImage,
    title: "Lakeside Family Cottage",
    description: "Perfect for family vacations with fishing and swimming",
    rating: 4.8,
    reviews: 26,
    bedrooms: 3,
    bathrooms: 2,
    guests: 8,
  },
  {
    id: 7,
    image: propertyImage,
    title: "Golf Course Estate",
    description: "Luxury living with private golf course access",
    rating: 4.9,
    reviews: 40,
    bedrooms: 4,
    bathrooms: 3,
    guests: 12,
  },
];

const RentalPage = () => {
  const categories = ["Home Rental", "Car Rental", "Golf Cart Rental"];

  const [activeCategory, setActiveCategory] = useState("Home Rental");

  return (
    <div className="bg-white p-10">
      <div className="max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Rental Page</h1>
          <div className="mt-4">
            <input
              type="search"
              placeholder="Search for rentals..."
              className="w-full px-4 py-2 rounded-full border"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              className={classNames(
                "px-4 py-2 rounded-full border font-medium text-sm",
                {
                  "bg-blue-900 text-white border-blue-900":
                    category === activeCategory,
                  "text-blue-900 border-blue-900 hover:bg-blue-50":
                    category !== activeCategory,
                }
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {properties.map((property) => (
            <div key={property.id}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalPage;
