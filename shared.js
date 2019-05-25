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
