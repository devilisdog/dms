import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import request from '@/utils/request'

export default function AddMeal(props) {
    const [dataSource, setDataSource] = useState([])

    const colums = [
        { title: '套餐名称', dataIndex: 'ServiceItem' },
        { title: '剩余数量', dataIndex: 'SurplusAmount' },
        {
            title: '单价',
            dataIndex: 'CostPrice',
            render: (text) => {
                return <div>{Number(text).toFixed(1)}</div>
            },
        },
        { title: '有效期', dataIndex: 'UsefulLife' },
    ]

    const search = () => {
        const params = {
            vehicleTag: props.VehicleTag,
        }
        request.get('/v1/user/vip-items', { params }).then((res) => {
            setDataSource(res?.data)
        })
    }

    useEffect(() => {
        search()
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            props.getItemMealKeys(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    }

    return (
        <div>
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={colums}
                dataSource={dataSource}
                pagination={false}
                scroll={{ y: 600 }}
                rowKey={(record) => record[0]}
                scroll={{ x: 'max-content' }}

                // onRow={(record) => {
                //   return {
                //     onClick: (event) => {
                //       props.handelOK(record.list);
                //     }, // 点击行
                //   };
                // }}
            />
        </div>
    )
}
