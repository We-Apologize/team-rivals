import styles from "./billing.module.scss";
import { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export default function Billing(props) {
    const {order,setOrder}=props;
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
        <h4 style={{ display: "flex", justifyContent: "center" }}>
          Fill up the details carefully
        </h4>
        <div>
          <p style={{ display: "flex", justifyContent: "center" }}>
            Your email Address : {order.email}         </p>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <TextField
              id="filled-multiline-static"
              label="Delivery Address"
              multiline
              rows={4}
              variant="filled"
              onChange={(e)=>{
                setOrder({...order , deliveryaddress:e.target.value})
              }}
            />
            <TextField
              id="filled-multiline-flexible"
              label="Contact No:"
              multiline
              maxRows={4}
              variant="filled"
              onChange={(e)=>{
                setOrder({...order , contact:e.target.value})
              }}
            />
            <FormControl onChange={(e)=>{
                setOrder({...order , billing:e.target.value})
              }}>
              <FormLabel id="demo-radio-buttons-group-label">Billing Method</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Cash On Delivery"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Cash On Delivery"
                  control={<Radio />}
                  label="Cash On Delivery"
                />
                <FormControlLabel
                  value="Online Payment"
                  control={<Radio />}
                  label="Online Payment"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </Card>
    </div>
  );
}
