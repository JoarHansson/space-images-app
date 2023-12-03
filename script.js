const baseUrl =
  "https://api.nasa.gov/planetary/apod?api_key=v3uFn7uhfV3YcTTafG142dqcDpC1FClGV4xWMmeM";

const buttonRandomImage = document.querySelector("#button-random-image");
const dateInput = document.querySelector("#input-date");
const containerImage = document.querySelector("#container-image");
const containerInfo = document.querySelector("#container-info");

// fetch data, customize output by modifying url parameter
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("1", response.status);

    while (containerImage.hasChildNodes()) {
      containerImage.removeChild(containerImage.firstChild);
    }

    console.log("2", data);

    if (response.status != 200) {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = data.msg; // the error message provided in the object
      containerImage.appendChild(errorMessage);
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
        const image = document.createElement("img");
        image.src = dataChecked.url;
        containerImage.appendChild(image);
      } else if (dataChecked.media_type === "video") {
        const errorMessageVideo = document.createElement("div");

        // display error message for 5 sec, then get a new random image:
        let i = 5;
        let interval = setInterval(() => {
          errorMessageVideo.textContent = `No image available on this day. Getting a random one in ${i}`;
          i--;
        }, 1000);

        containerImage.appendChild(errorMessageVideo);

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

// get image by date
dateInput.addEventListener("change", (event) => {
  fetchData(baseUrl + "&date=" + event.target.value);
});

// get a random image
buttonRandomImage.addEventListener("click", () => {
  fetchData(baseUrl + "&count=1");
});

// make sure large images scales down to fit between header and footer
function setElementHeight() {
  const headerHeight = document.querySelector("header").offsetHeight;
  const footerHeight = document.querySelector("footer").offsetHeight;

  containerImage.style.height = `calc(100% - ${headerHeight}px - ${footerHeight}px)`;
}

window.addEventListener("resize", setElementHeight);

// Call the function initially
setElementHeight();
