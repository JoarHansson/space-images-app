const baseUrl =
  "https://api.nasa.gov/planetary/apod?api_key=v3uFn7uhfV3YcTTafG142dqcDpC1FClGV4xWMmeM";

// get a random image
const buttonGetRandomImage = document.querySelector("#button-random-image");

buttonGetRandomImage.addEventListener("click", () => {
  fetch(baseUrl + "&count=1")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data[0]); // data in array format with one index

      const container = document.querySelector("#container-image");
      while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
      }

      const image = document.createElement("img");
      image.src = data[0].url;
      container.appendChild(image);
    });
});

// get image by date
const dateInput = document.querySelector("#input-date");

dateInput.addEventListener("change", (event) => {
  fetch(baseUrl + "&date=" + event.target.value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const container = document.querySelector("#container-image");
      while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
      }

      const image = document.createElement("img");
      image.src = data.url;
      container.appendChild(image);
    });
});
