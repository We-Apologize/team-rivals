import React from "react";
import Image from "next/image";
import styles from "./ItemCard.module.scss";
import {motion} from 'framer-motion';
function ItemCard(props) {
  const { item } = props;
  return (
    <>
      <motion.div Layout  
      animate={{opacity:1}}
      initial={{opacity:0}}
      exit={{opacity:0}}
      transition={{transition:.5}}
      className={styles.wholeCard}>
        <div className={styles.card}>
          <figure>
            <Image src={item.image} layout="fill" alt={item.name} />
          </figure>
          <section className={styles.details}>
            <div className={styles.minDetails}>
              <h1 className={styles.title}>
                {item.name} <span>{item.category} </span>
              </h1>
              <h1 className={styles.price}>{item.price}</h1>
            </div>

            <div className={styles.options}>
              <div className={styles.optionSize}>
                <h1 className={styles.title}>sizes</h1>
                <ul>
                  {item.sizes.map((size,key) => (
                    <li key={key}>{size}</li>
                  ))}
                </ul>
              </div>

              {/* <div className={styles.optionsColor}>
                <h1  className={styles.title}>colors</h1>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div> */}
            </div>
            <a href="#" className={styles.btn}>
              add to cart
            </a>
          </section>
        </div>
      </motion.div>
    </>
  );
}

export default ItemCard;
