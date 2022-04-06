

// Define Variables

// const search = document.getElementsById("search")
// const matchList = document.getElementById("match-list")


fetch("https://api.openbrewerydb.org/breweries?by_state=georgia")
  .then(response => response.json())
  .then(data => console.log(data));


// Get matches to current text input
  let matches = data.filter(data => {
    const regex = new RegExp('^${searchText}','gi');
    return state.name.match(regex) || state.abbr.match(regex)

  })
}

if (search.text.length === 0) {
  matches = []
  matchList.innerHtml ="";
}
outputHtml(matches);


// show results in html
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(match => '
    <div class="card card-body mb-1">
    <h2>${match.name}</h2>
    </div>
  ')
  .join("");
  console.log(html);
 }
}

search.addeventListenter("input", () => searchBrewery(search.value));


// // function autofillSearch ()


// // function getBrewery


