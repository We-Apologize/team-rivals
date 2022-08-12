import Head from "next/head";
import axios from "axios";
import styles from "../../styles/Shop.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OrderItemList from "../../components/ShopComponant/OrderItemList/OrderItemList";
import Billing from "../../components/ShopComponant/Billing/Billing";
import OrderNow from "../../components/ShopComponant/OrderNow/OrderNow";
import { useAuth } from "../../context/AuthProvider";
const steps = [
  "Finish Your Order",
  "Add Billing and Delivery Address",
  "Verify And Order",
];

export default function checkoutCart(props) {
  useEffect(() => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      setCartItem(JSON.parse(localStorage.getItem("cartItem")) || []);
    }
  }, []);
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <OrderItemList
            products={cartItem}
            setCartItem={setCartItem}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        );
      case 1:
        return <Billing setOrder={setOrder} order={order} />;
      case 2:
        return <OrderNow order={order} products={cartItem} total={totalPrice}/>;
      default:
        throw new Error("Unknown step");
    }
  };
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { auth } = useAuth();
  const [order, setOrder] = useState({
    amount: totalPrice,
    deliveryaddress: "random",
    contact: "01980554854",
    billing: "Cash on delivery",
    email:auth.user
  });
  const headers = {
    "Content-Type": "application/json",
  };
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  if(!auth.user) return <h1>page not found</h1>
  return (
    <>
      <Head>
        <title>{`Shop | Checkout`}</title>
      </Head>
      
      <div className={styles.bg} style={{ height: "100vh" }}>
        <Stack spacing={0}>
          <Navbar />
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            Complete Your Order
          </h3>
          <Stepper
            activeStep={activeStep}
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step
                  key={label}
                  {...stepProps}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "#0A0927",
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                      {
                        color: "grey.500",
                      },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "#0A0927",
                    },
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                      {
                        color: "common.white",
                      },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      fill: "white",
                    },
                  }}
                >
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  marginLeft: "55px",
                  marginRight: "55px",
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="contained"
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Stack>
      </div>
    </>
  );
}
