import React from "react";
import rentMeLogo from "../../assets/navLogo.png";
import BookingStates from "../../components/ui/Home/BookingStates";
import BookingChart from "../../components/ui/Home/BookingChart";
import RentalTypes from "../../components/ui/Home/RentalTypes";
import RevenueChart from "../../components/ui/Home/RevenueChart";

const Home = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  return (
    <div>
      <BookingStates />
      <div className="flex gap-5 w-full my-3">
        <div className="w-[70%]">
          <BookingChart />
        </div>
        <div className="w-[30%]">
          <RentalTypes />
        </div>
      </div>
      <RevenueChart />
    </div>
  );
};

export default Home;
