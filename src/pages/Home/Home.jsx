import React, { useState, useEffect, useRef } from "react";
// components:
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import InfoPopup from "../../components/InfoPopup/InfoPopup.jsx";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation.jsx";
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation.jsx";
import ImageCard from "../../components/ImageCard/ImageCard.jsx";
// services:
import { addToFavorites, removeFromFavorites } from "../../services/utils";
// css:
import styles from "./Home.module.css";

function Home() {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const containerImageRef = useRef(null);

  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);
  const [containerInfoVisible, setContainerInfoVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgLiked, setImgLiked] = useState(false);

  useEffect(() => {
    // todo:
    // change this logic (when an image that is already liked turns up):
    setImgLiked(false);

    function setImageHeight() {
      const headerHeight = headerRef.current.offsetHeight;
      const footerHeight = footerRef.current.offsetHeight;

      if (containerImageRef.current) {
        containerImageRef.current.style.height = `calc(100% - ${headerHeight}px - ${footerHeight}px)`;
      }
    }

    window.addEventListener("resize", setImageHeight);

    // Set image height initially:
    setImageHeight();
    // Get a random image initially:
    fetchData(baseUrl + "?count=1");

    // Clean up function
    return () => {
      window.removeEventListener("resize", setImageHeight);
    };
  }, []);

  // todo: resolve this:
  // api source changed to the one below (due to original stopped working)... not sure error handling works anymore.
  const baseUrl = "https://apod.ellanan.com/api";

  // fetch data, customize output by modifying url parameter
  async function fetchData(url) {
    // remove the popup info container if it isn't already toggled off:
    setContainerInfoVisible(false);

    setImgLoaded(false);
    setError(null);
    setFetchedData(null);

    // todo:
    // change this logic (when an image that is already liked turns up):
    setImgLiked(false);

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("1", response.status);

      console.log("2", data);

      if (response.status != 200) {
        setError(data.msg); // the error message provided in the object)
      } else {
        // data comes as an object or as an array (each index containing an object)
        let dataChecked;
        if (Array.isArray(data)) {
          dataChecked = data[0];
        } else {
          dataChecked = data;
        }

        setFetchedData(dataChecked);

        // append image, skip videos.
        if (dataChecked.media_type === "image") {
          setFetchedData(dataChecked);
        } else if (dataChecked.media_type === "video") {
          setError("No image available on the chosen day.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles.home}>
      <Header
        ref={headerRef}
        onClickRandomButton={() => fetchData(baseUrl + "?count=1")}
        onChangeDateInput={(event) =>
          fetchData(baseUrl + "?date=" + event.target.value)
        }
        imageDate={fetchedData ? fetchedData.date : null}
      />

      <div ref={containerImageRef} className={styles.outerImageContainer}>
        {imgLoaded || error ? "" : <LoadingAnimation />}

        {fetchedData && (
          <ImageCard
            imageData={fetchedData}
            imgLoaded={imgLoaded}
            imgLiked={imgLiked}
            onImgLoad={() => setImgLoaded(true)}
            onClick={
              imgLiked
                ? () => {
                    removeFromFavorites(fetchedData);
                    setImgLiked(false);
                  }
                : () => {
                    addToFavorites(fetchedData);
                    setImgLiked(true);
                  }
            }
          />
        )}

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>

      <Footer
        ref={footerRef}
        onClickImageInfo={() => setContainerInfoVisible(!containerInfoVisible)}
      />

      {containerInfoVisible && (
        <InfoPopup
          fetchedData={fetchedData}
          onClickCloseButton={() => setContainerInfoVisible(false)}
        />
      )}

      <TransitionAnimation />
    </main>
  );
}

export default Home;
