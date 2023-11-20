const baseUrl =
  "https://api.nasa.gov/planetary/apod?api_key=v3uFn7uhfV3YcTTafG142dqcDpC1FClGV4xWMmeM";

const buttonGetRandomImage = document.querySelector("#button-random-image");

const dateInput = document.querySelector("#input-date");

const container = document.querySelector("#container-image");

// fetch data, customize output by modifying url parameter
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("1", response.status);

    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    console.log("2", data);

    if (response.status != 200) {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = data.msg; // the error message provided in the object
      container.appendChild(errorMessage);
    } else {
      // data comes as an object or as an array (each index containing an object)
      let dataFormat;
      if (Array.isArray(data)) {
        dataFormat = data[0];
      } else {
        dataFormat = data;
      }

      // append image, skip videos.
      if (dataFormat.media_type === "image") {
        const image = document.createElement("img");
        image.src = dataFormat.url;
        container.appendChild(image);
      } else if (dataFormat.media_type === "video") {
        const errorVideo = document.createElement("div");
        errorVideo.textContent =
          "No image available on this day. Choose another day.";
        container.appendChild(errorVideo);
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
buttonGetRandomImage.addEventListener("click", () => {
  fetchData(baseUrl + "&count=1");
});
