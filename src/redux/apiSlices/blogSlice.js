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

    getBlogById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/blog/${id}`,
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

    updateBlog: builder.mutation({
      query: ({ id, data }) => {
        console.log("formData", data);
        return {
          method: "PATCH",
          url: `/blog/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogSlice;
