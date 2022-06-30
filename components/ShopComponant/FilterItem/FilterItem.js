import { useEffect } from "react";
import styles from "./filterItem.module.scss";

export default function FilterItem(props) {
  const { items, setFilteredItems, activeCategory, setActiveCategory } = props;
  useEffect(()=>{
    if(activeCategory==="All")
     {
        setFilteredItems(items);
        return;
     }
    else 
    {
        const fItems = items.filter((item)=> item.category===activeCategory) ;
        setFilteredItems(fItems);
        return;
    }
  },[activeCategory,items,setFilteredItems]);
  return (
    <>
      <div className={styles.bg}>
        <button
          onClick={() => setActiveCategory("All")}
          className={activeCategory === "All" ? styles.btnActive : styles.btn}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory("Jersey")}
          className={
            activeCategory === "Jersey" ? styles.btnActive : styles.btn
          }
        >
          Jersey
        </button>
        <button
          onClick={() => setActiveCategory("Shorts")}
          className={
            activeCategory === "Shorts" ? styles.btnActive : styles.btn
          }
        >
          Shorts
        </button>
        <button
          onClick={() => setActiveCategory("Pin")}
          className={activeCategory === "Pin" ? styles.btnActive : styles.btn}
        >
          Pin
        </button>
        <button
          onClick={() => setActiveCategory("Muffler")}
          className={
            activeCategory === "Muffler" ? styles.btnActive : styles.btn
          }
        >
          Mulfer
        </button>
      </div>
    </>
  );
}
