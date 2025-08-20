import { api } from "../api/baseApi";

const carSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCar: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/car",
        };
      },
      providesTags: ["Car"],
    }),
  }),
});

export const { useGetAllCarQuery } = carSlice;
