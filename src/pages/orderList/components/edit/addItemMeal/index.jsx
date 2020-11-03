import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import request from "@/utils/request";

export default function AddItemMeal(props) {
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
      type: "2",
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      props.getItemMealList(selectedRows[0]?.list);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={colums}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record.RepairMenuCode}
        // onRow={(record) => {
        //   return {
        //     onClick: (event) => {
        //       props.handelOK(record.list);
        //     }, // 点击行
        //   };
        // }}
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
