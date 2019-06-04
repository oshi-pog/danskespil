//DATABASE

let databaseLink = "https://danskespil-6ea1.restdb.io/rest/userlist";
let personObject = {
  BirthDate: 0,
  Name: null,
  Email: null,
  Prize: 0
};

function postData(personObject) {
  const postData = JSON.stringify(personObject);
  fetch(databaseLink, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cea5dcd5f86251ddebe1a94",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(data => data.json())
    .then(data => console.log(data));
}
