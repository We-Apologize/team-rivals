import React, { useState } from "react";
import Image from "next/image";
import styles from "./editProduct.module.scss";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { storage } from "../../../lib/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { style, sizes, categories, dummyStock} from "../AddProductModal/staticData";

function EditProduct(props) {
   const {item}=props;
  const [category, setCategory] = useState("Jersey");
  const [price, setPrice] = useState(0);
  const [piece, setPiece] = useState(0);
  const [size, setSize] = useState("U");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [productStock, setProductStock] = useState(dummyStock);
  const [image, setImage] = useState([]);
  const onChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const addStock = () => {
    setProductStock((preProductStock) => {
      let ok = false;
      for (let i = 0; i < preProductStock.length; i++) {
        if (preProductStock[i].size === size) {
          preProductStock[i].piece =
            parseInt(preProductStock[i].piece) + parseInt(piece);
          ok = true;
          break;
        }
      }
      if (ok) return [...preProductStock];
      else return [...preProductStock, { size, piece }];
    });
  };

  const addProduct = () => {
    //TODO: ADD VALIDATION
    const product = { id:Date.now(),name, tag, price, category };
    if (image.length !== 0) {
      const imageRef = ref(storage, `product/${product.id}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          product.image=url;
          const res = await axios.post(
            "/api/shop/product",
            { product,productStock },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
            { withCredentials: true }
          );

          if (res.status === 200) {
            alert("product ADDED");
          } else alert("Error Occured");

          props.handleClose(false);
        });
      });
    } else return;
  };
  return (
    <>
      <Modal
        open={props.open}
        onClose={() => {
          setProductStock(dummyStock);
          props.handleClose(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 className={styles.productHeader}>Add A New Product</h3>
          <TextField
            id="filled-basic"
            label="Product Name"
            variant="filled"
            defaultValue={item.name}
            style={{ width: "100%", margin: "10%,10%" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Product Tag"
            variant="filled"
            defaultValue={item.tag}
            style={{ width: "100%", margin: "0%,10%", marginTop: "10px" }}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          />
          <div style={{ display: "flex", marginTop: "10px" ,justifyContent:"space-evenly"}}>
           <h3>Category : {item.category}</h3>
            <FormControl
              sx={{ width: "50%", margin: "0%,10%", marginLeft: "3px" }}
              variant="filled"
            >
              <FilledInput
                id="price"
                defaultValue={item.price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">Tk</InputAdornment>
                }
                aria-describedby="price"
                inputProps={{
                  "aria-label": "Price",
                }}
              />
              <FormHelperText id="price">Price</FormHelperText>
            </FormControl>
          </div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <TextField
              id="sizes"
              select
              label="Size"
              defaultValue=""
              onChange={(e) => {
                setSize(e.target.value);
              }}
              style={{ width: "40%", margin: "0%,10%" }}
              helperText="Please add a size for this product"
              variant="filled"
            >
              {sizes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl
              sx={{ width: "40%", margin: "0%,10%", marginLeft: "3px" }}
              variant="filled"
            >
              <FilledInput
                id="piece"
                onChange={(e) => {
                  setPiece(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">Piece</InputAdornment>
                }
                aria-describedby="piece"
                inputProps={{
                  "aria-label": "piece",
                }}
              />
              <FormHelperText id="piece">Piece</FormHelperText>
            </FormControl>
            <Button
              sx={{ width: "20%", marginLeft: "3px", height: "55px" }}
              color="success"
              variant="contained"
              onClick={addStock}
            >
              SET
            </Button>
          </div>
          <h5 className={styles.productHeader}>Product Stocks</h5>
          <div className={styles.stock}>
            {productStock.length != 0 &&
              productStock.map((stock, key) => (
                <div key={key} className={styles.singleStock}>
                  <b>{key + 1} . </b> Size: {stock.size} Pieces: {stock.piece}
                </div>
              ))}
          </div>
          <h5>Change Product Image</h5>
          <input
            type="file"
            onChange={onChange}
            accept="image/*"
            style={{ display: "block" ,marginBottom:"3px"}}
          />
          <Button
            className={styles.submitProduct}
            color="secondary"
            variant="contained"
            onClick={addProduct}
          >
            Edit the product
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default EditProduct;
