import React from 'react';
import { Card, Descriptions, Form } from 'antd';
import CrdInfo from './crdInfo';
import EditTable from '@/components/EditTable';

import './index.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tableColumns = [
  {
    title: '序号',
    dataIndex: 'provinces',
    render: (text) => index + 1,
  },
  {
    title: '维修措施',
    dataIndex: 'first_count',
    editable: true,
  },
  {
    title: '技师',
    dataIndex: 'first_price',
    editable: true,
  },
  {
    title: '工时费',
    dataIndex: 'more_count',
    editable: true,
  },
  {
    title: '收费区分',
    dataIndex: 'more_price',
    editable: true,
  },
];

const tableColumns_two = [
  {
    title: '序号',
    dataIndex: 'provinces',
    render: (text) => index + 1,
  },
  {
    title: '零件号',
    dataIndex: 'first_count',
    editable: true,
  },
  {
    title: '需更换零件',
    dataIndex: 'first_price',
    editable: true,
  },
  {
    title: '数量',
    dataIndex: 'more_count',
    editable: true,
  },
  {
    title: '单价',
    dataIndex: 'more_price',
    editable: true,
  },
  {
    title: '金额',
    dataIndex: 'more_count',
    editable: true,
  },
  {
    title: '收费区分',
    dataIndex: 'more_price',
    editable: true,
  },
];

export default function Edit(props) {
  const [form] = Form.useForm();
  return (
    <div className="EditPage">
      <div className="page_title">XXX汽车销售服务有限公司</div>
      <Form form={form} {...layout}>
        <Card title="工单号" style={{ marginBottom: '24px' }}>
          <Descriptions>
            <Descriptions.Item label="工单号">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="开单时间">1810000000</Descriptions.Item>
            <Descriptions.Item label="服务顾问">Hangzhou, Zhejiang</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="客户车辆信息" style={{ marginBottom: '24px', padding: '0' }}>
          <CrdInfo form={form} />
        </Card>
        <Card title="维修措施" style={{ marginBottom: '24px' }}>
          <EditTable form={form} tableColumns={tableColumns} />
        </Card>
        <Card title="更换零件" style={{ marginBottom: '24px' }}>
          <EditTable form={form} tableColumns={tableColumns_two} />
        </Card>
        <Card title="温馨提示" style={{ marginBottom: '24px' }}>
          <Form.Item label="">
            <p>
              1.本人同意按贵站工单所列的修理项目修理，愿意支付有关项目需要更关的零件款及维修费。
            </p>
            <p>2.随车贵重物品请客户自行保管，如有遗失，本单位不承担任何责任。</p>
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
        <Card title="客户签署" style={{ marginBottom: '24px' }}>
          客户签署：入站：_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 出站：_________&nbsp;&nbsp;&nbsp;
          日期：_____年_____月_____日
          <p style={{ marginTop: '12px' }}>投诉:13825251430地址:深圳市宝安区XX路XX号</p>
        </Card>
      </Form>
    </div>
  );
}
