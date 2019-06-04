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

    console.log(playerArray);
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
