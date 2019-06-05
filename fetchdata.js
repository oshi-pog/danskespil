//JSON
let databaseLink = "https://danskespil-6ea1.restdb.io/rest/userlist";

//WORKS DATA
const playersTemplate = document.querySelector("#template-players").content;

//Player ARRAY
let playerArray = new Array();

function getPlayers() {
  fetch(databaseLink, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cea5dcd5f86251ddebe1a94",
      "cache-control": "no-cache"
    }
  })
    .then(data => data.json())
    .then(data => prepareObjects(data))
    .then(data => showPlayers());
}

getPlayers();

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    //create new object
    let player = Object.create(jsonObject);

    player.Name = jsonObject.Name;

    playerArray.push(player);

    //  console.log(playerArray);
  });
}

function showPlayers() {
  document.querySelector(".student-list-body").innerHTML = "";
  playerArray.forEach(showSinglePlayer);
}

function showSinglePlayer(player) {
  const copy = playersTemplate.cloneNode(true);

  copy.querySelector(".player-name").innerHTML = player.Name;
  //console.log(player.Name);
  copy.querySelector(".player-email").innerHTML = player.Email;
  // console.log(player.Email);
  copy.querySelector(".player-remove").dataset.id = player._id;

  document.querySelector(".student-list-body").appendChild(copy);
}

//SORT PLAYERS
function sortByName() {
  playerArray.sort((a, b) => (a.Name > b.Name ? 1 : b.Name > a.Name ? -1 : 0));

  showPlayers();
}

document
  .querySelector(".sortby-name-button")
  .addEventListener("click", sortByName);

//REMOVE PLAYERS
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#player-list").addEventListener("click", clickList);
});

function clickList(e) {
  const action = event.target.dataset.action;
  console.log(action);

  if (action === "remove") {
    clickRemove(event);
  }
}

function clickRemove(event) {
  event.preventDefault();
  let id = event.target.dataset.id;

  removeById(id);
  showPlayers();
}

function removeById(id) {
  let index = playerArray.findIndex(player => player.id === id);

  playerArray.splice(index, 1);
}
