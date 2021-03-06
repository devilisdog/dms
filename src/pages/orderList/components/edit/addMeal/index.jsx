import React, { useEffect, useState } from 'react'
import { Table, Modal, Form, Input, Button } from 'antd'
import request from '@/utils/request'

export default function AddMeal(props) {
    const [form] = Form.useForm()
    const [dataSource, setDataSource] = useState([])
    const [record, setRecord] = useState({})
    const [visible, setVisible] = useState(false)

    const colums = [
        { title: '套餐名称', dataIndex: 'RepairMenuName' },
        { title: '套餐类型', dataIndex: 'RepairMenuType' },
        {
            title: '工时费',
            dataIndex: 'RepairMenuExpense',
            render: text => {
                return <div>{Number(text).toFixed(1)}</div>
            },
        },
        { title: '适用车型', dataIndex: 'VehicleGroupCode' },
        {
            title: '查看套餐',
            dataIndex: 'op',
            render: (text, record) => (
                <a
                    onClick={() => {
                        showModal()
                        setRecord(record)
                    }}
                >
                    查看
                </a>
            ),
        },
    ]

    const colum2 = [
        { title: '', dataIndex: 'A' },
        { title: '', dataIndex: 'B' },
        {
            title: '',
            dataIndex: 'C',
            render: text => {
                if (text?.indexOf('00') > 0) {
                    return Number(text).toFixed(1)
                }
                return text
            },
        },
        {
            title: '',
            dataIndex: 'D',
            render: text => {
                if (text?.indexOf('00') > 0) {
                    return Number(text).toFixed(1)
                }
                return text
            },
        },
        {
            title: '',
            dataIndex: 'E',
            render: text => {
                if (text?.indexOf('00') > 0) {
                    return Number(text).toFixed(1)
                }
                return text
            },
        },
        {
            title: '',
            dataIndex: 'F',
            render: text => {
                if (text?.indexOf('00') > 0) {
                    return Number(text).toFixed(1)
                }
                return text
            },
        },
        {
            title: '',
            dataIndex: 'G',
            render: text => {
                if (text?.indexOf('00') > 0) {
                    return Number(text).toFixed(1)
                }
                return text
            },
        },
    ]

    const search = () => {
        const params = {
            carType: form.getFieldValue('carType'),
            type: '1', //维修项目
        }
        request.get('/v1/car/repair-menu', { params }).then(res => {
            setDataSource(res?.data)
        })
    }

    useEffect(() => {
        search()
    }, [])

    const showModal = () => {
        setVisible(true)
    }

    const handelOK = () => {
        setVisible(false)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            props.getmealList(selectedRows)
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    }

    return (
        <div>
            <div style={{ display: 'flex', lineHeight: '32px' }}>
                <span>车牌号/车架号:</span>
                <Form form={form}>
                    <Form.Item name="carType" noStyle>
                        <Input style={{ width: '100px' }} />
                    </Form.Item>
                </Form>

                <Button onClick={search} type={'primary'} style={{ marginLeft: '5px' }}>
                    查询
                </Button>
            </div>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={colums}
                dataSource={dataSource}
                pagination={false}
                rowKey={record => record.RepairMenuCode}
                // onRow={(record) => {
                //   return {
                //     onClick: (event) => {
                //       props.handelOK(record.list);
                //     }, // 点击行
                //   };
                // }}
            />

            <Modal title="套餐内容" visible={visible} onCancel={() => setVisible(false)} onOk={handelOK} footer={false}>
                <Table columns={colum2} dataSource={record?.form_data} pagination={false} showHeader={false} />
            </Modal>
        </div>
    )
}
