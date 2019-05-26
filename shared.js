//BOTTOM MENU

//Variables
const burgerIcon = document.querySelector(".bottom-menu-middle");
const bottomMenuOverlay = document.querySelector("#bottom-menu-overlay");
const bottomMenuContent = document.querySelector(".bottom-menu-content");
let menuStatus = burgerIcon.dataset.status;
let bottomMenuOverlayHeight = null;

window.addEventListener("DOMContentLoaded", () => {
  //Add event listener to burger icon and run function to open or close it based on it's current status
  burgerIcon.addEventListener("click", () => {
    event.preventDefault();
    if (menuStatus == "closed") {
      openOverlayMenu();
    } else {
      closeOverlayMenu();
    }
  });
  runOdometer();
});

function openOverlayMenu() {
  bottomMenuContent.style.height = "100%";
  bottomMenuOverlay.style.height = "80%";
  menuStatus = "open";
  console.log(menuStatus);
}

function closeOverlayMenu() {
  bottomMenuContent.style.height = "0";

  setTimeout(() => {
    bottomMenuOverlay.style.height = "0";
  }, 300);
  menuStatus = "closed";
  console.log(menuStatus);
}

//COUNTER
function runOdometer() {
  setTimeout(() => {
    odometer.innerHTML = 43600000;
  }, 1000);
}

// THE MEMORY GAME

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(function() {
    document.getElementById("game").style.transform = "translateX(0)";
  }, 4000);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));
