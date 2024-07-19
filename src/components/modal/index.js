import { React, useState } from "react";
import { Button, Form, Input, Modal, Radio, DatePicker, Space } from "antd";
function CollectionCreateForm({ open, onCreate, onCancel, title }) {
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Modal
      open={open}
      title={title}
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: "请输入年龄姓名！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[
            {
              pattern: "^(0|[1-9][0-9]?|1[01][0-9]|120)$",
              required: true,
              message: "请输入正确的年龄！",
            },
          ]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="sex"
          label="性别"
          rules={[
            {
              required: true,
              message: "请选择性别！",
            },
          ]}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>{" "}
        <Form.Item
          name="date"
          label="出生日期"
          rules={[
            {
              required: true,
              message: "请填写出生日期！",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>{" "}
        <Form.Item
          name="address"
          label="地址"
          rules={[
            {
              required: true,
              message: "请输入地址！",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CollectionCreateForm;
