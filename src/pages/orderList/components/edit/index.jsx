import React, { useState, useEffect } from "react";
import { Card, Descriptions, Form, Button, Modal, Table } from "antd";
import moment from "moment";
import CrdInfo from "./crdInfo";
import EditTable from "@/components/EditTable";
import EditTableMeal from "@/components/EditTableMeal";

import request from "@/utils/request";
import _ from "lodash";
import AddPorject from "./addPorject";
import AddMeal from "./addMeal";
import AddItem from "./addItem";
import AddItemMeal from "./addItemMeal";
import DispatchModal from "./dispatchModal";

import "./index.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tableColumns = [
  {
    title: "维修措施",
    dataIndex: "ManhourItemName",
    editable: true,
  },
  {
    title: "技师",
    dataIndex: "person",
  },
  {
    title: "工时费",
    dataIndex: "ManhourExpense",
    editable: true,
  },
  {
    title: "收费区分",
    dataIndex: "DistinguishFlag",
  },
];

const tableColumns_two = [
  {
    title: "序号",
    dataIndex: "provinces",
    render: (text, recod, index) => index + 1,
  },
  {
    title: "零件号",
    dataIndex: "PartCode",
    editable: true,
  },
  {
    title: "需更换零件",
    dataIndex: "PartName",
    editable: true,
  },
  {
    title: "数量",
    dataIndex: "SellQuantity",
    editable: true,
  },
  {
    title: "单价",
    dataIndex: "SellPrice",
    editable: true,
  },
  {
    title: "金额",
    dataIndex: "SellSum",
    editable: true,
  },
  {
    title: "收费区分",
    dataIndex: "DistinguishFlag",
    editable: true,
  },
];

