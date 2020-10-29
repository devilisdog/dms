import React, { useState, useEffect } from "react";
import request from "@/utils/request";

import { Table } from "antd";

const colums = [
  { title: "项目名称", dataIndex: "" },
  { title: "标准工时", dataIndex: "" },
  { title: "工时费", dataIndex: "" },
  { title: "适用车型", dataIndex: "" },
];
export default function AddItemMeal(props) {
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
