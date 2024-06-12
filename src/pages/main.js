import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector,useDispatch } from "react-redux";

const { Header, Sider, Content } = Layout;

const Main = () => {
  const isCollapse = useSelector(state => state.tab.isCollapse)
 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="main-container">
      
      <CommonAside isCollapse={isCollapse}/>
      <Layout>
        <CommonHeader isCollapse={isCollapse}/>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
