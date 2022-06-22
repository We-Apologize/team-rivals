import styles from "./pagination.module.scss";
import { useState } from "react";
export default function Pagination(props) {
  const {cardItems} = props;
  const [currentPage, setCurrentPage] = useState(1);
  let maxPages = Math.ceil(cardItems.length/2) || 1;
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage ? `${styles.roundEffect} ${styles.active}` : styles.roundEffect
        }
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </div>
    );
  }
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.paginateCtn}>
          <div className={styles.roundEffect} onClick={prevPage}>
            &lsaquo;
          </div>
          {items}
          <div className={styles.roundEffect} onClick={nextPage}>
            &rsaquo;
          </div>
        </div>
      </div>
    </div>
  );
}
