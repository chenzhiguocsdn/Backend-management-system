import React from "react";
import { Col, Row, Card } from "antd";
import "./home.css";
function Home() {
  const imgUrl = require("../../assets/images/user.png");
  return (
    <Row>
      <Col span={8}>
        <Card hoverable className="card">
          <div className="amdin-top">
            <img alt="example" src={imgUrl} className="admin-img" />
            <div>
              <p className="admin-info">Admin</p>
              <p className="admin-acesse">超级管理员</p>
            </div>
          </div>
          <div>
            <p><span>上次登录时间：</span> <span>2021-7-19</span> </p>
            <p><span>上次登录地点：</span> <span>武汉</span></p>
          </div>
        </Card>
      </Col>
      <Col span={16}>右边</Col>
    </Row>
  );
}

export default Home;
