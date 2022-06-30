import Image from "next/image";
import styles from "./productCard.module.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import { useState } from "react";
import EditProduct from "../EditProduct/EditProduct";
export default function ProductCard(props) {
  const { item } = props;
  const [editModal,setEditModal]=useState(false);
  const [editItem,setEditItem] = useState(null);
  const addProductInCart = (item)=>{
    props.addToCart((preItems) => { 
      const index = preItems.findIndex(object => object.productId === item.productId);
      if (index === -1) return [...preItems,item];
      else return [...preItems];
    });
  }
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ transition: 0.5 }}
    >
      <div className={styles.wskCpProduct}>
        <div className={styles.wskCpImg}>
          <Image src={item.image} height="400px" width="500px" />
          <div className={styles.wskCpText}>
            <div className={styles.category}>
              <span>{item.category}</span>
            </div>
            <div className={styles.titleProduct}>
              <h3>{item.name}</h3>
            </div>
            <div className={styles.descriptionProd}>
              <p>{item.tag}</p>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.wcfLeft}>
                <span className={styles.price}>{item.price} TK</span>
              </div>
              <div className={styles.wcfRight}>
                {props.show === "cart" && (
                  <div className={styles.buyBtn} onClick={()=>{addProductInCart(item)}}>
                    <AddShoppingCartIcon
                      style={{ color: "#fff", margin: "auto" }}
                    />
                  </div>
                )}
                {props.show === "edit" && (
                  <div className={styles.buyBtn} style={{cursor:"pointer"}} onClick={()=>{setEditItem(item);setEditModal(true)}}>
                    <EditIcon style={{ color: "#fff", margin: "auto" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {editModal && (
            <EditProduct
              open={editModal}
              handleClose={setEditModal}
              item={editItem}
            />
          )}
    </motion.div>
  );
}