export default function Edit(props) {
  const [form] = Form.useForm();

  const code = props?.match?.params?.id;

  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(null);
  const [title, setTitle] = useState("");

  const [dataSource, setDataSource] = useState([]);
  const [dataSourceMeal, setDataSourceMeal] = useState([]);

  const [record, setRecord] = useState({});

  const [row, setRow] = useState([]);

  const searchDetail = () => {
    const params = {
      code: code,
      is_edit: 1,
      // ...formdata,
    };
    request.get("/v1/order/info", { params }).then((res) => {
      setData(res?.data);

      const {
        TBL_ManHourExpense,
        TBL_RepairOrder,
        TBL_RepairPartItem,
        TBL_VehicleOwner,
        TBL_Vehicleselect,
      } = res?.data;

      setDataSource(TBL_ManHourExpense);
      setDataSourceMeal(TBL_RepairPartItem);

      const initialValues = {
        VehicleTag: TBL_RepairOrder?.VehicleTag,
        CarOwnerName: TBL_VehicleOwner?.CarOwnerName,
        EngineCode: TBL_Vehicleselect?.EngineCode,
        Province: TBL_VehicleOwner?.Province,
        City: TBL_VehicleOwner?.City,
        Area: TBL_VehicleOwner?.Area,
        CarBrandCode: TBL_Vehicleselect?.CarBrandCode,
        Address: TBL_VehicleOwner?.Address,
        CarSeriesCode: TBL_Vehicleselect?.CarSeriesCode,
        Mobile: TBL_VehicleOwner?.Mobile,
        CarTypeCode: TBL_Vehicleselect?.CarTypeCode,
        RepairSender: TBL_RepairOrder?.RepairSender,
        UnderPan: TBL_Vehicleselect?.UnderPan,
        Telephone1: TBL_VehicleOwner?.Telephone1,
        BuyDate: moment(TBL_Vehicleselect?.BuyDate, "YYYY-MM-DD"),
        IntendingHandTime: moment(
          TBL_RepairOrder?.IntendingHandTime,
          "YYYY-MM-DD"
        ),
        RunMileage: TBL_Vehicleselect?.RunMileage,
        NextServiceMileage: TBL_Vehicleselect?.NextServiceMileage,
        RepairTypeName: TBL_RepairOrder?.RepairTypeName,
        NextServiceDate: TBL_Vehicleselect?.NextServiceDate,
        Remark: TBL_RepairOrder?.Remark,
      };

      form.setFieldsValue(initialValues);
    });
  };

  useEffect(() => {
    searchDetail();
  }, []);

  const showModal = (type) => {
    const obj = {
      addProject: "新增项目",
      addMeal: "新增套餐",
      addItem: "新增零件",
      addItemMeal: "新增零件套餐",
      dispatch: "派工",
    };

    setType(type);
    setVisible(true);
    setTitle(obj[type]);
  };

  //添加套餐，添加项目之后的数组
  const handelOK = (record) => {
    if (Array.isArray(record)) {
      const arr = [];

      record.map((item, index) => {
        arr.push({
          ...item,
          key: Math.random().toString(36).substr(3, 10),
          ManhourItemName: item.ManHourItemName,
        });
      });

      setDataSource([...arr, ...dataSource]);
    } else {
      setDataSource([record, ...dataSource]);
    }

    setRecord(record);
    setVisible(false);
  };

  //删除之后的数组
  const getlist = (list) => {
    setDataSource(list);
  };

  //获取选择table的key
  const getRow = (row) => {
    setRow(row);
  };

  //派工后修改数组
  const getPerson = (personRecord) => {
    const newData = _.cloneDeep(dataSource);

    dataSource.map((ele, index) => {
      row.map((item) => {
        if (ele.Id == item) {
          newData.splice(index, 1, { ...ele, person: personRecord.Name });
        }
      });
    });

    setDataSource(newData);

    setVisible(false);
  };

  const componentsObj = {
    addProject: <AddPorject handelOK={handelOK} />,
    addMeal: <AddMeal handelOK={handelOK} />,
    addItem: <AddItem handelOK={handelOK} />,
    addItemMeal: <AddItemMeal handelOK={handelOK} />,
    dispatch: <DispatchModal handelOK={getPerson} />,
  };

  const {
    Corporation,
    TBL_ManHourExpense,
    TBL_RepairOrder,
    TBL_RepairPartItem,
    TBL_VehicleOwner,
    TBL_Vehicleselect,
  } = data;

  return (
    <div className="EditPage">
      <div className="page_title">XXX汽车销售服务有限公司</div>
      <Form form={form} {...layout}>
        <Descriptions>
          <Descriptions.Item label="工单号">
            {TBL_RepairOrder?.TBL_RepairOrder}
          </Descriptions.Item>
          <Descriptions.Item label="开单时间">
            {TBL_RepairOrder?.CreateDate}
          </Descriptions.Item>
          <Descriptions.Item label="服务顾问">
            {TBL_RepairOrder?.EditBy}
          </Descriptions.Item>
        </Descriptions>
        <Card
          title="客户车辆信息"
          style={{ marginBottom: "24px", padding: "0" }}
        >
          <CrdInfo form={form} {...data} />
        </Card>
        <Card title="维修措施" style={{ marginBottom: "24px" }}>
          <Button type="primary" onClick={() => showModal("addProject")}>
            新增项目
          </Button>
          <Button type="primary" onClick={() => showModal("addMeal")}>
            新增套餐
          </Button>
          <Button
            type="primary"
            onClick={() => showModal("dispatch")}
            disabled={row.length > 0 ? false : true}
          >
            派工
          </Button>
          <EditTable
            form={form}
            tableColumns={tableColumns}
            dataSource={dataSource}
            getlist={getlist}
            getRow={getRow}
          />
        </Card>

        <Card title="更换零件" style={{ marginBottom: "24px" }}>
          <Button type="primary" onClick={() => showModal("addItem")}>
            新增零件
          </Button>
          <Button type="primary" onClick={() => showModal("addItemMeal")}>
            新增套餐
          </Button>
          <EditTableMeal
            form={form}
            tableColumns={tableColumns_two}
            dataSource={dataSourceMeal}
          />
        </Card>
        <Card title="温馨提示" style={{ marginBottom: "24px" }}>
          <Form.Item label="">
            <p>
              1.本人同意按贵站工单所列的修理项目修理，愿意支付有关项目需要更关的零件款及维修费。
            </p>
            <p>
              2.随车贵重物品请客户自行保管，如有遗失，本单位不承担任何责任。
            </p>
            <p>3.如有涉及保修事项按《保修及保养手册》执行。</p>
            <p>4.如有涉及保修事项按《保修及保养手册》执行。</p>
          </Form.Item>
          <Form.Item label="" colon={false}>
            4.旧件是否带走
          </Form.Item>
          <Form.Item label="" colon={false}>
            5.是否洗车
          </Form.Item>
        </Card>
        <Card title="客户签署" style={{ marginBottom: "24px" }}>
          客户签署：入站：_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          出站：_________&nbsp;&nbsp;&nbsp; 日期：_____年_____月_____日
          <p style={{ marginTop: "12px" }}>
            投诉:13825251430地址:深圳市宝安区XX路XX号
          </p>
        </Card>
      </Form>

      <Modal
        title={title}
        visible={visible}
        onCancel={() => setVisible(false)}
        // onOk={handelOK}
        footer={false}
      >
        {componentsObj[type]}
      </Modal>
    </div>
  );
}
