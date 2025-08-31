import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  Spin,
  Table,
  Image,
  message,
  Popconfirm,
} from "antd";
import {
  useAddCarMutation,
  useDeleteCarMutation,
  useGetAllCarCategoryQuery,
  useGetAllCarQuery,
  useUpdateCarMutation,
} from "../../redux/apiSlices/carSlice";
import { imageUrl } from "../../redux/api/baseApi";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const { Option } = Select;

const Rental = () => {
  const { data: allCars, isLoading, refetch } = useGetAllCarQuery();
  const { data: allCategories, isLoading: isCategoriesLoading } =
    useGetAllCarCategoryQuery();
  const [createCar, { isLoading: isCreatingCar }] = useAddCarMutation();
  const [updateCar, { isLoading: isUpdatingCar }] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  const [remainingUrls, setRemainingUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isModalOpen) {
      setFileList([]);
    }
  }, [isModalOpen]);

  if (isLoading || isCategoriesLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );

  const allCarsData = allCars?.data;
  const allCategoriesData = allCategories?.data;

  // Open Add Modal
  const handleAdd = () => {
    setEditingCar(null);
    setFileList([]);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (record) => {
    setEditingCar(record);
    const initialUrls = record.images || [];
    setRemainingUrls(initialUrls);

    const newFileList = initialUrls.map((img, index) => ({
      uid: String(-index - 1),
      name: `image-${index}.png`,
      status: "done",
      url: img.startsWith("http") ? img : `${imageUrl}/${img}`,
    }));
    setFileList(newFileList);

    form.setFieldsValue({
      title: record.title,
      description: record.description,
      price: record.price,
      location: record.location,
      categoryId: record.categoryId,
      facility: record.facility,
    });

    setIsModalOpen(true);
  };

  // Handle image removal - update remainingUrls
  const handleRemove = (file) => {
    if (file.url) {
      const urlToRemove = file.url.startsWith(imageUrl)
        ? file.url.replace(`${imageUrl}/`, "")
        : file.url;
      setRemainingUrls((prev) => prev.filter((url) => url !== urlToRemove));
    }
    return true; // Allow removal from upload list
  };

  // Handle upload changes
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Submit Form
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("location", values.location);
      formData.append("categoryId", values.categoryId);

      // Append facilities
      if (values.facility) {
        values.facility.forEach((item) => formData.append("facility", item));
      }

      remainingUrls.forEach((url) => {
        formData.append("remainingUrl", url);
      });

      // Append new images only (those with originFileObj)
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      if (editingCar) {
        // For update, send both the ID and the form data
        const res = await updateCar({
          id: editingCar._id,
          data: formData, // Changed from 'body' to 'data' to match your API slice
        }).unwrap();
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Car updated successfully");
        } else {
          toast.error(res?.error?.data?.message || "Update failed");
        }
      } else {
        const res = await createCar(formData).unwrap();
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Car added successfully");
        } else {
          toast.error(res?.error?.data?.message || "Add failed");
        }
      }

      setIsModalOpen(false);
      setFileList([]);
      form.resetFields();
      refetch();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.data?.message || "Something went wrong!");
    }
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Car",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex gap-2 items-center">
          <Image
            src={
              record?.images[0]?.startsWith("http")
                ? record?.images[0]
                : `${imageUrl}/${record?.images[0]}`
            }
            alt={record?.title}
            width={80}
            height={60}
          />
          <p>{record?.title}</p>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "25%",
      render: (text) => <p className="line-clamp-2">{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Facilities",
      key: "facility",
      dataIndex: "facility",
      render: (_, record) => (
        <div className="line-clamp-2">{record?.facility?.join(", ")}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <FaEdit
            className="cursor-pointer text-green-500"
            size={18}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure delete this car?"
            onConfirm={() => deleteCar(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <FaTrash className="cursor-pointer text-red-500" size={18} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Car Rental</h1>
        <Button type="primary" onClick={handleAdd}>
          Add Car
        </Button>
      </div>

      <Table columns={columns} dataSource={allCarsData} rowKey="_id" />

      {/* Add/Edit Modal */}
      <Modal
        title={editingCar ? "Edit Car" : "Add Car"}
        open={isModalOpen}
        onOk={handleSubmit}
        confirmLoading={isCreatingCar || isUpdatingCar}
        onCancel={() => setIsModalOpen(false)}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter car title" }]}
          >
            <Input placeholder="Car title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={3} placeholder="Car description" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber className="w-full" placeholder="Car price" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input placeholder="Car location" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              {allCategoriesData?.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Facilities">
            <Form.List name="facility">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex gap-2 mb-2">
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a facility",
                          },
                        ]}
                        className="flex-1 mb-0"
                      >
                        <Input placeholder="Enter facility" />
                      </Form.Item>
                      <Button danger onClick={() => remove(name)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Facility
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item label="Images">
            <Upload
              listType="picture"
              multiple
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              onRemove={handleRemove} // Add remove handler
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Rental;
