import React from "react";
import { Button } from "antd";

import addContact from "@/assets/img/add_contact_.png";

export default function BuildOrder(props) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={addContact}
          style={{ width: "80px", height: "80px", marginBottom: "40px" }}
        />

        <div
          style={{
            width: "185px",
            lineHeight: "40px",
            background: "linear-gradient(to right top,#47acfc,#53d2fd)",
            borderRadius: "4px",
            fontSize: "18px",
            letterSpacing: "10px",
            color: " #fff",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            props.history.push(`/buildOrder/addBuild`);
          }}
        >
          新建工单
        </div>
      </div>
    </div>
  );
}
