import { Heart } from "lucide-react";
import styles from "./HeartButton.module.css";

const HeartButton = ({ onClick, imgLiked }) => {
  return (
    <button className={styles.likeButton} onClick={onClick}>
      <Heart className={imgLiked ? styles.heartRed : styles.heartGrey} />
    </button>
  );
};

export default HeartButton;
