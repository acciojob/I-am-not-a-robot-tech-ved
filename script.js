document.addEventListener("DOMContentLoaded", function () {

  const message = document.getElementById("h");
  const container = document.getElementById("container");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const resultPara = document.getElementById("para");

  message.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";

  const images = [
    "https://picsum.photos/id/101/100",
    "https://picsum.photos/id/102/100",
    "https://picsum.photos/id/103/100",
    "https://picsum.photos/id/104/100",
    "https://picsum.photos/id/105/100"
  ];

  let selectedImages = [];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function loadImages() {
    container.innerHTML = "";
    selectedImages = [];
    verifyBtn.style.display = "none";
    resetBtn.style.display = "none";
    resultPara.innerText = "";

    let randomIndex = Math.floor(Math.random() * images.length);
    let imageSet = [...images];
    imageSet.push(images[randomIndex]);

    shuffle(imageSet);

    imageSet.forEach((src, index) => {
      let img = document.createElement("img");
      img.src = src;
      img.dataset.id = src;

      // IMPORTANT: Cypress test ke liye classes required
      img.classList.add(`img${index + 1}`);

      img.addEventListener("click", handleClick);
      container.appendChild(img);
    });
  }

  function handleClick(e) {
    if (selectedImages.length >= 2) return;
    if (selectedImages.includes(e.target)) return;

    selectedImages.push(e.target);
    resetBtn.style.display = "inline-block";

    if (selectedImages.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }

  verifyBtn.addEventListener("click", function () {
    verifyBtn.style.display = "none";

    if (selectedImages[0].dataset.id === selectedImages[1].dataset.id) {
      resultPara.innerText = "You are a human. Congratulations!";
    } else {
      resultPara.innerText =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  resetBtn.addEventListener("click", loadImages);

  loadImages();
});
