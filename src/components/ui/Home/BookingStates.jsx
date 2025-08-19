const state = {
  totalRevenue: 0,
  totalClients: 0,
  pendingApplications: 0,
  completedConsultations: 0,
};

const BookingStates = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6 w-full md:h-[100px]">
      <div className="bg-primary rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-lg text-gray-400">Total Bookings</h1>
            <h1 className="text-2xl font-semibold text-white">
              {state?.totalRevenue || 0}
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-primary rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-lg text-gray-400">Total Revenue</h1>
            <h1 className="text-2xl font-semibold text-white">
              $ {state?.totalClients}
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-primary rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-lg text-gray-400">Total Checkouts</h1>
            <h1 className="text-2xl font-semibold text-white">
              {state?.pendingApplications}
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-primary rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-lg text-gray-400">Pending Check Ins</h1>
            <h1 className="text-2xl font-semibold text-white">
              {state?.completedConsultations}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStates;
