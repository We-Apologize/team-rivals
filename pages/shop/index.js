import styles from "../../styles/Shop.module.scss";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/ShopComponant/Slider/Slider";
import ItemCard from "../../components/ShopComponant/ItemCard/ItemCard";
import FilterItem from "../../components/ShopComponant/FilterItem/FilterItem";
import Pagination from "../../components/ShopComponant/Pagination/Pagination";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Stack } from "@mui/material";
import { image, dummyItems } from "../../utils/statics/dummyTestdata";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Shop() {
  const [items, setItems] = useState(dummyItems);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <>
      <Head>
        <title>{`Shop | Team Rivals`}</title>
      </Head>
      <div className={styles.bg}>
        <Stack spacing={0}>
          <Navbar />
          <Slider sliderImage={image} />

          <FilterItem
            items={items}
            setFilteredItems={setFilteredItems}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <Pagination cardItems={filteredItems} />
          <motion.div Layout className={styles.itemContainer}>
            <AnimatePresence>
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </Stack>
        <Fab color="" aria-label="cart" className={styles.floatingCart}>
          <Badge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      </div>
    </>
  );
}
