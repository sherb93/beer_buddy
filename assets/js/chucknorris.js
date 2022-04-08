var dadJokeBtn = document.getElementById("dadJoke");
var displayDadJoke = document.getElementById("displayDadJoke")

function getJoke(){
  var getDadJokeURL = 'https://geek-jokes.sameerkumar.website/api?format=json';
  
  fetch(getDadJokeURL)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        console.log(data);
        var displayDadJoke = document.getElementById("displayDadJoke");
        displayDadJoke.innerHTML = `
        <h1>${data.joke}</h1>`
      })
}
dadJokeBtn.addEventListener('click', getJoke);