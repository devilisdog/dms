import React, { useState, useEffect } from 'react'
import { Card, Divider, Form, Button, Modal, Radio, message } from 'antd'
import { Helmet } from 'react-helmet'

import moment from 'moment'
import CrdInfo from './crdInfo'
import EditTable from '@/components/EditTable'
import EditTableMeal from '@/components/EditTableMeal'

import request from '@/utils/request'
import _ from 'lodash'
import AddPorject from './addPorject'
import AddMeal from './addMeal'
import AddItem from './addItem'
import AddItemMeal from './addItemMeal'
import DispatchModal from './dispatchModal'
import { history } from 'umi'

import './index.less'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tableColumns = [
    { title: '维修措施', dataIndex: 'ManhourItemName', editable: true },
    { title: '技师', dataIndex: 'person' },
    {
        title: '工时费',
        dataIndex: 'ManhourExpense',
        editable: true,
        render: (text) => {
            return <div>{Number(text).toFixed(1)}</div>
        },
    },
    { title: '收费区分', dataIndex: 'DistinguishFlag' },
]

const tableColumns_two = [
    {
        title: '序号',
        dataIndex: 'provinces',
        render: (text, recod, index) => index + 1,
    },
    { title: '零件号', dataIndex: 'PartCode' },
    { title: '需更换零件', dataIndex: 'PartName' },
    { title: '数量', dataIndex: 'SellQuantity', editable: true },
    {
        title: '单价',
        dataIndex: 'SellPrice',
        render: (text) => {
            return <div>{Number(text).toFixed(1)}</div>
        },
    },
    {
        title: '金额',
        dataIndex: 'SellSum',
        render: (text) => {
            return <div>{Number(text).toFixed(1)}</div>
        },
    },
    { title: '收费区分', dataIndex: 'DistinguishFlag' },
]

