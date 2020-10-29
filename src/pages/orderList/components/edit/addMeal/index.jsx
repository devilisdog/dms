import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import request from "@/utils/request";

export default function AddMeal(props) {
  const [dataSource, setDataSource] = useState([]);
  const [record, setRecord] = useState({});
  const [visible, setVisible] = useState(false);

  const colums = [
    { title: "套餐名称", dataIndex: "RepairMenuName" },
    { title: "套餐类型", dataIndex: "RepairMenuType" },
    { title: "工时费", dataIndex: "RepairMenuExpense" },
    { title: "适用车型", dataIndex: "VehicleGroupCode" },
    {
      title: "查看套餐",
      dataIndex: "op",
      render: (text, record) => (
        <a
          onClick={() => {
            showModal();
            setRecord(record);
          }}
        >
          查看
        </a>
      ),
    },
  ];

  const colum2 = [
    { title: "编码", dataIndex: "ManHourItemCode" },
    { title: "配件名称", dataIndex: "ManHourItemName" },
    { title: "数量", dataIndex: "StandardManHour" },
    { title: "配件号", dataIndex: "ManhourExpense" },
  ];

  useEffect(() => {
    const params = {
      type: "1",
    };
    request.get("/v1/car/repair-menu", { params }).then((res) => {
      setDataSource(res?.data);
    });
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handelOK = () => {
    setVisible(false);
  };

  return (
    <div>
      <Table
        columns={colums}
        dataSource={dataSource}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: (event) => {
              props.handelOK(record.list);
            }, // 点击行
          };
        }}
      />

      <Modal
        title="套餐内容"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handelOK}
        footer={false}
      >
        <Table columns={colum2} dataSource={record?.list} pagination={false} />
      </Modal>
    </div>
  );
}
