import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import InfoPopup from "./components/InfoPopup/InfoPopup.jsx";

function App() {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const containerImageRef = useRef(null);

  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);
  const [containerInfoVisible, setContainerInfoVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
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

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("1", response.status);

      console.log("2", data);

      if (response.status != 200) {
        setError(data.error.message); // the error message provided in the object)
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
    <>
      <Header
        ref={headerRef}
        onClickRandomButton={() => fetchData(baseUrl + "&count=1")}
        onChangeDateInput={(event) =>
          fetchData(baseUrl + "&date=" + event.target.value)
        }
      />

      <div ref={containerImageRef} className="container-image">
        {imgLoaded ? (
          ""
        ) : (
          <div style={{ color: "white" }}>loader animation placeholder </div>
        )}
        {fetchedData && (
          <img
            style={imgLoaded ? {} : { display: "none" }}
            src={fetchedData.url}
            alt={fetchedData.title}
            onLoad={() => setImgLoaded(true)}
          />
        )}

        {error && <p className="error-message">{error}</p>}
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
    </>
  );
}

export default App;
