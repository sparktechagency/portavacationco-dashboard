import React from "react";
import { Table, Avatar, Tag, Button, ConfigProvider } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const data = Array.from({ length: 10 }).map((_, index) => ({
  key: index,
  user: {
    name: "Samuel Johnsons",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  property: {
    name: "The Island House at Paradise Point",
    image: "https://source.unsplash.com/100x100/?hotel,resort",
  },
  date: "12/02/25 - 17/02/25",
  price: "$7889",
  status: [
    "Checked Out",
    "Checked Out",
    "Checked In",
    "Checked Out",
    "Reserved",
    "Checked Out",
    "Checked Out",
    "Cancelled",
    "Checked Out",
    "Checked Out",
  ][index],
}));

const getStatusTag = (status) => {
  switch (status) {
    case "Checked In":
      return <Tag color="gold">Checked In</Tag>;
    case "Checked Out":
      return <Tag color="green">Checked Out</Tag>;
    case "Reserved":
      return <Tag color="blue">Reserved</Tag>;
    case "Cancelled":
      return <Tag color="red">Cancelled</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const columns = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
    render: (text, record, index) => index + 1,
  },
  {
    title: "User Name",
    dataIndex: "user",
    key: "user",
    render: (user) => (
      <div className="flex items-center gap-2">
        <Avatar src={user.avatar} />
        <span>{user.name}</span>
      </div>
    ),
  },
  {
    title: "Property Name",
    dataIndex: "property",
    key: "property",
    render: (property) => (
      <div className="flex items-center gap-2">
        <Avatar shape="square" src={property.image} />
        <span
          style={{
            maxWidth: 150,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {property.name}
        </span>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "price",
    key: "price",
    render: (price) => (
      <span style={{ color: "#ff6b6b", fontWeight: 500 }}>{price}</span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => getStatusTag(status),
  },
  {
    title: "Action",
    key: "action",
    render: () => <Button type="text" icon={<EyeOutlined />} />,
  },
];

const bookings = () => {
  return (
    <div className="bg-white p-10">
      <h1 className="text-xl font-semibold mb-4">Booking Details</h1>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#131B4D",
              headerColor: "#fff",
              headerColorHover: "#fff",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default bookings;
