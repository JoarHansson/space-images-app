const baseUrl =
  "https://api.nasa.gov/planetary/apod?api_key=v3uFn7uhfV3YcTTafG142dqcDpC1FClGV4xWMmeM";

const buttonsRandomImage = document.querySelectorAll(".button-random-image");
const dateInputs = document.querySelectorAll(".input-date");
const containerImage = document.querySelector(".container-image");
const buttonInfo = document.querySelector(".button-info");

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
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
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
        const errorMessageVideo = document.createElement("p");
        errorMessageVideo.classList.add("error-message");

        // display error message for 5 sec, then get a new random image:
        let i = 5;
        let interval = setInterval(() => {
          errorMessageVideo.textContent = `No image available on the chosen day. Getting a random one in ${i}`;
          i--;
        }, 1000);

        containerImage.appendChild(errorMessageVideo);

        setTimeout(() => {
          // get a random image
          fetchData(baseUrl + "&count=1");
          clearInterval(interval);
        }, 6000);
      }

      // add info about the image when the info icon is clicked
      buttonInfo.addEventListener("click", () => {
        console.log(dataChecked);

        const containerInfo = document.querySelector(".container-info");
        while (containerInfo.hasChildNodes()) {
          containerInfo.removeChild(containerInfo.firstChild);
        }
        containerInfo.classList.remove("hidden");

        const buttonCloseInfo = document.createElement("button");
        buttonCloseInfo.classList.add("button-close-info");
        buttonCloseInfo.textContent = "X";
        containerInfo.appendChild(buttonCloseInfo);

        const imageTitle = document.createElement("p");
        imageTitle.classList.add("image-title");
        imageTitle.textContent = "Title: " + dataChecked["title"];
        containerInfo.appendChild(imageTitle);

        const imageDate = document.createElement("p");
        imageDate.classList.add("image-date");
        imageDate.textContent = "Date: " + dataChecked["date"];
        containerInfo.appendChild(imageDate);

        const imageCopyright = document.createElement("p");
        imageCopyright.classList.add("image-copyright");
        imageCopyright.textContent = "Copyright: " + dataChecked["copyright"];
        containerInfo.appendChild(imageCopyright);

        const imageExplanation = document.createElement("p");
        imageExplanation.classList.add("image-explanation");
        imageExplanation.textContent =
          "Explanation: " + dataChecked["explanation"];
        containerInfo.appendChild(imageExplanation);

        console.log(containerInfo);
      });
    }
  } catch (error) {
    console.error(error);
    console.log(error);
  }
}

// get image by date
dateInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    fetchData(baseUrl + "&date=" + event.target.value);
  });
});

// get a random image
buttonsRandomImage.forEach((button) => {
  button.addEventListener("click", () => {
    fetchData(baseUrl + "&count=1");
  });
});

// make sure large images scales down to fit between header and footer
function setImageHeight() {
  const headerHeight = document.querySelector("header").offsetHeight;
  const footerHeight = document.querySelector("footer").offsetHeight;

  containerImage.style.height = `calc(100% - ${headerHeight}px - ${footerHeight}px)`;
}

window.addEventListener("resize", setImageHeight);

// Set image height initially:
setImageHeight();
// Get a random image initially:
fetchData(baseUrl + "&count=1");

// if container-info is visible, close it on click
const containerInfo = document.querySelector(".container-info");
containerInfo.addEventListener("click", () => {
  if (!containerInfo.classList.contains("hidden")) {
    containerInfo.classList.add("hidden");
  }
});
