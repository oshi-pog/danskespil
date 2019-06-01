//BOTTOM MENU
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

//Variables
const burgerIcon = document.querySelector(".bottom-menu-middle");
const bottomMenuOverlay = document.querySelector("#bottom-menu-overlay");
const bottomMenuContent = document.querySelector(".bottom-menu-content");
const bottomOverlay = document.querySelector("#bottom-menu-overlay");
const game = document.querySelector("#game");
// storing the fixed game-container as variable, to be animated with greensock below
// const gameContainer = document.querySelector('.game-container');
// EDIT ABOVE: changing the animations from the game container to be the game page, which contains the game container
const gamePage = document.querySelector('#game-page');

let menuStatus = burgerIcon.dataset.status;
let bottomMenuOverlayHeight = null;

// Selecting the bottom menu, to be animated out when the game starts
const bottomMenu = document.querySelector('#bottom-menu');

window.addEventListener("DOMContentLoaded", () => {
  
  setTimeout(() => {
    // TweenMax.from(gameContainer,1, {x:1500});
    // TweenMax.to(gameContainer,1, {display:'grid'});
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

// Code for the landing page, number ticker and button etc
const startBtn = document.querySelector('.number-ticker-cta');
const numberTicker = document.querySelector('.number-ticker-container');

startBtn.addEventListener('click', function (e){
  startGame(e);
  TweenMax.to(numberTicker,1, {opacity: 0, display:'none'});
});


//Function to run when the start button is clicked, under the number ticker
function startGame (e) {
  e.preventDefault();
  console.log('it should run')
  // The game slides out
  TweenMax.from(gamePage,1, {x:1500});
  TweenMax.to(gamePage,1, {display:'grid'});

  // Bottom menu slides away
  TweenMax.to(bottomMenu,1, {y:500, display:'none'});

}

// Code for the birthday input form
const playBtn = document.querySelector('#play-btn');
const ageModal = document.querySelector('#age-modal');
const birthdayForm = document.querySelector('#birthday-form');

playBtn.addEventListener('click', function(e){
  playStart(e);
});

//Function below will be run when the playBtn is clicked
function playStart (e) {
  console.log('play button clicked')
  //TO DO, if statement to check if the input form is done correctly
  TweenMax.to(ageModal,1, {opacity:0, display:'none'});
  // Preventing the page from reloading
  e.preventDefault();
}



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

// Score variable
let playerScore = 0;
let playerWrong = 0;

//turns variable
let turnsCounter = 10;
const turns = document.querySelector('#turns');
const turnsCount = document.querySelector('#turns span');

turnsCount.textContent = turnsCounter;

//Level variables, to change style based on score
let prizeLvl1 = document.querySelector('#lvl1');
let prizeLvl2 = document.querySelector('#lvl2');
let prizeLvl3 = document.querySelector('#lvl3');
let prizeLvl4 = document.querySelector('#lvl4');




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

  let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    // Disables the cards if they are correct, unflips the cards if they dont match, running functions based on this.
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {


  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

  // Adding 1 to player score, because the cards have matched
  playerScore++;
  console.log(playerScore);
  // Applying styling to levels based on score 
  if (playerScore === 2){
    console.log('level1')
    
    TweenMax.to(prizeLvl2,0.5, {backgroundColor:'#A88852', color:'white'});

  } else if (playerScore === 4){
    prizeLvl3.classList.remove('inactive');
    prizeLvl3.classList.add('active');
  } else if (playerScore === 6){
    prizeLvl4.classList.remove('inactive');
    prizeLvl4.classList.add('active');
  }

}

function unflipCards() {
  lockBoard = true;
  playerWrong++;
  console.log(playerWrong)

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
