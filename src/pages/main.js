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
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import WithAuth from "../router/withAuth";

const { Header, Sider, Content } = Layout;

const Main = () => {
  const isCollapse = useSelector((state) => state.tab.isCollapse);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <WithAuth>
      <Layout className="main-container">
        <CommonAside isCollapse={isCollapse} />
        <Layout>
          <CommonHeader isCollapse={isCollapse} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </WithAuth>
  );
};

export default Main;
