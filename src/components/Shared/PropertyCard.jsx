import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="flex flex-col h-full border bg-white rounded-lg shadow-xl hover:shadow-2xl overflow-hidden">
      {/* Image container with fixed aspect ratio */}
      <div className="w-full aspect-[4/3] relative overflow-hidden">
        <img
          src={property?.image}
          alt={property?.public_name}
          className="object-cover"
        />
      </div>
      {/* Content container that grows to fill space */}
      <div className="p-4 flex flex-col flex-grow">
        <h1 className="text-xl md:text-2xl font-semibold text-primary line-clamp-2">
          {property?.public_name}
        </h1>
        <p className="text-base my-2 text-gray-600 line-clamp-2">
          {property?.description}
        </p>
        <div className="flex items-center text-primary font-semibold gap-2 mt-2">
          <span>{property?.capacity?.beds} Bed</span>
          <span>-</span>
          <span>{property?.capacity?.bathrooms} Bath</span>
          <span>-</span>
          <span>{property?.capacity?.max} Guests</span>
        </div>
        <div className="text-center mt-4">
          <Link to={`/rentals/${property.id}`}>
            <button className="bg-primary text-white px-6 py-3 rounded-full w-[60%] hover:bg-primary/80 transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
