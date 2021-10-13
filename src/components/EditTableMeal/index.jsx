import React, { useContext, useState, useEffect, useRef } from 'react'
import { Table, Input, Button, Popconfirm, Form, InputNumber } from 'antd'

const EditableContext = React.createContext()

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    )
}

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef()
    const form = useContext(EditableContext)
    useEffect(() => {
        if (editing) {
            inputRef.current.focus()
        }
    }, [editing])

    const toggleEdit = () => {
        setEditing(!editing)
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        })
    }

    const save = async (e) => {
        try {
            const values = await form.validateFields()
            toggleEdit()
            handleSave({ ...record, ...values, SellSum: (values.SellQuantity * 1000 * (record.SellPrice * 1000)) / 1000000 })
        } catch (errInfo) {
            console.log('Save failed:', errInfo)
        }
    }

    const moneyRule = (rule, value, callback) => {
        if (value < 0) {
            callback('输入不在允许范围内')
        }
        callback()
    }

    let childNode = children

    if (editable) {
        childNode = editing ? (
            <div>
                <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `请输入${title}` }, { validator: moneyRule }]}>
                    <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} precision={2} />
                </Form.Item>
            </div>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        )
    }

    return <td {...restProps}>{childNode}</td>
}

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            // count: 2,
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    // const { dataSource } = nextProps
    // if (dataSource !== prevState.dataSource) {
    //     return {
    //         dataSource,
    //     }
    // }
    // return null
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { dataSource } = nextProps
        if (this.props.dataSource !== dataSource) {
            this.setState({
                dataSource,
            })
        }
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource]
        this.setState({
            dataSource: dataSource.filter((item) => (item.key || item.ID || item.Id || item.region_no || item[0]) !== key),
        })

        this.props.getlist(dataSource.filter((item) => (item.key || item.ID || item.Id || item.region_no || item[0]) !== key))
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource]
        const index = newData.findIndex((item) => (row.Id || row.region_no || row.key || row.ID || row[0]) === (item.Id || item.region_no || item.key || item.ID || item[0]))
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        this.setState({
            dataSource: newData,
        })

        this.props.getlist(newData)
    }

    columns = [
        ...this.props.tableColumns,
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                const key = record.key || record.ID || record.Id || record.region_no || record[0]
                return record.DistinguishFlag === 'HS' || record.IsAccount == 1 ? null : (
                    <Popconfirm title="确定删除数据?" onConfirm={() => this.handleDelete(key)}>
                        <span style={{ color: 'red' }}>删除</span>
                    </Popconfirm>
                )
            },
        },
    ]

    // onSelectChange = (selectedRowKeys, selectedRow) => {
    //   this.props.getRow(selectedRowKeys);
    //   this.setState({ selectedRowKeys });
    // };

    render() {
        const { dataSource, selectedRowKeys } = this.state
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        }
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: record.DistinguishFlag == 'HS' || record.IsAccount == '1' ? false : col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            }
        })

        // const rowSelection = {
        //   selectedRowKeys,
        //   onChange: this.onSelectChange,
        // };

        return (
            <div>
                <Table
                    // rowSelection={rowSelection}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    rowKey={(record) => record.key || record.Id || record.ID}
                />
            </div>
        )
    }
}
