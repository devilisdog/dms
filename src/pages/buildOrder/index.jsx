import React from "react";
import { Helmet } from "react-helmet";

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
      <Helmet
        onChangeClientState={(newState, addedTags, removedTags) =>
          console.log(newState, addedTags, removedTags)
        }
      >
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Helmet>
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
