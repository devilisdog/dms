import React from "react";
import OrderList from "../orderList";
import { Helmet } from "react-helmet";

export default function SearchList(props) {
  return (
    <div style={{ padding: "10px" }}>
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
      <OrderList lookData={true} {...props} />
    </div>
  );
}
