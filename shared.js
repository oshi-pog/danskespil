// FETCH DATA

function fetchdata(){
  fetch("https://danskespil-6ea1.restdb.io/", {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5cea5dcd5f86251ddebe1a94",
        "cache-control": "no-cache"
      }
    })
      .then(e => e.json())
      .then(e => console.log(e));
}


//BOTTOM MENU

//Variables
const burgerIcon = document.querySelector(".bottom-menu-middle");
const bottomMenuContent = document.querySelector(".bottom-menu-content");
let menuStatus = burgerIcon.dataset.status;

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
});

function openOverlayMenu() {
  bottomMenuContent.style.height = "100%";
  menuStatus = "open";
  console.log(menuStatus);
}

function closeOverlayMenu() {
  bottomMenuContent.style.height = "0";
  menuStatus = "closed";
  console.log(menuStatus);
}


// THE MEMORY GAME

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

window.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(function(){ 
    console.log("klhjdgaskldéaj");
    document.getElementById('game').style.transform = "";
   }, 2000);
   fetchdata();
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

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
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

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

cards.forEach(card => card.addEventListener('click', flipCard));