import Head from "next/head";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
export default function Shop(props) {
  const [cartItem, setCartItem] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };

  return (
    <>
      <Head>
        <title>{`Shop | Checkout`}</title>
      </Head>
      <div>
        <Stack spacing={0}>
          <Navbar />
          <h4 style={{ display: "flex", justifyContent: "center" }}>
            Complete Your Order
          </h4>
          <table style={{tableLayout:"fixed"}}>
            <tr>
              <td style={{maxWidth:"50%"}}>
                <div>
                  <h5 style={{ display: "flex", justifyContent: "center" }}>Add you size and pieces.</h5>

                </div>
              </td>
              <td>
                <div style={{borderLeft:" 6px solid green"}}>
                  <h5 style={{ display: "flex", justifyContent: "center" }}>Your Order Information.</h5>
                </div>
              </td>
            </tr>
          </table>
        </Stack>
      </div>
    </>
  );
}
