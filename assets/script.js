var APIUrl = "https://api.openbrewerydb.org/breweries?by_city=atlanta&per_page=50"

//Pulls data for Atlanta breweries
var getBreweries = function (location) {
    var APIUrl = "https://api.openbrewerydb.org/breweries?by_city=" + location + "&per_page=50"

    fetch(APIUrl).then(function (response) {
        if (response.ok) {
            return response.json().then(function (data) {
                console.log(data);
                // displayBreweries();
            })
        } else {
            alert("Error: " + response.status);
        }
    })
};

//create
var displayBreweries = function() {

}

getBreweries("atlanta");