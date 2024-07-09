import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from "antd";
import "./home.css";
import { getData } from "../../api/index.js";
import * as Icon from "@ant-design/icons";
import MyEcharts from "../../components/Echarts";
const columns = [
  {
    title: "课程",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "今日购买",
    dataIndex: "todayBuy",
    key: "todayBuy",
  },
  {
    title: "本月购买",
    dataIndex: "monthBuy",
    key: "monthBuy",
  },
  {
    title: "总购买",
    dataIndex: "totalBuy",
    key: "totalBuy",
  },
];

const countData = [
  {
    id: 1,
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    id: 2,
    name: "今日收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    id: 3,
    name: "今日未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    id: 4,
    name: "本月支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    id: 5,
    name: "本月收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    id: 6,
    name: "本月未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];

// 动态获取icon
const itemToElement = (name) => React.createElement(Icon[name]);

function Home() {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});

  const imgUrl = require("../../assets/images/user.png");
  useEffect(() => {
    getData()
      .then(function (response) {
        // 处理成功情况
        console.log(response.data, "response.data.tableData");
        const { tableData, orderdata, userData, videoData } = response.data;
        setTableData(tableData);
        let order = orderdata;
        let xAxis = order.date;
        let series = [];
        let keyArray = Object.keys(order.data[0]);
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        setChartData({
          order: { xAxis, series },
          user: {
            xAxis: userData.map((item) => item.date),
            series: [
              {
                name: "新增用户",
                data: userData.map((item) => item.new),
                type: "bar",
              },
              {
                name: "活跃用户",
                data: userData.map((item) => item.active),
                type: "bar",
              },
            ],
          },
          video: {
            series: [
              {
                data: videoData.map((item) => {
                  return {
                    value: item.value,
                    name: item.name,
                  };
                }),
                type: "pie",
              },
            ],
          },
        });
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .finally(function () {
        // 总是会执行
      });
  }, []);
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
            <p>
              <span>上次登录时间：</span> <span>2021-7-19</span>{" "}
            </p>
            <p>
              <span>上次登录地点：</span> <span>武汉</span>
            </p>
          </div>
        </Card>
        <Card hoverable>
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey={(record) => record.name}
          />
        </Card>
      </Col>
      <Col span={16}>
        <div className="right-min-box">
          {countData.map((item) => {
            return (
              <Card hoverable className="card" key={item.id}>
                <div className="min-box">
                  <div
                    style={{
                      color: "#fff",
                      backgroundColor: item.color,
                      zIndex: 0,
                    }}
                    className="color-icon"
                  >
                    {itemToElement(item.icon)}
                  </div>
                  <div className="value-name">
                    <p>￥ {item.value}</p>
                    <p>{item.name}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        {/* <div id="main" style={{ width: "600px", height: "400px" }}></div> */}
        <div>
          {chartData.order && (
            <MyEcharts
              style={{ width: " 100%", height: "200px" }}
              chartData={chartData.order}
            />
          )}
        </div>
        <div className="chart-two">
          {chartData.user && (
            <MyEcharts
              style={{ width: " 600px", height: "400px" }}
              chartData={chartData.user}
            />
          )}
          {chartData.video && (
            <MyEcharts
              style={{ width: " 600px", height: "400px" }}
              chartData={chartData.video}
              isPie={true}
            />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default Home;
