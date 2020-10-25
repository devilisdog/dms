import React from 'react';
import { Button, Table } from 'antd';

const dataSource = [
  { a: 1, b: '1', c: '3', d: '2' },
  { a: 1, b: '1', c: '3', d: '2' },
  { a: 1, b: '1', c: '3', d: '2' },
  { a: 1, b: '1', c: '3', d: '2' },
  { a: 1, b: '1', c: '3', d: '2' },
];

export default function OrderList(props) {
  const columns = [
    { title: '工单号', dataIndex: 'a', key: '1', align: 'center' },
    { title: '车牌号', dataIndex: 'b', key: '2', align: 'center' },
    { title: '日期', dataIndex: 'c', key: '3', align: 'center' },
    { title: '顾问', dataIndex: 'd', key: '4', align: 'center' },
    {
      title: '操作',
      dataIndex: 'op',
      key: '5',
      width: 100,
      align: 'center',
      render: () => {
        return (
          <Button
            type="primary"
            onClick={() => {
              props.history.push('/orderList/edit');
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
