import {React,useState} from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Table,
  Popconfirm,
  Radio,
  DatePicker,
  Space,
  InputNumber,
} from "antd";
import { confirmLogin,confirmregister } from "../../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [value, setValue] = useState("M");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    confirmregister(values)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "注册成功",
        });
        navigate("/login");
      })
      .catch(function (error) {
        messageApi.open({
          type: "error",
          content: "用户名已存在",
        });
        console.log("注册错误", error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (e) => {
 
    setValue(e.target.value);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
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
            required: true,
            message: "请输入正确的年龄！",
          },
        ]}
      >
        <InputNumber min={1} max={120} />
      </Form.Item>{" "}
      <Form.Item
        name="gender"
        label="性别"
        rules={[
          {
            required: true,
            message: "请选择性别！",
          },
        ]}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={"M"}>男</Radio>
          <Radio value={"F"}>女</Radio>
        </Radio.Group>
      </Form.Item>{" "}
      <Form.Item
        name="birthdate"
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
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {contextHolder}
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Register;
