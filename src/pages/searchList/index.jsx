import React from "react";
import OrderList from "../orderList";

export default function SearchList(props) {
  return (
    <div style={{ padding: "10px" }}>
      <OrderList lookData={true} {...props} />
    </div>
  );
}
