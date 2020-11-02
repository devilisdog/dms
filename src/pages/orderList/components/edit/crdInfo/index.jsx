import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Modal,
  Table,
  Tabs,
} from "antd";
import request from "@/utils/request";
import Car_btn from "@/assets/img/car_btn.png";
import more_icon from "@/assets/img/more_icon.png";

import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export default function CrdInfo(props) {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);

  const [brands, setBrands] = useState([]);
  const [series, setSeries] = useState([]);
  const [types, setTypes] = useState([]);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [dataSource_other, setDataSource_other] = useState([]);

  const [repairtypes, setrepairTypes] = useState([]);

  const [carList, setCarList] = useState([]);

  const [modalType, setModalType] = useState("");

  const [ccustomerList, setCcustomerList] = useState([]);

  useEffect(() => {
    request.get("/v1/province/list", {}).then((res) => {
      setProvince(res.data);
    });

    request.get("/v1/car/brands", {}).then((res) => {
      setBrands(res.data);
    });

    //维修类型下拉
    request.get("/v1/repair/types", {}).then((res) => {
      setrepairTypes(res?.data);
    });
  }, []);

  const onChangeProvince = (e) => {
    props.form.setFieldsValue({ City: "" });
    props.form.setFieldsValue({ Area: "" });

    const params = {
      province: e,
    };
    request.get("/v1/city/list", { params }).then((res) => {
      setCity(res?.data);
    });
  };

  const onChangeCity = (e) => {
    props.form.setFieldsValue({ Area: "" });
    const params = {
      city: e,
    };
    request.get("/v1/area/list", { params }).then((res) => {
      setArea(res?.data);
    });
  };

  //品牌
  const onChangeSeries = (e) => {
    props.form.setFieldsValue({ CarSeriesCode: "", CarTypeCode: "" });
    const params = {
      code: e,
    };
    request.get("/v1/car/series", { params }).then((res) => {
      setSeries(res?.data);
    });
  };

  const onChangeType = (e) => {
    props.form.setFieldsValue({ CarTypeCode: "" });
    const params = {
      code: e,
    };
    request.get("/v1/car/types", { params }).then((res) => {
      setTypes(res?.data);
    });
  };

  const showModal = (type) => {
    setModalType(type);

    if (type == "crdInfoTable") {
      const params = {
        vehicleTag: "",
      };
      request.get("/v1/vehicle/list", { params }).then((res) => {
        setCarList(res?.data);
      });

      setTitle("选择车辆信息");
    }

    if (type == "carCard") {
      const params = {
        vehicleTag: props?.TBL_RepairOrder?.VehicleTag,
      };
      request.get("/v1/vehicle/repair-project", { params }).then((res) => {
        setDataSource(res?.data);
      });
      request.get("/v1/vehicle/repair-part", { params }).then((res) => {
        setDataSource_other(res?.data);
      });
      setTitle("维修历史查询");
    }

    if (type == "customer") {
      const params = {
        carOwnerCode: "",
      };
      request.get("/v1/company/customer", { params }).then((res) => {
        setCcustomerList(res?.data);
      });

      setTitle("选择客户");
    }

    setVisible(true);
  };

  const handelOK = (record) => {
    // if (modalType == "crdInfoTable") {
    //   getleftForm(record);
    // }
    // if (modalType == "customer") {
    //   getrightForm(record);
    // }

    setVisible(false);
  };

  const columns = [
    { title: "工单号", dataIndex: "RepairOrderCode" },
    { title: "开单日期", dataIndex: "CeateDate" },
    { title: "进厂里程", dataIndex: "EnterUse" },
    { title: "项目名称", dataIndex: "RepairItem" },
    { title: "应收工时费", dataIndex: "count" },
    { title: "班组", dataIndex: "ManhourExpense" },
  ];

  const columns_other = [
    { title: "工单号", dataIndex: "RepairOrderCode" },
    { title: "开单日期", dataIndex: "CeateDate" },
    { title: "进厂里程", dataIndex: "EnterUse" },
    { title: "配件名称", dataIndex: "PartItem" },
    { title: "数量", dataIndex: "count" },
    { title: "应收金额", dataIndex: "ManhourExpense" },
  ];

  const columns_crdinfo = [
    { title: "车牌号", dataIndex: "VehicleTag" },
    { title: "客户名称", dataIndex: "CarOwnerName" },
    { title: "车架号", dataIndex: "UnderPan" },
    { title: "品牌", dataIndex: "CarBrandCode" },
    { title: "公司网点", dataIndex: "AutoCompany" },
  ];

  const columns_customer = [
    { title: "客户编号", dataIndex: "CarOwnerCode" },
    { title: "客户姓名", dataIndex: "CarOwnerName" },
    { title: "客户手机", dataIndex: "Mobile" },
    { title: "建档人姓名", dataIndex: "ContractDeadline" },
  ];

  const components = {
    crdInfoTable: (
      <Table
        columns={columns_crdinfo}
        dataSource={carList}
        pagination={false}
        scroll={{ x: 400 }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              handelOK(record);

              props.form.resetFields();

              props.form.setFieldsValue({
                ...record,
                CreateDate: record?.CreateDate,
                CarOwnerCode: record?.CarOwnerCode,
                ID: record?.ID,
                BuyDate: record?.BuyDate
                  ? moment(record?.BuyDate, "YYYY-MM-DD")
                  : "",
                IntendingHandTime: record?.IntendingHandTime
                  ? moment(record?.IntendingHandTime, "YYYY-MM-DD")
                  : "",
                NextServiceDate: record?.NextServiceDate
                  ? moment(record?.NextServiceDate, "YYYY-MM-DD")
                  : "",
              });
            }, // 点击行
          };
        }}
      />
    ),
    carCard: (
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="维修项目历史" key="1">
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record.id}
            scroll={{ x: 400 }}
            pagination={false}
          />
        </TabPane>
        <TabPane tab="维修配件历史" key="2">
          <Table
            dataSource={dataSource_other}
            columns={columns_other}
            rowKey={(record) => record.id}
            scroll={{ x: 400 }}
            pagination={false}
          />
        </TabPane>
      </Tabs>
    ),
    customer: (
      <Table
        columns={columns_customer}
        dataSource={ccustomerList}
        pagination={false}
        scroll={{ x: 400 }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              handelOK(record);
              props.form.resetFields();

              props.form.setFieldsValue({
                ...record,
                CarOwnerCode_right: record?.CarOwnerCode,
                CreateDate: record?.CreateDate,
                BuyDate: record?.BuyDate
                  ? moment(record?.BuyDate, "YYYY-MM-DD")
                  : "",
                IntendingHandTime: record?.IntendingHandTime
                  ? moment(record?.IntendingHandTime, "YYYY-MM-DD")
                  : "",
                NextServiceDate: record?.NextServiceDate
                  ? moment(record?.NextServiceDate, "YYYY-MM-DD")
                  : "",
              });
            }, // 点击行
          };
        }}
      />
    ),
  };

  return (
    <div className="CrdInfo">
      <Row>
        <Col span={12}>
          <Form.Item label="车牌号">
            <Form.Item name="VehicleTag" noStyle>
              <Input
                addonAfter={
                  props.newBuild ? (
                    <>
                      <img
                        src={more_icon}
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          showModal("crdInfoTable");
                        }}
                      />
                      <img
                        src={Car_btn}
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          showModal("carCard");
                        }}
                      />
                    </>
                  ) : (
                    <img
                      src={Car_btn}
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        showModal("carCard");
                      }}
                    />
                  )
                }
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="客户名称" name="CarOwnerName">
            <Input
              disabled={props.form.getFieldValue("CarOwnerName") ? true : false}
              addonAfter={
                props.newBuild && !props.form.getFieldValue("CarOwnerName") ? (
                  <img
                    src={Car_btn}
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      showModal("customer");
                    }}
                  />
                ) : null
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="发动机号" name="EngineCode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="区域" className="area">
            <Input.Group compact>
              <Form.Item name="Province" noStyle>
                <Select
                  placeholder="请选择市"
                  onChange={onChangeProvince}
                  style={{ width: "35%" }}
                >
                  {province.map((ele, index) => {
                    return (
                      <Option value={ele.Province} key={ele.ID}>
                        {ele.Province}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item name="City" noStyle>
                <Select
                  placeholder="请选择区"
                  onChange={onChangeCity}
                  style={{ width: "35%" }}
                >
                  {city.map((ele, index) => {
                    return (
                      <Option value={ele.City} key={ele.ID}>
                        {ele.City}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item name="Area" noStyle>
                <Select placeholder="请选择镇" style={{ width: "30%" }}>
                  {area.map((ele, index) => {
                    return (
                      <Option value={ele.AreaName} key={ele.ID}>
                        {ele.AreaName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="品牌" name="CarBrandCode">
            <Select onChange={onChangeSeries}>
              {brands.map((ele, index) => {
                return (
                  <Option value={ele.CarBrandCode} key={ele.Sort}>
                    {ele.CarBrandCode}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="客户地址" name="Address">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="车系" name="CarSeriesCode">
            <Select onChange={onChangeType}>
              {series.map((ele, index) => {
                return (
                  <Option value={ele.CarSeriesCode} key={ele.Sort}>
                    {ele.CarSeriesCode}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="手机号码" name="Mobile">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="车型" name="CarTypeCode">
            <Select>
              {types.map((ele, index) => {
                return (
                  <Option value={ele.CarTypeCode} key={ele.Sort}>
                    {ele.CarTypeCode}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="送修人" name="RepairSender">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label="VIN"
            name="UnderPan"
            rules={[{ required: true, message: "VIN必填" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="联系电话" name="Telephone1">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="购车日期" name="BuyDate">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="预交车时间" name="IntendingHandTime">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="进站里程" name="RunMileage">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="下次保养里程" name="NextServiceMileage">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label="维修类型"
            name="RepairTypeName"
            rules={[{ required: true, message: "请选择维修类型" }]}
          >
            <Select>
              {repairtypes.map((ele, index) => {
                return (
                  <Option value={ele.RepairTypeCode} key={ele.Sort}>
                    {ele.RepairTypeName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="下次保养日" name="NextServiceDate">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="备注" name="Remark">
            <TextArea />
          </Form.Item>
          <Modal
            title={title}
            // onOk={handelOK}
            onCancel={() => setVisible(false)}
            visible={visible}
            footer={false}
          >
            <div style={{ height: "400px", overflowY: "scroll" }}>
              {components[modalType]}
            </div>
          </Modal>
        </Col>
      </Row>
      <Form.Item
        label=""
        name="CarOwnerCode"
        colon={false}
        style={{ display: "none" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label=" "
        name="CarOwnerCode_right"
        style={{ display: "none" }}
      >
        <Input />
      </Form.Item>

      <Form.Item label=" " name="CreateDate" style={{ display: "none" }}>
        <Input />
      </Form.Item>

      <Form.Item label=" " name="ID" style={{ display: "none" }}>
        <Input />
      </Form.Item>
    </div>
  );
}
