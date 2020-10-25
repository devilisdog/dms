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
} from "antd";
import request from "@/utils/request";
import Car_btn from "@/assets/img/car_btn.png";
import { visible } from "chalk";
// import Car_btn from "../../../../../assets/img/car_btn.png";

const { TextArea } = Input;
const { Option } = Select;

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

  useEffect(() => {
    request.get("/v1/province/list", {}).then((res) => {
      setProvince(res.data);
    });

    request.get("/v1/car/brands", {}).then((res) => {
      setBrands(res.data);
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

  const onChangeSeries = (e) => {
    // props.form.setFieldsValue({  });
    const params = {
      code: e,
    };
    request.get("/v1/car/series", { params }).then((res) => {
      setSeries(res?.data);
    });
  };

  const onChangeType = (e) => {
    // props.form.setFieldsValue({  });
    const params = {
      code: e,
    };
    request.get("/v1/car/types", { params }).then((res) => {
      setTypes(res?.data);
    });
  };

  const showModal = (type) => {
    const params = {
      vehicleTag: props?.TBL_RepairOrder?.VehicleTag,
    };
    request.get("/v1/vehicle/repair-project", { params }).then((res) => {
      setDataSource(res?.data);
    });

    setTitle("维修历史查询");
    setVisible(true);
  };

  const handok = () => {
    setVisible(false);
  };

  const columns = [
    { title: "工单号", dataIndex: "工单号" },
    { title: "开单日期", dataIndex: "开单日期" },
    { title: "进场里程", dataIndex: "进厂里程" },
    { title: "配件名称", dataIndex: "项目名称" },
    { title: "数量", dataIndex: "" },
    { title: "应收金额", dataIndex: "应收工时费" },
  ];

  return (
    <div className="CrdInfo">
      <Form.Item label="车牌号">
        <Form.Item name="VehicleTag" noStyle>
          <Input style={{ width: "100px" }} />
        </Form.Item>
        <Tooltip>
          <img
            src={Car_btn}
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={() => {
              showModal("carCard");
            }}
          />
        </Tooltip>
      </Form.Item>

      <Form.Item label="客户名称" name="CarOwnerName">
        <Input />
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item label="发动机号" name="EngineCode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="区域">
            <Input.Group compact>
              <Form.Item name="Province" noStyle>
                <Select
                  placeholder="请选择市"
                  onChange={onChangeProvince}
                  style={{ width: "90px" }}
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
                  style={{ width: "90px" }}
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
                <Select placeholder="请选择镇" style={{ width: "90px" }}>
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
          <Form.Item label="车型" name=" CarTypeCode">
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
          <Form.Item label="VIN" name="UnderPan">
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
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="预交车时间" name="IntendingHandTime">
            <DatePicker />
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
          <Form.Item label="维修类型" name="RepairTypeName">
            <Select />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="下次保养日" name="NextServiceDate">
            <Select />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="备注" name="Remark">
            <TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Modal
        title={title}
        onOk={handok}
        onCancel={() => setVisible(false)}
        visible={visible}
      >
        <Table
          dataSource={[]}
          columns={columns}
          rowKey={(record) => record.id}
        />
      </Modal>
    </div>
  );
}
