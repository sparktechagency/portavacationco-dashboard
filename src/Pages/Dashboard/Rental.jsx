import { Spin } from "antd";
import { useGetAllCarQuery } from "../../redux/apiSlices/carSlice";

const Rental = () => {
  const { data: getAllCars, isLoading } = useGetAllCarQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const carsData = getAllCars?.data || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1>Car Rental</h1>
    </div>
  );
};

export default Rental;
