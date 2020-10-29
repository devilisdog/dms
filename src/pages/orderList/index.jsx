import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import request from "@/utils/request";

export default function OrderList(props) {
  const [dataSource, setDataSource] = useState([]);

  const search = (page = 1, pageSize = 10) => {
    const params = {
      page,
      pageSize,
      // ...formdata,
    };
    request.get("/v1/order/list", { params }).then((res) => {
      setDataSource(res?.data);
    });
  };

  useEffect(() => {
    search(1, 10);
  }, []);

  const columns = [
    {
      title: "工单号",
      dataIndex: "RepairOrderCode",
      key: "1",
      align: "center",
    },
    { title: "车牌号", dataIndex: "VehicleTag", key: "2", align: "center" },
    { title: "日期", dataIndex: "CreateDate", key: "3", align: "center" },
    { title: "顾问", dataIndex: "Name", key: "4", align: "center" },
    {
      title: "操作",
      dataIndex: "op",
      key: "5",
      width: 100,
      align: "center",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              props.history.push(`/orderList/edit/${record.RepairOrderCode}`);
            }}
          >
            编辑
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
