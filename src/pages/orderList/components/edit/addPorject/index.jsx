import React, { useEffect, useState } from 'react'
import { Table, Form, Input, Button } from 'antd'

import request from '@/utils/request'

const colums = [
    { title: '项目名称', dataIndex: 'ManhourItemName' },
    {
        title: '标准工时',
        dataIndex: 'StandardManHour',
        render: text => {
            return Number(text).toFixed(1)
        },
    },
    {
        title: '工时费',
        dataIndex: 'ManhourExpense',
        render: text => {
            return Number(text).toFixed(1)
        },
    },
    { title: '适用车型', dataIndex: 'VehicleGroupCode' },
]

export default function AddProject(props) {
    const [form] = Form.useForm()

    const [dataSource, setDataSource] = useState([])

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    // const [selectedRow, setSelectedRow] = useState([])

    const search = () => {
        const params = {
            manHourItemCode: form.getFieldValue('project'),
        }
        request.get('/v1/repair/item', { params }).then(res => {
            setDataSource(res?.data)
        })
    }

    //   useEffect(() => {
    //     search();
    //   }, []);

    const onSelectChange = (selectedRowKeys, selectedRow) => {
        props.getSelectedRow_project(selectedRow)
        setSelectedRowKeys(selectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <div style={{ height: '400px', overflowY: 'scroll' }}>
            <div style={{ display: 'flex', lineHeight: '32px' }}>
                <span>项目名称/代码:</span>
                <Form form={form}>
                    <Form.Item name="project" noStyle>
                        <Input style={{ width: '100px' }} />
                    </Form.Item>
                </Form>

                <Button onClick={search} type={'primary'} style={{ marginLeft: '5px' }}>
                    查询
                </Button>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={colums}
                dataSource={dataSource}
                rowKey={record => record.ID}
                pagination={false}

                // onRow={record => {
                //     return {
                //         onClick: event => {
                //             props.handelOK(record)
                //         }, // 点击行
                //     }
                // }}
            />
        </div>
    )
}
