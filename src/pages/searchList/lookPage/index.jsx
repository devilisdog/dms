import React, { useState, useEffect } from "react";
import { Button, Divider, message, Table } from "antd";
import request from "@/utils/request";

// import "./index.less";

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

  const {
    person = {},
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
    { label: "开单时间", value: TBL_RepairOrder?.CreateDate },
    { label: "车型", value: TBL_RepairOrder?.CarTypeCode },
    { label: "VIN", value: TBL_Vehicleselect?.UnderPan },
    { label: "预交车时间", value: TBL_RepairOrder?.IntendingHandTime },
    { label: "购车日期", value: TBL_Vehicleselect?.BuyDate },
    { label: "进站历程", value: TBL_Vehicleselect?.RunMileage },
    { label: "维修类型", value: TBL_RepairOrder?.RepairTypeName },
    { label: "客户名称", value: TBL_VehicleOwner?.CarOwnerName },
    { label: "下次保养里程", value: TBL_Vehicleselect?.NextServiceMileage },
    { label: "下次保养日", value: TBL_Vehicleselect?.NextServiceDate },
    { label: "手机号码", value: TBL_VehicleOwner?.Mobile },
    { label: "联系电话", value: TBL_VehicleOwner?.Telephone1 },
    { label: "送修人", value: TBL_RepairOrder?.RepairSender },
    // { label: "客户地址", value: "新VIN51877" },
  ];

  const tableColumns = [
    { title: "维修措施", dataIndex: "ManhourItemName", align: "center" },
    { title: "技师", dataIndex: "person", align: "center" },
    { title: "工时费", dataIndex: "ManhourExpense", align: "center" },
    { title: "收费区分", dataIndex: "DistinguishFlag", align: "center" },
  ];

  const tableColumns_two = [
    { title: "零件号", dataIndex: "PartCode", align: "center" },
    { title: "需更换零件", dataIndex: "PartName", align: "center" },
    { title: "数量", dataIndex: "SellQuantity", align: "center" },
    { title: "单价", dataIndex: "SellPrice", align: "center" },
    { title: "金额", dataIndex: "SellSum", align: "center" },
    { title: "收费区分", dataIndex: "DistinguishFlag", align: "center" },
  ];

  return (
    <>
      <div
        className="LookPage"
        id="print_area"
        style={{ backgroundColor: "#ffffff", padding: "20px 0" }}
      >
        <div
          className="pageTitle"
          style={{
            textAlign: "center",
            marginBottom: "20px",
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
        {card_info.map((item, index) => {
          return (
            <div
              key={index}
              className="card_info"
              style={{
                width: "33%",
                display: "inline-block",
                padding: "0 24px",
              }}
            >
              <div className="card_info_sub" style={{ marginBottom: "5px" }}>
                <span
                  className="label"
                  style={{
                    display: "inline-block",
                    width: "90px",
                  }}
                >
                  {item.label}
                </span>

                <span className="value" style={{ display: "inline-block" }}>
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
            <p>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                1.预估工时费
              </span>
              <span className="value"> {TBL_RepairOrder?.ManHourExpense}</span>
            </p>
            <p>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                2.预估配件费
              </span>
              <span className="value">{TBL_RepairOrder?.PartExpense}</span>
            </p>
          </div>

          <div
            className="card_info_two_sub"
            style={{ width: "25%", display: "inline-block" }}
          >
            <p>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                3.预估其他费
              </span>
              <span className="value">111</span>
            </p>
            <p>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                4.预估销售金额
              </span>
              <span className="value">111</span>
            </p>
          </div>

          <div
            className="card_info_two_sub"
            style={{ width: "25%", display: "inline-block" }}
          >
            <p>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                5.工时折扣
              </span>
              <span className="value">111</span>
            </p>
            <p>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                6.材料折扣
              </span>
              <span className="value">111</span>
            </p>
          </div>

          <div
            className="card_info_two_sub"
            style={{ width: "25%", display: "inline-block" }}
          >
            <p>
              <span
                className="label"
                style={{ width: "120px", display: "inline-block" }}
              >
                7.销售折扣
              </span>
              <span className="value">111</span>
            </p>
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
            <span>
              ¥
              {Math.round(TBL_RepairOrder?.ManHourExpense) +
                Math.round(TBL_RepairOrder?.PartExpense)}
            </span>
          </div>

          <div className="money_two">
            <span>人民币大写</span>
            <span>（大写：捌佰贰拾玖元整）</span>
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
          <p>
            客户签署：入站：_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            出站：_________&nbsp;&nbsp;&nbsp; 日期：_____年_____月_____日
            <p style={{ marginTop: "12px" }}>
              投诉:{Corporation?.Telephone2}地址:{Corporation?.Address}
            </p>
          </p>
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
