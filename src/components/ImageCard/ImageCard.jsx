import { useState } from "react";
// components:
import HeartButton from "../../components/HeartButton/HeartButton";
import InfoPopup from "../../components/InfoPopup/InfoPopup";
// css:
import styles from "./ImageCard.module.css";

const ImageCard = ({ imageData, imgLiked, imgLoaded, onImgLoad, onClick }) => {
  const [containerInfoVisible, setContainerInfoVisible] = useState(false);

  return (
    <>
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
          {/* button to add or remove like of the photo: */}
          <HeartButton onClick={onClick} imgLiked={imgLiked} />

          {/* button to open the info popup: */}
          <button
            className={styles.infoButton}
            onClick={() => setContainerInfoVisible(!containerInfoVisible)}
          >
            Image Info
          </button>
        </div>
      </div>

      {containerInfoVisible && (
        <InfoPopup
          fetchedData={imageData}
          onClickCloseButton={() => setContainerInfoVisible(false)}
        />
      )}
    </>
  );
};

export default ImageCard;
