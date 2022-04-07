// Declare Variables

var searchBtn = $("#searchBtn")
var brewList= $("#brewList")
var userInput = $("#input")

searchBtn.on("click", function(event) {
    event.preventDefault()
    var brewInput = userInput.val();
    console.log(brewInput);
    listCreator(brewInput);
})


var listCreator = function(brewInput) {
var newBrew = $("<li>");
newBrew.text(brewInput);
brewList.append(newBrew);


    
}





// 





// // Define Variables

// const search = document.getElementById("search")
// const matchList = document.getElementById("match-list")
// var searchBtn = document.getElementById("searchBtn")
// var searchForm = document.getElementById('search-form')



// // // Pulls data for Atlanta breweries
// // var getBreweries = function () {
// //     var APIUrl = "https://api.openbrewerydb.org/breweries?by_city=" + # + "&per_page=50"

// //     fetch(APIUrl).then(function (response) {
// //         if (response.ok) {
// //             return response.json().then(function (data) {
// //                 console.log(data);
// //                 #PLACEHOLDER(data);
// //             })
// //         } else {
// //             alert("Error: " + response.status);
// //         }
// //     })
// // };


// // // getBreweries("atlanta");

// // citySearch.on("submit", getCityName)


// // Get Breweries Search Info

// function getSearch(e){
//     if (!search.value || search.value === '') {
//         alert("Choose a city please!");
//         return
//     }
//     e.preventDefault()
//     var searchText = search.value.trim();
//     console.log(searchText);
//     searchBrewery(searchText)
//     search.value = ''
// }

// console.log(search.name);


// const searchBrewery = async searchText => {
//     const res = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchText}`);
//     const breweries = await res.json();

//     console.log(breweries)

//     // Get matches to current text input (so it should change every time we type something)

//     let matches = breweries.filter(breweries => {
//         const regex = new RegExp(`^${searchText}`, 'gi');
//         return breweries.name.match(regex)
//     }); // Loop through an array and returns array based on condition (or multiple)

//     if(searchText.length === 0){
//         matches = [];
//         matchList.innerHTML = "";
//     }

//     console.log();
// }

// // Show Results in HTML
// const outputHtml = matches => {
//     if(matches.length > 0) {
//         const html = matches.map(match => `
//         <div class="card card-body mb-1">
//             <h4>${match.name}</h4>
//         </div>
//         `)
//         .join('');

//     matchList.innerHTML = html;

//     }
// }




    




// search.addEventListener("input", () => searchBrewery(search.value));




