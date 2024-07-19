import React, { useState } from "react";
import { Button, Layout, theme, Avatar, Space, Dropdown } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./index.css";
import { useDispatch } from "react-redux";
import { collapseMenu } from "../../store/reducers/tab";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;


function CommonHeader({isCollapse}) {
  const navigate = useNavigate()
  const outDr =  () => {
    navigate('/login')
    localStorage.removeItem('token')
    console.log('退出登入')
  }
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
        >
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.aliyun.com"
          onClick={outDr}
        >
          退出
        </a>
      ),
    },
  ];
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(isCollapse);
  const dispatch = useDispatch()
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => {
            console.log('collapsed值变化', isCollapse);
            setCollapsed(dispatch(collapseMenu()))}}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
          >
            <Space direction="vertical" size={16}>
              <Space wrap size={16} >
                <Avatar
                  style={{margin: '0 40px'}}
                  size={30}
                  src={
                    <img
                      src={require("../../assets/images/user.png")}
                      alt="头像"
                    />
                  }
                />
              </Space>
            </Space>
          </Dropdown>
        </Space>
      </Space>
    </Header>
  );
}

export default CommonHeader;
