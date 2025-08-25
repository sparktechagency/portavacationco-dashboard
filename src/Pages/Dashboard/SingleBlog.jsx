import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../redux/apiSlices/blogSlice";
import { Spin, Modal, Input, Upload, Button, message, Form } from "antd";
import { imageUrl } from "../../redux/api/baseApi";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blog, isLoading, refetch } = useGetBlogByIdQuery(id);
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [form] = Form.useForm();
  const [sectionForm] = Form.useForm();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const blogData = blog?.data;

  const handleOpenBlogModal = () => {
    form.setFieldsValue({
      title: blogData?.title,
      details: blogData?.details,
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenSectionModal = (section) => {
    setSelectedSection(section);
    sectionForm.setFieldsValue({
      subTitle: section?.subTitle,
      subDetails: section?.subDetails,
    });
    setIsSectionModalOpen(true);
  };

  const handleUpdateBlog = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("details", values.details);
      if (values.image && values.image.file) {
        formData.append("blogImage", values.image.file);
      }
      const res = await updateBlog({ id, data: formData }).unwrap();
      if (res?.success) {
        toast.success("Blog updated successfully ✅");
        setIsBlogModalOpen(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog ❌");
    }
  };

  // New function to handle section updates
  const handleUpdateSection = async (values) => {
    try {
      const formData = new FormData();

      // Append the section ID
      formData.append("subBlogId", selectedSection._id);

      // Handle image uploads
      if (values.images && values.images.fileList) {
        values.images.fileList.forEach((file, index) => {
          formData.append("blogSectionImages", file.originFileObj);
        });
      }

      // Prepare the updated section data
      const updatedSection = {
        subTitle: values.subTitle,
        subDetails: values.subDetails,
        // Keep existing image paths if no new images were uploaded
        image1:
          values.images && values.images.fileList[0]
            ? values.images.fileList[0].name
            : selectedSection.image1,
        image2:
          values.images && values.images.fileList[1]
            ? values.images.fileList[1].name
            : selectedSection.image2,
      };

      // Append the section data
      formData.append("subBlogSections", JSON.stringify(updatedSection));

      const res = await updateBlog({ id, data: formData }).unwrap();
      if (res?.success) {
        toast.success("Section updated successfully ✅");
        setIsSectionModalOpen(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update section ❌");
    }
  };

  return (
    <div className="bg-white p-5">
      {/* Blog Header */}
      <div>
        <img
          src={
            blogData?.image?.startsWith("http")
              ? blogData?.image
              : `${imageUrl}${blogData?.image}`
          }
          alt=""
          className="w-full h-[550px] object-cover rounded-xl"
        />
        <div className="p-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">{blogData?.title}</h1>
            <p className="text-gray-600 my-3">{blogData?.details}</p>
          </div>
          <div>
            <button
              onClick={handleOpenBlogModal}
              className="border rounded-xl p-3"
            >
              <FaEdit className="text-xl text-blue-500 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* Blog Sections */}
      <div>
        {blogData?.subBlogSections?.map((item) => (
          <div key={item?._id} className="border border-dashed p-5 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold">{item?.subTitle}</h1>
                <p>{item?.subDetails}</p>
              </div>
              <div className="flex gap-3 border rounded-xl p-3">
                <FaEdit
                  className="text-xl text-blue-500 cursor-pointer"
                  onClick={() => handleOpenSectionModal(item)}
                />
                <FaTrash className="text-xl text-red-500 cursor-pointer" />
              </div>
            </div>
            <div className="flex gap-5 w-full my-10">
              <img
                src={
                  item?.image1?.startsWith("http")
                    ? item?.image1
                    : `${imageUrl}${item?.image1}`
                }
                alt=""
                className="w-[45%] object-cover rounded-xl"
              />
              <img
                src={
                  item?.image2?.startsWith("http")
                    ? item?.image2
                    : `${imageUrl}${item?.image2}`
                }
                alt=""
                className="w-[45%] object-cover rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Blog Edit Modal */}
      <Modal
        title="Edit Blog"
        open={isBlogModalOpen}
        onCancel={() => setIsBlogModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateBlog}
          initialValues={{
            title: blogData?.title,
            details: blogData?.details,
          }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="details"
            label="Details"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} placeholder="Details" />
          </Form.Item>
          <Form.Item name="image" label="Image" valuePropName="file">
            <Upload
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
              defaultFileList={
                blogData?.image
                  ? [
                      {
                        uid: "-1",
                        name: "blogImage",
                        status: "done",
                        url: blogData?.image.startsWith("http")
                          ? blogData?.image
                          : `${imageUrl}${blogData?.image}`,
                      },
                    ]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}>Upload Blog Image</Button>
            </Upload>
          </Form.Item>
          <Button
            type="primary"
            className="mt-3 w-full"
            htmlType="submit"
            loading={updating}
          >
            Save
          </Button>
        </Form>
      </Modal>

      {/* Blog Section Edit Modal */}
      <Modal
        title="Edit Blog Section"
        open={isSectionModalOpen}
        onCancel={() => setIsSectionModalOpen(false)}
        footer={null}
      >
        <Form
          form={sectionForm}
          layout="vertical"
          onFinish={handleUpdateSection}
          initialValues={{
            subTitle: selectedSection?.subTitle,
            subDetails: selectedSection?.subDetails,
          }}
        >
          <Form.Item
            name="subTitle"
            label="Sub Title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Sub Title" />
          </Form.Item>
          <Form.Item
            name="subDetails"
            label="Sub Details"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} placeholder="Sub Details" />
          </Form.Item>
          <Form.Item name="images" label="Images">
            <Upload
              beforeUpload={() => false}
              listType="picture"
              maxCount={2}
              defaultFileList={[
                selectedSection?.image1 && {
                  uid: "-1",
                  name: "image1",
                  status: "done",
                  url: selectedSection?.image1?.startsWith("http")
                    ? selectedSection?.image1
                    : `${imageUrl}${selectedSection?.image1}`,
                },
                selectedSection?.image2 && {
                  uid: "-2",
                  name: "image2",
                  status: "done",
                  url: selectedSection?.image2?.startsWith("http")
                    ? selectedSection?.image2
                    : `${imageUrl}${selectedSection?.image2}`,
                },
              ].filter(Boolean)}
            >
              <Button icon={<UploadOutlined />}>
                Upload Section Images (Max: 2)
              </Button>
            </Upload>
          </Form.Item>
          <Button
            type="primary"
            className="mt-3 w-full"
            htmlType="submit"
            loading={updating}
          >
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default SingleBlog;
