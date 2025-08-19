import React, { useState } from "react";
import { Table, Tag, Space, Button, Avatar } from "antd";

const approveUsers = [
  {
    id: 1,
    name: "John Doe",
    plan: "Monthly",
    status: "pending",
    imgUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    plan: "Yearly",
    status: "approved",
    imgUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Michael Brown",
    plan: "Monthly",
    status: "rejected",
    imgUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Emily Davis",
    plan: "Weekly",
    status: "pending",
    imgUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "David Wilson",
    plan: "Quarterly",
    status: "approved",
    imgUrl: "https://i.pravatar.cc/150?img=5",
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "User",
    key: "user",
    render: (record) => (
      <Space>
        <Avatar src={record.imgUrl} alt={record.name} />
        {record.name}
      </Space>
    ),
  },
  {
    title: "Plan",
    dataIndex: "plan",
    key: "plan",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color = "";
      if (status === "approved") color = "green";
      else if (status === "pending") color = "orange";
      else if (status === "rejected") color = "red";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space>
        <Button className="bg-green-300 border border-green-600" size="small">
          Approve
        </Button>
        <Button className="text-red-700 border border-red-600" size="small">
          Reject
        </Button>
      </Space>
    ),
  },
];

const ApproveUsersTable = () => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <div className="p-5 bg-white rounded-2xl my-5">
      <h1 className="font-bold text-xl">Approve User</h1>
      <Table
        dataSource={approveUsers}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
          onShowSizeChange: (current, size) => setPageSize(size),
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default ApproveUsersTable;
