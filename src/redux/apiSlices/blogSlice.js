import { api } from "../api/baseApi";

const blogSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/blog",
        };
      },
      providesTags: ["Blog"],
    }),

    createBlog: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/blog/create-blog",
          body: data,
        };
      },
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/blog/${id}`,
        };
      },
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
} = blogSlice;
