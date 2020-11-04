import React, { useState, useEffect } from "react";
import { Button, Table, Form, Select, Input } from "antd";
import request from "@/utils/request";
import { SearchOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
const { Option } = Select;

export default function OrderList(props) {
  const { lookData } = props;
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const search = (page = 1, pageSize = 10, formdata = {}) => {
    const params = {
      page,
      pageSize,
      ...formdata,
    };
    request.get("/v1/order/list", { params }).then((res) => {
      setDataSource(res?.data);
      setTotal(res?.attributes?.count);
    });
  };

  useEffect(() => {
    search(1, 10);
  }, []);

  const onChangePage = (page) => {
    setPage(page, 10);

    form.validateFields().then((values) => {
      search(page, 10, values);
    });
  };

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
          <>
            {lookData ? (
              <Button
                type="primary"
                onClick={() => {
                  props.history.push(
                    `/searchList/lookPage/${record.RepairOrderCode}`
                  );
                }}
              >
                查看
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  props.history.push(
                    `/orderList/edit/${record.RepairOrderCode}`
                  );
                }}
              >
                编辑
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const searchTable = () => {
    setPage(1);
    form.validateFields().then((values) => {
      search(1, 10, values);
    });
  };

  const prefixSelector = (
    <Form.Item name="search_type" noStyle>
      <Select style={{ width: "90px" }}>
        <Option value="">请选择</Option>
        <Option value="VehicleTag">按车牌号</Option>
        <Option value="CarOwnerName">按客户名称</Option>
        <Option value="RepairOrderCode">按工单号</Option>
        <Option value="Name">服务顾问</Option>
        <Option value="UnderpanCode">车架号</Option>
      </Select>
    </Form.Item>
  );

  const initialValues = {
    time: "",
    search_type: "",
  };

  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Helmet>
      {lookData ? (
        <Form form={form} initialValues={initialValues}>
          <Form.Item
            name="time"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            <Select style={{ width: "90px" }}>
              <Option value={""}>请选择</Option>
              <Option value={7}>一周内</Option>
              <Option value={30}>一个月内</Option>
            </Select>
          </Form.Item>

          <Form.Item name="search_word" style={{ display: "inline-block" }}>
            <Input addonBefore={prefixSelector} style={{ width: "200px" }} />
          </Form.Item>
          <SearchOutlined
            twoToneColor="#1890ff"
            style={{
              fontSize: "24px",
              marginLeft: "5px",
              verticalAlign: "baseline-middle",
              verticalAlign: "-webkit-baseline-middle",
              cursor: "pointer",
            }}
            onClick={searchTable}
          />
        </Form>
      ) : null}

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showSizeChanger: false,
          onChange: onChangePage,
          pageSize: 10,
          current: page,
          total: total,
        }}
      />
    </div>
  );
}
