import React, { useState, useEffect, useRef } from "react";
// packages:
import { Heart } from "lucide-react";
// components:
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import InfoPopup from "../components/InfoPopup/InfoPopup.jsx";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation.jsx";
import TransitionAnimation from "../components/TransitionAnimation/TransitionAnimation.jsx";
// css:
import "../index.css";
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

  // Todo:
  // Break out functions etc into components/files of their own.

  const getFavoritesFromLocalStorage = () => {
    let favorites = [];
    try {
      favorites = JSON.parse(localStorage.getItem("favorites"));
    } catch (error) {
      console.error(
        "Invalid JSON in localStorage for 'favorites'. Resetting to empty array."
      );
      favorites = [];
    }
    return favorites;
  };

  const addToFavorites = () => {
    setImgLiked(true);

    let favorites = getFavoritesFromLocalStorage();

    if (Array.isArray(favorites)) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, fetchedData])
      );
    } else {
      localStorage.setItem("favorites", JSON.stringify([fetchedData]));
    }
  };

  const removeFromFavorites = () => {
    setImgLiked(false);

    let favorites = getFavoritesFromLocalStorage();

    // remove if the selected one matches one (or many) in local storage
    favorites = favorites.filter((favorite) => {
      return JSON.stringify(favorite) !== JSON.stringify(fetchedData);
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

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
    fetchData(baseUrl + "&count=1");

    // Clean up function
    return () => {
      window.removeEventListener("resize", setImageHeight);
    };
  }, []);

  const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${
    import.meta.env.VITE_API_KEY
  }`;

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
      console.log(error);
    }
  }

  return (
    <main className={styles.home}>
      <Header
        ref={headerRef}
        onClickRandomButton={() => fetchData(baseUrl + "&count=1")}
        onChangeDateInput={(event) =>
          fetchData(baseUrl + "&date=" + event.target.value)
        }
        imageDate={fetchedData ? fetchedData.date : null}
      />

      {/* this part could be rewritten to cleaner code: */}
      {/* and maybe broken out to a component of its own */}
      <div ref={containerImageRef} className={styles.outerImageContainer}>
        {imgLoaded || error ? "" : <LoadingAnimation />}
        {fetchedData && (
          <div
            className={styles.innerImageContainer}
            style={imgLoaded ? {} : { display: "none" }}
          >
            <img
              className={styles.image}
              src={fetchedData.url}
              alt={fetchedData.title}
              onLoad={() => setImgLoaded(true)}
            />
            <div className={styles.imgFooter}>
              <button
                className={styles.likeButton}
                onClick={imgLiked ? removeFromFavorites : addToFavorites}
              >
                <Heart
                  className={imgLiked ? styles.heartRed : styles.heartGrey}
                />
              </button>
            </div>
          </div>
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
