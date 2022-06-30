import styles from "../../styles/Shop.module.scss";
import Head from "next/head";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/ShopComponant/Slider/Slider";
import ProductCard from "../../components/ShopComponant/ProductCard/ProductCard";
import FilterItem from "../../components/ShopComponant/FilterItem/FilterItem";
import Pagination from "../../components/ShopComponant/Pagination/Pagination";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Shop(props) {
  const [items, setItems] = useState(props.products);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItem,setCartItem] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };

  return (
    <>
      <Head>
        <title>{`Shop | Team Rivals`}</title>
      </Head>
      <div className={styles.bg}>
        <Stack spacing={0}>
          <Navbar />
          {props.banners != null &&
            props.banners != undefined &&
            props.banners.length !== 0 && (
              <Slider sliderImage={props.banners} timer={5000} />
            )}
          
          <FilterItem
            items={items}
            setFilteredItems={setFilteredItems}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <Pagination cardItems={filteredItems} />
          <motion.div className={styles.itemContainer}>
            <AnimatePresence>
              {filteredItems.map((item) => (
                <ProductCard key={item.id} item={item} show="cart" addToCart={setCartItem}/>
              ))}
            </AnimatePresence>
          </motion.div>
        </Stack>
        <Fab aria-label="cart" className={styles.floatingCart}>
          <Badge badgeContent={cartItem.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  let banners = [];
  let products = [];
  try {
    const getBanner = await axios.get(
      "http://localhost:3000/api/shop/banner",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    const getProduct = axios.get(
      "http://localhost:3000/api/shop",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );

    const [banner, product] = await Promise.all([getBanner, getProduct]);
    console.log(banner);
    console.log(product);
    if (banner.status === 200 && product.status===200) {
      banners = banner.data;
      products = product.data;
    } else alert("Error Occured");
  } catch (err) {
    console.log(err);
  }

  return { props: { banners,products } };
}
