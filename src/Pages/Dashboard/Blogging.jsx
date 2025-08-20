import { useState } from "react";
import {
  Spin,
  Table,
  Tag,
  Image,
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogQuery,
} from "../../redux/apiSlices/blogSlice";
import dayjs from "dayjs";
import { imageUrl } from "../../redux/api/baseApi";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const Blogging = () => {
  const { data: getAllBlogs, isLoading } = useGetAllBlogQuery();
  const [addBlog, { isLoading: isLoadingAddBlog }] = useCreateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [sectionImages, setSectionImages] = useState({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const blogsData = getAllBlogs?.data || [];

  const handleDelete = async (id) => {
    try {
      const res = await deleteBlog(id).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Blog deleted successfully");
      } else {
        toast.error(res?.message || "Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => (
        <Image
          src={img?.startsWith("http") ? img : `${imageUrl}${img}`}
          alt="blog-img"
          width={80}
          height={60}
          style={{ objectFit: "cover", borderRadius: 6 }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      ellipsis: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <Tag color="blue">{dayjs(date).format("MMM DD, YYYY HH:mm")}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <FaEye className="cursor-pointer w-5 h-5 text-blue-500" />
          <FaEdit className="cursor-pointer w-5 h-5 text-green-500" />
          <FaTrash
            className="cursor-pointer w-5 h-5 text-red-500"
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  // Custom upload handler
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Build FormData for API call
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("details", values.details);

      // Append main blog image if exists
      if (values.blogImage && values.blogImage.length > 0) {
        formData.append("blogImage", values.blogImage[0].originFileObj);
      }

      // Process and append blog sections
      const subBlogSections =
        values.subBlogSections?.map((section, index) => {
          // Get uploaded section images
          const image1File =
            section.image1 && section.image1[0]
              ? section.image1[0].originFileObj
              : null;
          const image2File =
            section.image2 && section.image2[0]
              ? section.image2[0].originFileObj
              : null;

          // Append section images to formData with unique names
          if (image1File) {
            const image1Name = `section_${index}_image1_${image1File.name}`;
            formData.append("blogSectionImages", image1File, image1Name);
          }

          if (image2File) {
            const image2Name = `section_${index}_image2_${image2File.name}`;
            formData.append("blogSectionImages", image2File, image2Name);
          }

          // Return section data with just filenames
          return {
            title: section.title,
            details: section.details,
            image1: image1File
              ? `section_${index}_image1_${image1File.name}`
              : "",
            image2: image2File
              ? `section_${index}_image2_${image2File.name}`
              : "",
          };
        }) || [];

      // Append the subBlogSections as JSON string
      formData.append("subBlogSections", JSON.stringify(subBlogSections));

      await addBlog(formData).unwrap();
      message.success("Blog created successfully!");
      setIsModalOpen(false);
      form.resetFields();
      setSectionImages({});
    } catch (error) {
      console.error("Error creating blog:", error);
      message.error("Failed to create blog. Please check your inputs.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card
        title="All Blogs"
        bordered={false}
        className="shadow-md rounded-xl"
        extra={
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Add Blog
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={blogsData}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add Blog Modal */}
      <Modal
        title="Add Blog"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText={isLoadingAddBlog ? "Creating..." : "Create"}
        confirmLoading={isLoadingAddBlog}
        width={800}
      >
        <Form layout="vertical" form={form}>
          {/* Blog Basic Info */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter blog title" />
          </Form.Item>

          <Form.Item
            label="Details"
            name="details"
            rules={[{ required: true, message: "Please enter details" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter blog details" />
          </Form.Item>

          <Form.Item
            label="Blog Image"
            name="blogImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Select Blog Image</Button>
            </Upload>
          </Form.Item>

          {/* Dynamic Blog Sections */}
          <h3 className="font-semibold mt-6 mb-2">Blog Sections</h3>
          <Form.List name="subBlogSections">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    className="mb-4 border rounded-lg shadow-sm"
                    title={`Section ${name + 1}`}
                    extra={
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      />
                    }
                  >
                    <Form.Item
                      {...restField}
                      label="Section Title"
                      name={[name, "title"]}
                      rules={[
                        { required: true, message: "Enter section title" },
                      ]}
                    >
                      <Input placeholder="Section title" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Section Details"
                      name={[name, "details"]}
                      rules={[
                        { required: true, message: "Enter section details" },
                      ]}
                    >
                      <Input.TextArea rows={3} placeholder="Section details" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Image 1"
                      name={[name, "image1"]}
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>Pick Image 1</Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Image 2"
                      name={[name, "image2"]}
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>Pick Image 2</Button>
                      </Upload>
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Blog Section
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default Blogging;
