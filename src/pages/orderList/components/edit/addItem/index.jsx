import React, { useState, useEffect } from "react";
import { Table } from "antd";
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
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const params = {
      manHourItemCode: "",
    };
    request.get("/v1/car/parts", params).then((res) => {
      setDataSource(res?.data);
    });
  }, []);

  return (
    <div>
      <Table columns={colums} dataSource={dataSource} />
    </div>
  );
}
