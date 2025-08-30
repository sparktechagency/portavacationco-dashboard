"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Spin,
  Image,
} from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PlusOutlined } from "@ant-design/icons";
import {
  useAddCarCategoryMutation,
  useDeleteCarCategoryMutation,
  useGetAllCarCategoryQuery,
  useUpdateCarCategoryMutation,
} from "../../redux/apiSlices/carSlice";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const CarCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const { data: getAllCarCategory, isLoading } = useGetAllCarCategoryQuery();
  const [addCarCategory, { isLoading: isAddLoading }] =
    useAddCarCategoryMutation();
  const [updateCarCategory, { isLoading: isUpdateLoading }] =
    useUpdateCarCategoryMutation();
  const [deleteCarCategory, { isLoading: isDeleteLoading }] =
    useDeleteCarCategoryMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const carCategoryData = getAllCarCategory?.data || [];

  // Open modal for Add
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      name: record.name,
      image: [
        {
          uid: "-1",
          name: record.name,
          status: "done",
          url: record.image?.startsWith("http")
            ? record.image
            : `${imageUrl}${record.image}`,
        },
      ],
    });
    setIsModalOpen(true);
  };

  // Delete record (not implemented yet)
  const handleDelete = async (key) => {
    try {
      const res = await deleteCarCategory(key);
      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Category deleted successfully");
      } else {
        toast.error(res?.data?.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      message.error("Validation failed");
    }
  };

  // Submit form
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("name", values.name);

      if (values.image && values.image.length > 0) {
        const file = values.image[0];
        if (file.originFileObj) {
          formData.append("image", file.originFileObj);
        }
      }

      if (editingRecord) {
        // Update
        const res = await updateCarCategory({
          id: editingRecord._id,
          data: formData,
        });

        if (res?.data?.success) {
          toast.success(res?.data?.message || "Category updated successfully");
        } else {
          toast.error(res?.error?.data?.message || "Update failed");
        }
      } else {
        // Add
        const res = await addCarCategory(formData);
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Category added successfully");
        } else {
          toast.error(res?.error?.data?.message || "Add failed");
        }
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Validation failed");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Image
          width={60}
          height={40}
          src={
            record?.image?.startsWith("http")
              ? record.image
              : `${imageUrl}${record.image}`
          }
          alt="car"
          preview={true}
          className="rounded-md object-cover"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          <FaEdit
            className="cursor-pointer text-blue-500"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure delete this category?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <FaTrash className="cursor-pointer text-red-500" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Car Categories</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Category
        </Button>
      </div>

      <div className="rounded-xl shadow-lg">
        <Table
          columns={columns}
          dataSource={carCategoryData}
          rowKey="_id"
          pagination={false}
        />
      </div>

      <Modal
        title={editingRecord ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={isAddLoading || isUpdateLoading}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            rules={[
              { required: !editingRecord, message: "Please upload image" },
            ]}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false} // prevent auto upload
            >
              + Upload
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CarCategory;
