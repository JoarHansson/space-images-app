// components:
import HeartButton from "../../components/HeartButton/HeartButton";
// css:
import styles from "./ImageCard.module.css";

const ImageCard = ({ imageData, imgLiked, imgLoaded, onImgLoad, onClick }) => {
  return (
    <div
      className={styles.container}
      key={imageData.url}
      style={imgLoaded ? {} : { display: "none" }}
    >
      <img
        className={styles.image}
        src={imageData.url}
        alt={imageData.title}
        onLoad={onImgLoad}
      />
      <div className={styles.imageFooter}>
        <HeartButton onClick={onClick} imgLiked={imgLiked} />
        {/* todo: */}
        {/* make this button work: */}
        <button className={styles.infoButton}>Image Info</button>
      </div>
    </div>
  );
};

export default ImageCard;
