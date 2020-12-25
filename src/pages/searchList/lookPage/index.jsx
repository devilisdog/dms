import React, { useState, useEffect, useCallback } from "react";
import { Button, Divider, message, Table } from "antd";
import request from "@/utils/request";

import { Helmet } from "react-helmet";

import "./index.less";

export default function LookPage(props) {
  const code = props?.match?.params?.id;

  const [data, setData] = useState({});

  useEffect(() => {
    searchDetail();
  }, []);

  const searchDetail = () => {
    const params = {
      code: code,
      is_edit: 0,
      // ...formdata,
    };
    request.get("/v1/order/info", { params }).then((res) => {
      if (res == undefined || res == null) {
        props.history.push("/searchList");
        return;
      }
      setData(res?.data);
    });
  };

  const print = () => {
    window.document.body.innerHTML = window.document.getElementById(
      "print_area"
    ).innerHTML;
    window.print();
    window.location.reload();
  };

  //监控屏幕尺寸
  //   const useWinSize = () => {
  //     const [size, setSize] = useState({
  //       width: document.documentElement.clientWidth,
  //       height: document.documentElement.clientHeight,
  //     });

  //     const onResize = useCallback(() => {
  //       setSize({
  //         width: document.documentElement.clientWidth,
  //         height: document.documentElement.clientHeight,
  //       });
  //     }, []);
  //     useEffect(() => {
  //       window.addEventListener("resize", onResize);
  //       return () => {
  //         window.removeEventListener("resize", onResize);
  //       };
  //     }, [onResize]);

  //     return size;
  //   };

  const {
    total,
    TBL_RepairOrder = {},
    TBL_Vehicleselect = {},
    TBL_VehicleOwner = {},
    TBL_ManHourExpense = [],
    TBL_RepairPartItem = [],
    Corporation = {},
  } = data;

  const card_info = [
    { label: "车牌号", value: TBL_RepairOrder?.VehicleTag },
    { label: "发动机号", value: TBL_Vehicleselect?.EngineCode },
    { label: "开单时间", value: TBL_RepairOrder?.CreateDate?.substring(0, 10) },
    { label: "车型", value: TBL_RepairOrder?.CarTypeCode },
    { label: "VIN", value: TBL_Vehicleselect?.UnderPan },
    {
      label: "预交车时间",
      value: TBL_RepairOrder?.IntendingHandTime?.substring(0, 10),
    },
    { label: "购车日期", value: TBL_Vehicleselect?.BuyDate?.substring(0, 10) },
    { label: "进站历程", value: TBL_Vehicleselect?.RunMileage },
    { label: "维修类型", value: TBL_RepairOrder?.RepairTypeName },
    { label: "客户名称", value: TBL_VehicleOwner?.CarOwnerName },
    { label: "下次保养里程", value: TBL_Vehicleselect?.NextServiceMileage },
    {
      label: "下次保养日",
      value: TBL_Vehicleselect?.NextServiceDate?.substring(0, 10),
    },
    { label: "手机号码", value: TBL_VehicleOwner?.Mobile },
    { label: "联系电话", value: TBL_VehicleOwner?.Telephone1 },
    { label: "送修人", value: TBL_RepairOrder?.RepairSender },
    // { label: "客户地址", value: "新VIN51877" },
  ];

  const tableColumns = [
    { title: "维修措施", dataIndex: "ManhourItemName", align: "center" },
    { title: "技师", dataIndex: "person", align: "center" },
    {
      title: "工时费",
      dataIndex: "ManhourExpense",
      align: "center",
      render: (text) => {
        return <div>{Number(text).toFixed(1)}</div>;
      },
    },
    { title: "收费区分", dataIndex: "DistinguishFlag", align: "center" },
  ];

  const tableColumns_two = [
    { title: "零件号", dataIndex: "PartCode", align: "center" },
    { title: "需更换零件", dataIndex: "PartName", align: "center" },
    { title: "数量", dataIndex: "SellQuantity", align: "center" },
    {
      title: "单价",
      dataIndex: "SellPrice",
      align: "center",
      render: (text) => {
        return <div>{Number(text).toFixed(1)}</div>;
      },
    },
    {
      title: "金额",
      dataIndex: "SellSum",
      align: "center",
      render: (text) => {
        return <div>{Number(text).toFixed(1)}</div>;
      },
    },
    { title: "收费区分", dataIndex: "DistinguishFlag", align: "center" },
  ];

  return (
    <>
      <div
        className="LookPage"
        id="print_area"
        style={{
          backgroundColor: "#ffffff",
          padding: "10px",
          overflowX: "scroll",
        }}
      >
        {/* <Helmet
          onChangeClientState={(newState, addedTags, removedTags) =>
            console.log(newState, addedTags, removedTags)
          }
        >
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=0.6,user-scalable=yes,shrink-to-fit=no"
          />
        </Helmet> */}

        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes,shrink-to-fit=no"
          />
        </Helmet>

        <div
          className="pageTitle"
          style={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          XXX汽车销售服务有限公司维修工单
        </div>
        <div
          className="user_list"
          style={{
            fontSize: "12px",
            display: "flex",
            flexDirection: "row-reverse",
            marginRight: "24px",
          }}
        >
          <div>
            <span>服务顾问：</span>
            <span style={{ marginRight: "10px" }}>杨辉</span>
            <span>维修单号：</span>
            <span>{TBL_RepairOrder?.RepairOrderCode}</span>
          </div>
        </div>
        <Divider style={{ borderTop: "1px solid", margin: "12px 0" }} />

        <div>
          {card_info.map((item, index) => {
            return (
              <div
                key={index}
                className="card_info"
                style={{
                  width: "33%",
                  display: "inline-block",
                  padding: "0 24px",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  className="card_info_sub"
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <span
                    className="label"
                    style={{
                      textAlign: "left",
                      width: `${index == 10 ? "90px" : "70px"}`,
                    }}
                  >
                    {item.label}
                  </span>

                  <span
                    className="value"
                    style={{
                      width: "180px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      verticalAlign: "bottom",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
          <div style={{ marginLeft: "24px" }}>
            <span style={{ width: "90px", display: "inline-block" }}>
              客户地址
            </span>
            <span>青嘉乡文昌宫村五社</span>
          </div>
          <div style={{ marginLeft: "24px" }}>
            <span style={{ width: "90px", display: "inline-block" }}>备注</span>
            <span>{TBL_RepairOrder?.Remark}</span>
          </div>
        </div>

        <Divider style={{ borderTop: "1px solid", margin: "20px 0" }} />
        <div style={{ marginTop: "24px" }}>
          <Table
            columns={tableColumns}
            dataSource={TBL_ManHourExpense}
            pagination={false}
          />
        </div>
        <Divider style={{ borderTop: "1px solid", margin: "24px 0" }} />
        <div style={{ marginTop: "24px" }}>
          <Table
            columns={tableColumns_two}
            dataSource={TBL_RepairPartItem}
            pagination={false}
          />
        </div>
        <Divider style={{ borderTop: "1px solid", margin: "20px 0" }} />
        <div className="card_info_two" style={{ padding: "0 24px" }}>
          <div
            className="card_info_two_sub"
            style={{ width: "25%", display: "inline-block" }}
          >
            <div>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                1.预估工时费
              </span>
              <span className="value"> {TBL_RepairOrder?.ManHourExpense}</span>
            </div>
            <div>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                2.预估配件费
              </span>
              <span className="value">{TBL_RepairOrder?.PartExpense}</span>
            </div>
          </div>

          <div
            className="card_info_two_sub"
            style={{ width: "25%", display: "inline-block" }}
          >
            <div>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                3.预估其他费
              </span>
              <span className="value">0</span>
            </div>
            <div>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                4.预估销售金额
              </span>
              <span className="value">0</span>
            </div>
          </div>

          <div
            className="card_info_two_sub"
            style={{ width: "25%", display: "inline-block" }}
          >
            <div>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                5.工时折扣
              </span>
              <span className="value">0</span>
            </div>
            <div>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                6.材料折扣
              </span>
              <span className="value">0</span>
            </div>
          </div>

          <div
            className="card_info_two_sub"
            style={{ width: "25%", display: "inline-block" }}
          >
            <div>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                7.销售折扣
              </span>
              <span className="value">0</span>
            </div>
          </div>
        </div>
        <Divider style={{ borderTop: "1px solid", margin: "12px 0" }} />
        <div
          className="money"
          style={{
            display: "flex",
            paddingLeft: "24px",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          <div className="money_one" style={{ width: "300px" }}>
            <span style={{ marginRight: "16px" }}>预估合计</span>
            <span>¥{total?.total}</span>
          </div>

          <div className="money_two">
            <span>人民币</span>
            <span>{total?.total_str}</span>
          </div>
        </div>
        <Divider style={{ borderTop: "1px solid", margin: "12px 0" }} />

        <div className="tootip" style={{ paddingLeft: "24px" }}>
          <p>温馨提示:</p>
          <p>
            1.本人同意按贵站工单所列的修理项目修理，愿意支付有关项目需要更关的零件款及维修费。
          </p>
          <p>
            2.随车贵重物品请客户自行保管，如有遗失，本单位不承担任何责任。3.如有涉及保修事项按《保修及保养手册》执行。
          </p>
          <p>3.如有涉及保修事项按《保修及保养手册》执行。</p>
          <p>
            4.旧件是否带走：
            {TBL_RepairOrder?.IsReserveOldPart == "是" ? "是" : "否"}
          </p>
          <p>5.是否洗车：{TBL_RepairOrder?.IsWash == "是" ? "是" : "否"}</p>
        </div>

        <Divider style={{ borderTop: "1px solid", margin: "12px 0" }} />

        <div style={{ paddingLeft: "24px" }}>
          <div>
            客户签署：入站：_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            出站：_________&nbsp;&nbsp;&nbsp; 日期：_____年_____月_____日
            <div style={{ marginTop: "12px" }}>
              投诉:{Corporation?.Telephone2}地址:{Corporation?.Address}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginTop: "12px",
        }}
      >
        <div style={{ width: "200px" }}>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => {
              props.history.push("/orderList");
            }}
          >
            返回列表
          </Button>
          <Button type="primary" onClick={print}>
            打印工单
          </Button>
        </div>
      </div>
    </>
  );
}
