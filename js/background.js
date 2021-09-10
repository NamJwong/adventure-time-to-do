const bgImage = document.createElement("img");
const images = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"];

const chosenImage = images[getRandomNum("bgRandomNum", images)];
main.style.backgroundImage = `url(img/${chosenImage})`;
