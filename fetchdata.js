//JSON
let databaseLink = "https://danskespil-6ea1.restdb.io/rest/userlist";

//WORKS DATA
const playersTemplate = document.querySelector("#template-players").content;

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
    .then(data => showPlayers(data));
}

getPlayers();

function showPlayers(playerList) {
  playerList.forEach(showSinglePlayer);
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
function sortByFirstName() {
  playerArray.sort(function(a, b) {
    if (a.firstname < b.firstname) {
      return -1;
    }
    if (a.firstname > b.firstname) {
      return 1;
    }
    return 0;
  });

  showPlayers();
}

document
  .querySelector(".sortby-name-button")
  .addEventListener("click", sortByFirstName);
