import { useState, useEffect, useRef, useCallback } from "react";
// components:
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation.jsx";
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation.jsx";
import ImageCard from "../../components/ImageCard/ImageCard.jsx";
// services:
import { addToFavorites, removeFromFavorites } from "../../services/utils.js";
import { fetchRandomImage, fetchImageByDate } from "../../services/api.js";
// css:
import styles from "./Explore.module.css";

function Explore() {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const containerImageRef = useRef(null);

  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgLiked, setImgLiked] = useState(false);
  const [inputDate, setInputDate] = useState(""); // New state to control the input date

  // Fetch random image
  const loadRandomImage = useCallback(async () => {
    setImgLoaded(false);
    setError(null);
    setFetchedData(null);
    setImgLiked(false);

    try {
      const data = await fetchRandomImage();
      handleApiResponse(data);
    } catch (error) {
      setError("Failed to load random image");
    }
  }, []);

  useEffect(() => {
    setImgLiked(false);

    function setImageHeight() {
      const headerHeight = headerRef.current.offsetHeight;
      const footerHeight = footerRef.current.offsetHeight;

      if (containerImageRef.current) {
        containerImageRef.current.style.height = `calc(100% - ${headerHeight}px - ${footerHeight}px)`;
      }
    }

    window.addEventListener("resize", setImageHeight);

    setImageHeight();
    loadRandomImage();

    return () => {
      window.removeEventListener("resize", setImageHeight);
    };
  }, [loadRandomImage]);

  const handleApiResponse = (data) => {
    let dataChecked;
    if (Array.isArray(data)) {
      dataChecked = data[0];
    } else {
      dataChecked = data;
    }

    if (dataChecked.media_type === "image") {
      setFetchedData(dataChecked);
      setInputDate(dataChecked.date);
    } else if (dataChecked.media_type === "video") {
      setError("No image available on the chosen day.");
    }
  };

  const debouncedFetchByDate = useCallback(() => {
    let debounceTimeout;
    return (date) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(async () => {
        setImgLoaded(false);
        setError(null);
        setFetchedData(null);
        setImgLiked(false);

        try {
          const data = await fetchImageByDate(date);
          handleApiResponse(data);
        } catch (error) {
          setError("Failed to load image for the selected date");
        }
      }, 500);
    };
  }, []);

  const loadImageByDateDebounced = debouncedFetchByDate();

  const handleDateInputChange = (event) => {
    const date = event.target.value;
    setInputDate(date);
    loadImageByDateDebounced(date);
  };

  return (
    <main className={styles.explore}>
      <Header ref={headerRef} />

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
        onClickRandomButton={loadRandomImage}
        onChangeDateInput={handleDateInputChange}
        imageDate={inputDate}
      />

      <TransitionAnimation />
    </main>
  );
}

export default Explore;
