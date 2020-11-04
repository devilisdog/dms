import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button } from "antd";

import request from "@/utils/request";

const colums = [
  { title: "零件号", dataIndex: "PartCode" },
  { title: "零件名称", dataIndex: "PartName" },
  {
    title: "销售价",
    dataIndex: "SellPrice1",
    render: (text) => {
      return Math.round(text);
    },
  },
  { title: "适用车型", dataIndex: "VehicleType" },
  { title: "库存", dataIndex: "StorageAmount" },
  { title: "品牌", dataIndex: "PartBrand" },
];

export default function AddItem(props) {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);

  const search = () => {
    const params = {
      carType: form.getFieldValue("carType"),
      partCode: form.getFieldValue("partCode"),
    };
    request.get("/v1/car/parts", { params }).then((res) => {
      setDataSource(res?.data);
    });
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div style={{ height: "400px", overflow: "scroll" }}>
      <div style={{ display: "flex", lineHeight: "32px" }}>
        <Form form={form}>
          <Form.Item name="carType" noStyle>
            <Input style={{ width: "100px" }} placeholder="适配车型" />
          </Form.Item>
          <Form.Item name="partCode" noStyle>
            <Input style={{ width: "100px" }} placeholder="配件名称或代码" />
          </Form.Item>
        </Form>

        <Button onClick={search} type={"primary"} style={{ marginLeft: "5px" }}>
          查询
        </Button>
      </div>
      <Table
        columns={colums}
        dataSource={dataSource}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: (event) => {
              props.handelOK(record);
            }, // 点击行
          };
        }}
      />
    </div>
  );
}
