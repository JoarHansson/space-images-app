import { X } from "lucide-react";
import styles from "./InfoPopup.module.css";

function InfoPopup({ fetchedData, onClickCloseButton }) {
  return (
    <div className={styles.containerBlurred}>
      <div className={styles.containerInfo}>
        <button className={styles.closeButton} onClick={onClickCloseButton}>
          <X strokeWidth={3} />
        </button>
        <p className={styles.imageTitle}>Title: {fetchedData.title}</p>
        <p className={styles.imageDate}>Date: {fetchedData.date}</p>
        <p className={styles.imageCopyright}>
          Copyright: {fetchedData.copyright ?? "Not specified"}
        </p>
        <p className={styles.imageExplanation}>
          Explanation: {fetchedData.explanation}
        </p>
      </div>
    </div>
  );
}

export default InfoPopup;
