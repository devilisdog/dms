import React from "react";
import OrderList from "../orderList";

export default function SearchList(props) {
  return (
    <div>
      <OrderList lookData={true} {...props} />
    </div>
  );
}
