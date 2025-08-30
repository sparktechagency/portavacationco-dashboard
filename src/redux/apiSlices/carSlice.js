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

    //car category

    getAllCarCategory: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/category/admin",
        };
      },
      providesTags: ["CarCategory"],
    }),

    addCarCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/category/create-category",
          body: data,
        };
      },
      invalidatesTags: ["CarCategory"],
    }),

    updateCarCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PATCH",
          url: `/category/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["CarCategory"],
    }),

    deleteCarCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/category/${id}`,
        };
      },
      invalidatesTags: ["CarCategory"],
    }),
  }),
});

export const {
  useGetAllCarQuery,
  useGetAllCarCategoryQuery,
  useAddCarCategoryMutation,
  useUpdateCarCategoryMutation,
  useDeleteCarCategoryMutation,
} = carSlice;
