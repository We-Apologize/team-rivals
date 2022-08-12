import styles from "./orderItemList.module.scss";
import { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
export default function OrderItemList(props) {
  const products = props.products;
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
          Order Summary ({products.length}) Products
        </h4>
        {products.map((product, i) => {
          return (
            <div style={{ display: "flex", justifyContent: "space-evenly" , marginBottom:"10px" }}>
              <p>
                {i + 1}. {product.name}
              </p>
              <p>Price :{product.price} TK</p>
              <TextField
                id="outlined-number"
                label="Total piece"
                type="number"
                defaultValue={0}
                onChange={(e)=>{props.setTotalPrice(props.totalPrice+product.price*(e.target.value))
                    props.setCartItem(current =>
                        current.map(obj => {
                          if (obj == product) {
                            return {...obj, total:e.target.value};
                          }
                          return obj;
                        }),
                      );
                    }
                }
                InputProps={{
                  inputProps: {
                    max: 100,
                    min: 0,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          );
        })}
        <b style={{ display: "flex", justifyContent: "center" }}>Total Price : {props.totalPrice}</b>
      </Card>
    </div>
  );
}
