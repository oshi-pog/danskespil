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
