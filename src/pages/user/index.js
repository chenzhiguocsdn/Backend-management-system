import { React, useEffect, useState } from "react";
import {
  Table,
  message,
  Popconfirm,
  Button,
  Form,
  Input,
  Modal,
  Radio,
  DatePicker,
  Space,
  InputNumber,
} from "antd";
import "./index.css";
import dayjs from "dayjs";
import {
  getUserData,
  createUserData,
  updataUserData,
  deleteUserData,
  serchUserData,
} from "../../api/index.js";
function User() {
  const [userData, setUserData] = useState([]);
  const [form] = Form.useForm();
  const [value, setValue] = useState("M");
  //  userId用户id
  const [userId, setUserId] = useState();
  function convertISOToBirthdate(isoDateString) {
    // 创建一个 Date 对象
    const date = new Date(isoDateString);

    // 提取年、月、日
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // 月份是从0开始的，所以要+1
    const day = ("0" + date.getUTCDate()).slice(-2);

    // 拼接成出生日期字符串
    return `${year}-${month}-${day}`;
  }
  //
  // 获取用户数数据
  const getUserDataFn = async () => {
    await getUserData()
      .then(function (response) {
        console.log(response, "userdata");
        const data = response.data
          .map((item) => {
            item.gender = item.gender === "M" ? "男" : "女";
            item.birthdate = convertISOToBirthdate(item.birthdate);
            return item;
          })
          .reverse();

        setUserData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserDataFn();
  }, []);
  const onChange = (e) => {
    console.log("radio checked", e.target);
    setValue(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(1);

  const onCreate = (values) => {
    if (add) {
      // 新增用户
      createUserData(values).then((res) => {
        console.log("res:;", res);
        getUserDataFn();
      });
      console.log("新增操作", values);
    } else {
      values.id = userId;
      console.log("编辑values", values);
      updataUserData(values).then(() => {
        getUserDataFn();
      });
      form.resetFields();
    }
    setOpen(false);
  };
  // 测试数据
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     sex: "F",
  //     date: "2024-11-7",
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     sex: "M",
  //     date: "2024-11-7",
  //     address: "London No. 1 Lake Park",
  //   },
  // ];
  // 搜索功能
  const { Search } = Input;
  const onSearch = (value) => {
    serchUserData(value).then((res) => {
      setUserData(res)
    });
    // console.log('搜索',value);
  };
  const confirm = () => {
    let userid = {
      id: userId,
    };
    deleteUserData(userid).then(() => {
      console.log("删除成功");
      getUserDataFn();
    });
    // console.log(e);
    message.success("删除成功");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("取消删除");
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "出生日期",
      dataIndex: "birthdate",
      key: "birthdate",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      key: "action",
      render: (record) => {
        return (
          <Space size="middle">
            <div>
              <Button
                type="primary"
                onClick={() => {
                  setAdd(0);
                  setOpen(true);
                  let data = JSON.parse(JSON.stringify(record));
                  data.birthdate = dayjs(data.birthdate);
                  data.gender = data.gender === "男" ? "M" : "F";
                  setUserId(data.id);
                  console.log("编辑data", userId);
                  form.setFieldsValue(data);
                }}
              >
                编辑
              </Button>
            </div>
            <Popconfirm
              title="您确定要删除吗"
              onConfirm={confirm}
              onCancel={cancel}
              okText="是"
              cancelText="否"
            >
              <Button
                type="primary"
                danger
                onClick={() => {
                  setUserId(record.id);
                }}
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="user">
      <div className="top">
        <div>
          <Button
            type="primary"
            onClick={() => {
              setAdd(1);
              setOpen(true);
            }}
          >
            新增
          </Button>
          <Modal
            open={open}
            title={add ? "新增" : "编辑"}
            okText="确定"
            cancelText="取消"
            onCancel={() => {
              form.resetFields();
              setOpen(false);
            }}
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
            </Form>
          </Modal>
        </div>
        <Space>
          <Search
            placeholder="请输入姓名"
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={onSearch}
          />
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={userData}
        rowKey={(userData) => userData.id}
      />
      <div className="down"></div>
    </div>
  );
}

export default User;
