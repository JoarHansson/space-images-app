import { useRef, useState, useEffect } from "react";
// components:
import HeartButton from "../../components/HeartButton/HeartButton";
import InfoPopup from "../../components/InfoPopup/InfoPopup";
// css:
import styles from "./ImageCard.module.css";

const ImageCard = ({ imageData, imgLiked, imgLoaded, onImgLoad, onClick }) => {
  const [containerInfoVisible, setContainerInfoVisible] = useState(false);
  const imgRef = useRef(null);
  const containerFooterRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState();
  const [containerWidth, setContainerWidth] = useState();

  function getImageHeight() {
    const imgHeight = imgRef.current.offsetHeight;
    const imgWidth = imgRef.current.offsetWidth;

    setContainerHeight(imgHeight);
    setContainerWidth(imgWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", getImageHeight);

    // Set image height initially:
    getImageHeight();

    // Clean up function
    return () => {
      window.removeEventListener("resize", getImageHeight);
    };
  }, [onImgLoad]);

  return (
    <>
      <img
        className={styles.image}
        src={imageData.url}
        alt={imageData.title}
        onLoad={onImgLoad}
        onResize={getImageHeight}
        ref={imgRef}
        style={imgLoaded ? {} : { display: "none" }}
      />
      <div
        ref={containerFooterRef}
        className={styles.container}
        style={{
          height: containerHeight,
          width: containerWidth,
          ...(imgLoaded ? {} : { display: "none" }),
        }}
      >
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