export default function Edit(props) {
    const [form] = Form.useForm()

    const code = props?.match?.params?.id
    const { newBuild } = props

    const [data, setData] = useState({})
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState(null)
    const [title, setTitle] = useState('')

    const [dataSource, setDataSource] = useState([])
    const [dataSourceMeal, setDataSourceMeal] = useState([])

    const [row, setRow] = useState([])

    //新增套餐选中
    const [addMealList, setaddMealList] = useState([])

    //新增项目选中
    const [selectRow_Project, setSelectRow_Project] = useState([])

    //新增零件选中
    const [selectRow_Item, setSelectRow_Item] = useState([])

    //剩余项目选中
    const [itmeMealInfoData, setItmeMealInfoData] = useState([])

    //剩余套餐的id
    const [mealID, setmealID] = useState([])

    //剩余套餐弹窗选中项目
    const [mealItemRow, setMealItemRow] = useState([])

    const searchDetail = () => {
        const params = {
            code: code,
            is_edit: 1,
            // ...formdata,
        }
        request.get('/v1/order/info', { params }).then((res) => {
            setData(res?.data)

            const { TBL_ManHourExpense, TBL_RepairOrder, TBL_RepairPartItem, TBL_VehicleOwner, TBL_Vehicleselect } = res?.data

            setDataSource(TBL_ManHourExpense)
            setDataSourceMeal(TBL_RepairPartItem)

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
                BuyDate: TBL_Vehicleselect?.BuyDate ? moment(TBL_Vehicleselect?.BuyDate, 'YYYY-MM-DD') : '',
                IntendingHandTime: TBL_RepairOrder?.IntendingHandTime ? moment(TBL_RepairOrder?.IntendingHandTime, 'YYYY-MM-DD HH:mm') : '',
                RunMileage: TBL_Vehicleselect?.RunMileage,
                RunMileage_sub: TBL_Vehicleselect?.RunMileage,
                NextServiceMileage: TBL_Vehicleselect?.NextServiceMileage,
                RepairTypeCode: TBL_RepairOrder?.RepairTypeCode,
                NextServiceDate: TBL_Vehicleselect?.NextServiceDate ? moment(TBL_Vehicleselect?.NextServiceDate, 'YYYY-MM-DD') : '',
                Remark: TBL_RepairOrder?.Remark,

                IsReserveOldPart: TBL_RepairOrder?.IsReserveOldPart,
                IsWash: TBL_RepairOrder?.IsWash,

                CarOwnerCode: TBL_Vehicleselect?.CarOwnerCode,
                CreateDate: TBL_RepairOrder?.CreateDate,
                ID: TBL_Vehicleselect?.ID,
            }

            form.setFieldsValue(initialValues)
        })
    }

    useEffect(() => {
        if (!newBuild) {
            searchDetail()
        }
    }, [])

    const showModal = (type) => {
        const obj = {
            addProject: '新增项目',
            addMeal: '新增套餐',
            addItem: '新增零件',
            addItemMeal: '剩余套餐',
            dispatch: '派工',
        }

        setType(type)
        setVisible(true)
        setTitle(obj[type])
    }

    //*
    //*
    //维修措施部分操作
    //*
    //*

    //得到添加项目选择之后的数组
    const getSelectedRow_project = (selectedRow) => {
        const arr = []
        selectedRow.map((ele, index) => {
            arr.push({
                ...ele,
                key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
            })
        })
        setSelectRow_Project(arr)
    }

    //新增项目弹窗确认
    const project_confirm = () => {
        setDataSource([...selectRow_Project, ...dataSource])

        setVisible(false)
    }

    //得到添加零件选择之后的数组
    const getSelectedRow_Item = (selectedRow) => {
        const arr = []
        selectedRow.map((ele, index) => {
            arr.push({
                ...ele,
                key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                ID: ele.PartStorageID,
                SellQuantity: getNumValue(ele?.Quantity),
                SellPrice: getNumValue(ele?.SellPrice1),
                SellSum: getNumValue(parseFloat(ele?.SellPrice1) * parseFloat(ele?.Quantity)),
            })
        })
        setSelectRow_Item(arr)
    }

    //新增零件弹窗确认
    const item_confirm = () => {
        setDataSourceMeal([...selectRow_Item, ...dataSourceMeal])

        setVisible(false)
    }

    //添加套餐
    const handelOK_addMeal = (addMealRow) => {
        const { list_repair, list_item } = addMealRow[0]
        //更新项目数组
        const arr = []
        list_repair.length > 0 &&
            list_repair.map((item, index) => {
                arr.push({
                    ...item,
                    key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                    ManhourItemName: item.ManHourItemName,
                })
            })
        setDataSource([...arr, ...dataSource])

        //更新零件数组
        const arr_list_item = []
        list_item.length > 0 &&
            list_item.map((item, index) => {
                arr_list_item.push({
                    ...item,
                    key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                    ManhourItemName: item.ManHourItemName,
                })
            })

        setDataSourceMeal([...arr_list_item, ...dataSourceMeal])

        setVisible(false)
    }

    //得到维修措施套餐中的list
    const getmealList = (selectedRows) => {
        setaddMealList(selectedRows)
    }

    //删除之后的数组
    const getlist = (list) => {
        setDataSource(list)
    }

    //获取选择table的key
    const getRow = (row) => {
        setRow(row)
    }

    //派工后修改数组
    const getPerson = (personRecord) => {
        const newData = _.cloneDeep(dataSource)

        dataSource.map((ele, index) => {
            row.map((item) => {
                if (ele.Id == item || ele.ID == item || ele.key == item) {
                    newData.splice(index, 1, {
                        ...ele,
                        person: personRecord.Name,
                        p_WorkTypeCode: personRecord.WorkTypeCode,
                        p_GH: personRecord.Gh,
                        p_WorkPosition: personRecord.WorkPosition,
                        p_WorkGroup: personRecord.WorkGroup,
                    })
                }
            })
        })

        setDataSource(newData)

        setVisible(false)
    }

    //*
    //*
    //更换零件部分
    //*
    //*

    function getNumValue(value) {
        if (value == '' || value == undefined || value == null || isNaN(value) || value == 'null' || parseFloat(value) == 0) {
            value = 0
        }
        return Math.round(value)
    }

    //删除之后的数组
    const get_Op_list = (list) => {
        setDataSourceMeal(list)
    }

    const getKeyArr = (data) => {
        setKeyArr(list)
    }

    //新建表单
    const submit = () => {
        form.validateFields().then((values) => {
            const obj = {
                ...values,
                BuyDate: values.BuyDate && moment(values.BuyDate).format('YYYY-MM-DD'),
                IntendingHandTime: values.IntendingHandTime && moment(values.IntendingHandTime).format('YYYY-MM-DD HH:mm'),
                NextServiceDate: values.NextServiceDate && moment(values.NextServiceDate).format('YYYY-MM-DD'),
            }

            const formData = {
                carOwnerInfo: obj,
                postRepairItem: dataSource,
                postPartItem: dataSourceMeal,
                id: mealID,
            }

            request('/v1/order/create', {
                method: 'POST',
                data: formData,
            }).then((res) => {
                if (res?.data?.RepairOrderCode) {
                    message.success('新建成功！')
                    history.push(`/searchList/lookPage/${res?.data?.RepairOrderCode}`)
                }
            })
        })
    }

    //编辑表单
    const editSumit = () => {
        form.validateFields().then((values) => {
            const obj = {
                ...values,
                BuyDate: values.BuyDate && moment(values.BuyDate).format('YYYY-MM-DD'),
                IntendingHandTime: values.IntendingHandTime && moment(values.IntendingHandTime).format('YYYY-MM-DD HH:mm'),
                NextServiceDate: values.NextServiceDate && moment(values.NextServiceDate).format('YYYY-MM-DD'),
            }

            const formData = {
                id: mealID,
                carOwnerInfo: obj,
                postRepairItem: dataSource,
                postPartItem: dataSourceMeal,
                RepairOrderCode: TBL_RepairOrder?.RepairOrderCode,
            }

            request('/v1/order/update', {
                method: 'POST',
                data: formData,
            })
                .then((res) => {
                    message.success('编辑成功！')
                    history.push(`/searchList/lookPage/${TBL_RepairOrder?.RepairOrderCode}`)
                })
                .catch((err) => {
                    console.log(err, 'err')
                })
        })
    }

    const getItemMealKeys = (selectedRows) => {
        const mealID = []
        const ItemCodeArr = []
        const arr = []
        selectedRows.map((item) => {
            mealID.push(item[0])
            ItemCodeArr.push(item.ItemCode)
            arr.push({
                ...item,
                key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                ManhourItemName: item.ServiceItem,
                person: item.person,
                ManhourExpense: item.CostPrice,
                DistinguishFlag: item.DistinguishFlag,
            })
        })

        setMealItemRow(arr)

        setmealID(mealID)
        const params = {
            itemCode: `${ItemCodeArr.join(',')}`,
        }
        request
            .get('/v1/info/remaining-items', { params })
            .then((res) => {
                if (Array.isArray(res.data)) {
                    const arr = []
                    res.data.map((ele, index) => {
                        arr.push({
                            ...ele,
                            key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                            ID: ele.RepairMenuPartID,
                            SellQuantity: getNumValue(ele?.Quantity),
                            SellPrice: getNumValue(ele?.SellPrice1),
                            SellSum: getNumValue(parseFloat(ele?.SellPrice1) * parseFloat(ele?.Quantity)),
                        })
                    })
                    setItmeMealInfoData(arr)
                }
            })
            .catch((err) => {
                console.log(err, 'err')
            })
    }

    const handelOK_addItemMeal = () => {
        setDataSourceMeal([...itmeMealInfoData, ...dataSourceMeal])

        setDataSource([...mealItemRow, ...dataSource])

        setVisible(false)
    }

    const componentsObj = {
        addProject: <AddPorject getSelectedRow_project={getSelectedRow_project} />, //新增项目
        addMeal: <AddMeal getmealList={getmealList} VehicleTag={data?.TBL_RepairOrder?.VehicleTag || form.getFieldValue('VehicleTag')} />, //新增套餐
        dispatch: <DispatchModal handelOK={getPerson} />, //派工
        addItem: <AddItem getSelectedRow_Item={getSelectedRow_Item} />, //新增零件
        addItemMeal: <AddItemMeal VehicleTag={data?.TBL_RepairOrder?.VehicleTag || form.getFieldValue('VehicleTag')} getItemMealKeys={getItemMealKeys} />, //选择剩余项目
    }

    const { TBL_RepairOrder } = data

    const titleDom = (name) => {
        return (
            <div>
                <div style={{ fontSize: '16px' }}>{name}</div>
                <Divider className="divider" />
            </div>
        )
    }

    const modalFooterButObj = {
        addMeal: (
            <Button
                type="primary"
                onClick={() => {
                    handelOK_addMeal(addMealList)
                }}
                disabled={addMealList.length > 0 ? false : true}
            >
                确定
            </Button>
        ),
        addProject: (
            <Button type="primary" onClick={project_confirm}>
                确定
            </Button>
        ),
        addItem: (
            <Button type="primary" onClick={item_confirm}>
                确定
            </Button>
        ),
        addItemMeal: (
            <Button type="primary" onClick={handelOK_addItemMeal} disabled={mealItemRow.length > 0 ? false : true}>
                确定
            </Button>
        ),
    }
    const userInfo = JSON.parse(localStorage.getItem('user'))

    console.log(dataSource, '...')

    return (
        <div className="EditPage">
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
            </Helmet>
            <div className="page_title">{userInfo?.company}</div>
            <div style={{ width: '45%', display: 'inline-block', marginLeft: '10px' }}>工单号： {TBL_RepairOrder?.RepairOrderCode}</div>
            <div style={{ display: 'inline-block' }}>服务顾问：{newBuild ? userInfo?.username : TBL_RepairOrder?.EditBy}</div>
            <div style={{ marginLeft: '10px' }}>开单时间： {TBL_RepairOrder?.CreateDate}</div>

            <Form form={form} {...layout}>
                <div className="title_box">
                    {titleDom('一.客户车辆信息')}
                    <CrdInfo form={form} {...data} {...props} />
                </div>

                <div className="title_box">
                    {titleDom('二.维修措施')}
                    <Button type="primary" onClick={() => showModal('addProject')}>
                        新增项目
                    </Button>
                    <Button type="primary" onClick={() => showModal('addMeal')} style={{ margin: '0 5px' }}>
                        新增套餐
                    </Button>
                    <Button type="primary" onClick={() => showModal('addItemMeal')} style={{ marginRight: '5px' }}>
                        剩余项目
                    </Button>
                    <Button type="primary" onClick={() => showModal('dispatch')} disabled={row.length > 0 ? false : true}>
                        派工
                    </Button>
                    <EditTable form={form} tableColumns={tableColumns} dataSource={dataSource} getlist={getlist} getRow={getRow} />
                </div>

                <div className="title_box">
                    {titleDom('三.更换零件')}
                    <Button type="primary" onClick={() => showModal('addItem')} style={{ marginRight: '5px' }}>
                        新增零件
                    </Button>

                    <EditTableMeal form={form} tableColumns={tableColumns_two} dataSource={dataSourceMeal} getlist={get_Op_list} getRow={getKeyArr} />
                </div>

                <div className="title_box">
                    {titleDom('四.温馨提示')}
                    <Form.Item label="" style={{ margin: '0' }} className="tooptipFormItem">
                        <p>1.本人同意按贵站工单所列的修理项目修理，愿意支付有关项目需要更关的零件款及维修费。</p>
                        <p>2.随车贵重物品请客户自行保管，如有遗失，本单位不承担任何责任。</p>
                        <p>3.如有涉及保修事项按《保修及保养手册》执行。</p>
                        <p>4.如有涉及保修事项按《保修及保养手册》执行。</p>
                    </Form.Item>

                    <div>
                        <span style={{ verticalAlign: '-webkit-baseline-middle' }}>5.旧件是否带走：</span>
                        <Form.Item
                            label=""
                            colon={false}
                            name="IsReserveOldPart"
                            style={{ display: 'inline-block', margin: '0' }}
                            rules={[{ required: true, message: '此项必填' }]}
                        >
                            <Radio.Group style={{ width: '150px' }}>
                                <Radio value={'是'}>是</Radio>
                                <Radio value={'否'}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    <div>
                        <span style={{ verticalAlign: '-webkit-baseline-middle' }}>6.是否洗车：</span>

                        <Form.Item label="" colon={false} name="IsWash" style={{ display: 'inline-block', margin: '0' }} rules={[{ required: true, message: '此项必填' }]}>
                            <Radio.Group style={{ width: '150px' }}>
                                <Radio value={'是'}>是</Radio>
                                <Radio value={'否'}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                </div>

                <div className="title_box">
                    {titleDom('五.客户签署')}
                    客户签署：入站：_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 出站：_________&nbsp;&nbsp;&nbsp; 日期：_____年_____月_____日
                    <p style={{ marginTop: '12px' }}>投诉:13825251430地址:深圳市宝安区XX路XX号</p>
                </div>
            </Form>

            {newBuild ? (
                <div
                    style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button type="primary" onClick={submit}>
                        保存工单
                    </Button>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ width: '200px' }}>
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={editSumit}>
                            保存工单
                        </Button>
                        <Button
                            onClick={() => {
                                history.push(`/searchList/lookPage/${code}`)
                            }}
                        >
                            预览工单
                        </Button>
                    </div>
                </div>
            )}

            {visible && (
                <Modal forceRender title={title} visible={visible} onCancel={() => setVisible(false)} footer={modalFooterButObj[type]}>
                    {componentsObj[type]}
                </Modal>
            )}
        </div>
    )
}
