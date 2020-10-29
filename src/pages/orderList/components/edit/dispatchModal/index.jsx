import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";

import request from "@/utils/request";

const colums = [
  { title: "工号", dataIndex: "Gh" },
  { title: "技师", dataIndex: "Name" },
  { title: "班组", dataIndex: "WorkGroup" },
  { title: "工位", dataIndex: "WorkPosition" },
];

export default function DispatchModal(props) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const params = { gh: "" };
    request.get("/v1/repair/person", { params }).then((res) => {
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
