import React from 'react';
import { Form, Row, Col, Input, Select, DatePicker } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

export default function CrdInfo(props) {
  return (
    <div className="CrdInfo">
      <Form.Item label="车牌号">
        <Input />
      </Form.Item>

      <Form.Item label="客户名称">
        <Input />
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item label="发动机号">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="区域"></Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="品牌">
            <Select />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="客户地址">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="车系">
            <Select />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="手机号码">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="车型">
            <Select />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="送修人">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="VIN">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="联系电话">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="购车日期">
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="预交车时间">
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="进站里程">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="维修类型">
            <Select />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="备注">
            <TextArea />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
