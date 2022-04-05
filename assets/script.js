// call the API

var brewery 


// function autofillSearch ()


// function getBrewery

fetch("https://api.openbrewerydb.org/breweries?by_state=georgia")
    .then(res => console.log(res));



var requestUrl ="https://getbootstrap.com/docs/5.0/examples/cheatsheet/"
var beerList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl = 'https://api.openbrewerydb.org/breweries?by_state=georgia';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = data[i].html_url;
        repoList.appendChild(listItem);
      }
    });
}

fetchButton.addEventListener('click', getApi);