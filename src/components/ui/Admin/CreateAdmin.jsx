import { Form, Input, Modal } from 'antd';
import React from 'react';

const CreateAdmin = ({ open, setOpen }) => { 
  const [form] = Form.useForm();

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={handleClose}
      width={500}
      footer={null}
    >
      <div className="p-6 mt-4">
        <h1 className="font-semibold text-[#555555] text-xl mb-3">Add Admin</h1>
        
        <Form form={form} layout='vertical'>
          <Form.Item
            label="Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter the admin's name" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the admin's email" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input.Password className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item className="text-center mt-6">
            <button
              type="submit"
              className="bg-primary text-white w-40 h-11 rounded-lg"
            >
              Create
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateAdmin;
