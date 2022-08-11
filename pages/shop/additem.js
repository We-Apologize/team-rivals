import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Stack, Typography, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ImageUploadModal from "../../components/ShopComponant/ImageUploadModal/ImageUploadModal";
import Slider from "../../components/ShopComponant/Slider/Slider";
import FilterItem from "../../components/ShopComponant/FilterItem/FilterItem";
import axios from "axios";
import AddProductModal from "../../components/ShopComponant/AddProductModal/AddProductModal";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../components/ShopComponant/ProductCard/ProductCard";
import styles from "../../styles/Shop.module.scss";
import { useAuth } from "../../context/AuthProvider";
export default function Shop() {
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [banners, setBanners] = useState([]);
  const [activeBanner, setActiveBanner] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { auth,IsAdmin } = useAuth();
  useEffect(() => {
    const getAllBanners = async () => {
      const res = await axios.get(
        "/api/shop/banner",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setBanners(res.data);
      } else alert("Error Occured");
    };
    getAllBanners();
  }, []);
  useEffect(() => {
    const getAllProduct = async () => {
      const res = await axios.get(
        "/api/shop",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setItems(res.data);
      } else alert("Error Occured");
    };
    getAllProduct();
  }, []);
  const deleteBanner = async () => {
    try {
      const res = await axios.delete(
        `/api/shop/banner?Banner_ID=${activeBanner.Banner_ID}`,
        activeBanner,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log("ok");
      } else alert("Error Occured");
    } catch (err) {
      alert("Something went wrong i can feel it");

      return;
    }
  };
  {if(!IsAdmin) return <h1>page not found</h1>}
  return (
    <>
      <Head>
        <title>{`Add Items | Team Rivals`}</title>
      </Head>
      
      <div className={styles.bg}>
        <Navbar />
        <Stack>
          <Typography
            variant="h3"
            component="div"
            gutterBottom
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            Active Banners
          </Typography>
          <div style={{ display: "flex", margin: "5px" }}>
            <Button
              variant="contained"
              style={{
                borderRadius: 15,
                backgroundColor: "#0A0927",
                fontSize: "12px",
                width: "8%",
                margin: "0px 60px",
              }}
              endIcon={<FileUploadIcon fontSize="large" />}
              onClick={() => {
                setImgModalOpen(true);
              }}
            >
              Add New Banner
            </Button>
            <Button
              variant="contained"
              style={{
                borderRadius: 15,
                backgroundColor: "#FF0000",
                fontSize: "12px",
                width: "8%",
                margin: "0px 60px",
              }}
              endIcon={<FileUploadIcon fontSize="large" />}
              onClick={deleteBanner}
            >
              DELETE THIS ONE
            </Button>
          </div>
          {imgModalOpen && (
            <ImageUploadModal
              open={imgModalOpen}
              handleClose={setImgModalOpen}
            />
          )}
          {banners != null && banners != undefined && banners.length !== 0 && (
            <Slider
              sliderImage={banners}
              timer={15000}
              setActiveBanner={setActiveBanner}
            />
          )}
          <FilterItem
            items={items}
            setFilteredItems={setFilteredItems}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <Button
            variant="contained"
            style={{
              borderRadius: 15,
              backgroundColor: "#FF0000",
              fontSize: "12px",
              width: "8%",
              margin: "0px 60px",
            }}
            endIcon={<FileUploadIcon fontSize="large" />}
            onClick={() => {
              setAddProductOpen(true);
            }}
          >
            ADD Product
          </Button>
          {addProductOpen && (
            <AddProductModal
              open={addProductOpen}
              handleClose={setAddProductOpen}
            />
          )}
          <motion.div className={styles.itemContainer}>
            <AnimatePresence>
              {filteredItems.map((item) => (
                <ProductCard key={item.productID} item={item} show="edit" />
              ))}
            </AnimatePresence>
          </motion.div>
        </Stack>
      </div>
    </>
  );
}
