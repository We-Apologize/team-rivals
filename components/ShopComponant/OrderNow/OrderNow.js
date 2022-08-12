import styles from "./orderNow.module.scss";
import { useState } from "react";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import axios from "axios";
export default function OrderNow(props) {
  const order = props.order;
  const products = props.products;
  const sellTicket = async ()=>{
     try{
        const res = await axios.post("/api/fixture/order",{email:order.email,order,total:props.total,products})
        console.log(res);
        alert("Ticket purchased succesfully.")
     }
     catch(err)
     {
        console.log(err)
        alert("Something Wrong i can feel it.")
     }
   }
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
        <p>Total amount to pay : {props.total} Tk</p>
        <p>Billing Method : {order.billing}</p>
        <Button variant="contained" onClick={sellTicket}>Order Now</Button>
      </div>
      </div>
      </Card>
    </div>
  );
}
