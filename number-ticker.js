import { TweenMax, Power2, TimelineLite } from "gsap/TweenMax";
let counters = document.getElementsByClassName("number-ticker");
let coinArray = document.querySelectorAll(".number-ticker-coin");
const playBtn = document.querySelector("#play-btn");
console.log(coinArray);
let coinDisplay = "none";

let defaultDigitNode = document.createElement("div");
defaultDigitNode.classList.add("digit");

for (let i = 0; i < 10; i++) {
  defaultDigitNode.innerHTML += i + "<br>";
}

[].forEach.call(counters, function(counter) {
  let currentValue = 599995;
  let digits = [];

  generateDigits(currentValue.toString().length);
  setValue(currentValue);

  setInterval(function() {
    setValue(currentValue++);
  }, 2000);

  function setValue(number) {
    let s = number
      .toString()
      .split("")
      .reverse()
      .join("");
    let l = s.length;

    if (l > digits.length) {
      generateDigits(l - digits.length);
    }

    for (let i = 0; i < digits.length; i++) {
      setDigit(i, s[i] || 0);
    }

    if (playBtn.dataset.status == "clicked") {
      animateCoins();
    }
  }

  function animateCoins() {
    if (coinDisplay == "none") {
      coinArray.forEach(coin => {
        coin.style.display = "block";
      });
      coinDisplay = "block";
    }

    for (let x = 0; x < coinArray.length; x++) {
      setTimeout(() => {
        TweenMax.from(coinArray[x], 1, { y: -1500 });
      }, 1000 * x + 2);
    }
  }

  function setDigit(digitIndex, number) {
    digits[digitIndex].style.marginTop = "-" + number + "em";
  }

  function generateDigits(amount) {
    for (let i = 0; i < amount; i++) {
      let d = defaultDigitNode.cloneNode(true);
      counter.appendChild(d);
      digits.unshift(d);
    }
  }
});
