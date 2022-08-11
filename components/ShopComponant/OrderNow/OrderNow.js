import styles from "./orderNow.module.scss";
import { useState } from "react";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
export default function OrderNow(props) {
  const order = props.order;
  return (
    <div>
      <Card
        sx={{
          minWidth: 275,
          marginLeft: "50px",
          marginRight: "50px",
          marginTop: "20px",
          padding: "15px",
        }}
      >
      
      <div style={{display:"flex",justifyContent:"center"}}>
      <div>
      <h3 >Your order is almost Complete</h3>
        <p>Email : {order.email}</p>
        <p>Contact No : {order.contact}</p>
        <p>Delivery Address : {order.deliveryaddress}</p>
        <p>Total amount to pay : {order.amount} Tk</p>
        <p>Billing Method : {order.billing}</p>
        <Button variant="contained">Order Now</Button>
      </div>
      </div>
      </Card>
    </div>
  );
}
