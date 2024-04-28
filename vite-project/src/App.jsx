import React, { useState, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const containerImageRef = useRef(null);

  const [img, setImg] = useState(null);
  const [error, setError] = useState(null);

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

  const baseUrl =
    "https://api.nasa.gov/planetary/apod?api_key=v3uFn7uhfV3YcTTafG142dqcDpC1FClGV4xWMmeM";

  // fetch data, customize output by modifying url parameter
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("1", response.status);

      setImg(null);
      setError(null);

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

        // append image, skip videos.
        if (dataChecked.media_type === "image") {
          setImg(dataChecked.url);
        } else if (dataChecked.media_type === "video") {
          // display error message for 5 sec, then get a new random image:
          let i = 5;
          let interval = setInterval(() => {
            let errorMessageVideo = `No image available on the chosen day. Getting a random one in ${i}`;

            setError(errorMessageVideo);

            i--;
          }, 1000);

          setTimeout(() => {
            // get a random image
            fetchData(baseUrl + "&count=1");
            clearInterval(interval);
          }, 6000);
        }
      }
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  return (
    <>
      <header ref={headerRef}>
        <button
          className="button-random-image desktop"
          onClick={() => fetchData(baseUrl + "&count=1")}
        >
          Get random image
        </button>
        <h1 className="desktop">Space Images</h1>

        <input
          type="date"
          className="input-date desktop"
          onChange={(event) =>
            fetchData(baseUrl + "&date=" + event.target.value)
          }
        />

        <h1 className="mobile">Space Images</h1>
        <div className="container-header mobile">
          <button className="button-random-image mobile">
            Get random image
          </button>
          <input type="date" className="input-date mobile" />
        </div>
      </header>

      <div ref={containerImageRef} className="container-image">
        {img && <img src={img} />}
        {error && <p className="error-message">{error}</p>}
      </div>

      <footer ref={footerRef}>
        <a
          href="https://github.com/JoarHansson/space-images"
          className="github-link"
          target="”_blank”"
        >
          Github
        </a>
        <button className="button-info">Image Info</button>
      </footer>
      <div className="container-info hidden"></div>
    </>
  );
}

export default App;
