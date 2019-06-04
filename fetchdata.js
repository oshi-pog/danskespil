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
    .then(data => console.log(data));
}

getPlayers();

function showPlayers(playerList) {
  playerList.forEach(showSinglePlayer);
  console.log(playerList);
}

function showSinglePlayer(player) {
  const copy = playersTemplate.cloneNode(true);

  copy.querySelector(".player-name").innerHTML = player.Name;
  copy.querySelector(".player-email").innerHTML = player.Email;

  document.querySelector(".works-container").appendChild(copy);
}
