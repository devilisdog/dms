import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Button } from "antd";

import request from "@/utils/request";

const colums = [
  { title: "工号", dataIndex: "Gh" },
  { title: "技师", dataIndex: "Name" },
  { title: "班组", dataIndex: "WorkGroup" },
  { title: "工位", dataIndex: "WorkPosition" },
];

export default function DispatchModal(props) {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);

  const search = () => {
    const params = { gh: form.getFieldValue("gh") };
    request.get("/v1/repair/person", { params }).then((res) => {
      setDataSource(res?.data);
    });
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div style={{ height: "400px", overflowY: "scroll" }}>
      <div style={{ display: "flex", lineHeight: "32px" }}>
        <span>计师姓名或代码:</span>
        <Form form={form}>
          <Form.Item name="gh" noStyle>
            <Input style={{ width: "100px" }} />
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
