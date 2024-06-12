import React, { useState } from "react";

import * as Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import MenuConfig from "../../config/index";
const { Sider } = Layout;
// 动态获取icon
const itemToElement = (name) => React.createElement(Icon[name]);

// 处理菜单数据
const items = MenuConfig.map((icon) => {
  const child = {
    key: icon.path,
    icon: itemToElement(icon.icon),
    label: icon.label,
  };
  if (icon.children) {
    child.children = icon.children.map((item) => {
      return { key: item.path,icon:itemToElement(item.icon), label: item.label,  };
    });
  }
  return child
});

function CommonAside({isCollapse}) {
  return (
    <Sider trigger={null} collapsible collapsed={isCollapse}>
      <h3 className="app-name">通用后台管理系统</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items= {items}
      />
    </Sider>
  );
}

export default CommonAside;
