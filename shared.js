//BOTTOM MENU
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

//Variables
const burgerIcon = document.querySelector(".bottom-menu-middle");
const bottomMenuOverlay = document.querySelector("#bottom-menu-overlay");
const bottomMenuContent = document.querySelector(".bottom-menu-content");
const bottomOverlay = document.querySelector("#bottom-menu-overlay");
const game = document.querySelector("#game");
// storing the fixed game-container as variable, to be animated with greensock below
const gameContainer = document.querySelector('.game-container');

let menuStatus = burgerIcon.dataset.status;
let bottomMenuOverlayHeight = null;

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    TweenMax.from(gameContainer,1, {x:1500});
    TweenMax.to(gameContainer,1, {opacity:1});
  }, 1000);
  //Add event listener to burger icon and run function to open or close it based on it's current status
  burgerIcon.addEventListener("click", () => {
    event.preventDefault();
    if (menuStatus == "closed") {
      openOverlayMenu();
    } else {
      closeOverlayMenu();
    }
  });
});



// window.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     game.style.transform = "translate(-50%,-50%)";
//   }, 1000);
//   //Add event listener to burger icon and run function to open or close it based on it's current status
//   burgerIcon.addEventListener("click", () => {
//     event.preventDefault();
//     if (menuStatus == "closed") {
//       openOverlayMenu();
//     } else {
//       closeOverlayMenu();
//     }
//   });
// });

// New greensock animation when page is loaded


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

  setTimeout(() => {
    bottomOverlay.style.height = "0";
  }, 300);
  console.log(menuStatus);
}

// THE MEMORY GAME

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//turns variable
let turnsCounter = 10;
const turns = document.querySelector('#turns');
const turnsCount = document.querySelector('#turns span');

turnsCount.textContent = turnsCounter;

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
  checkTurns();
}

// When two cards are flipped, the users turns will be lowered by one, and when those turns reach zero, the game is hidden, TO DO IMPORTANT
function checkTurns () {
  turnsCounter--;
  turnsCount.textContent = turnsCounter;
  if (turnsCounter === 0){
    cards.forEach(card => card.removeEventListener("click", flipCard));

  }
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
  }, 750);
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
