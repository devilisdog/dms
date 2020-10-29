import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";

import request from "@/utils/request";

const colums = [
  { title: "项目名称", dataIndex: "ManhourItemName" },
  { title: "标准工时", dataIndex: "StandardManHour" },
  { title: "工时费", dataIndex: "ManhourExpense" },
  { title: "适用车型", dataIndex: "VehicleGroupCode" },
];

export default function AddProject(props) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const params_1 = {
      manHourItemCode: "",
    };
    request.get("/v1/repair/item", { params_1 }).then((res) => {
      setDataSource(res?.data);
    });
  }, []);

  return (
    <div style={{ height: "400px", overflowY: "scroll" }}>
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
