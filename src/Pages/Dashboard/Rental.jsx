import { Table, Tag, Image, Spin, Space, Typography } from "antd";
import { useGetAllCarQuery } from "../../redux/apiSlices/carSlice";
import { imageUrl } from "../../redux/api/baseApi";

const { Text } = Typography;

const Rental = () => {
  const { data: getAllCars, isLoading } = useGetAllCarQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const carsData = getAllCars?.data || [];

  const columns = [
    {
      title: "Car",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <div className="flex items-center">
          <Image
            width={100}
            height={60}
            src={
              record?.images[0]?.startsWith("http")
                ? record?.images[0]
                : `${imageUrl}${record?.images[0]}`
            }
            alt={record.title}
            preview={true}
            className="rounded-md object-cover"
          />
          <div className="ml-4">
            <Text strong>{record.title}</Text>
            <div className="text-gray-500 text-sm">{record.location}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Text ellipsis={{ tooltip: text }} style={{ maxWidth: 300 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}/day`,
    },
    {
      title: "Facilities",
      key: "facility",
      dataIndex: "facility",
      render: (facilities) => (
        <Space size={[0, 8]} wrap>
          {facilities.slice(0, 2).map((facility, index) => (
            <Tag key={index} color="blue">
              {facility}
            </Tag>
          ))}
          {facilities.length > 2 && <Tag>+{facilities.length - 2} more</Tag>}
        </Space>
      ),
    },
    {
      title: "Status",
      key: "isDeleted",
      dataIndex: "isDeleted",
      render: (isDeleted) => (
        <Tag color={isDeleted ? "red" : "green"}>
          {isDeleted ? "Unavailable" : "Available"}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Car Rental Listings</h1>
        </div>
        <Table
          columns={columns}
          dataSource={carsData}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            hideOnSinglePage: true,
          }}
        />
      </div>
    </div>
  );
};

export default Rental;
