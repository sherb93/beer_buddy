var APIUrl = "https://api.openbrewerydb.org/breweries?by_city=atlanta&per_page=50"
var breweriesContainerEl = $("#breweries-container");
var cityNameInput = $("#city-name");
var citySearch = $("#city-search");

console.log(cityNameInput);

var getCityName = function(event) {
    event.preventDefault();

    var cityName = cityNameInput.val();

    if (cityName) {
        getBreweries(cityName);
    } else {
        alert("Please enter a valid US city");
    }
};


// Pulls data for Atlanta breweries
var getBreweries = function (location) {
    var APIUrl = "https://api.openbrewerydb.org/breweries?by_city=" + location + "&per_page=50"

    fetch(APIUrl).then(function (response) {
        if (response.ok) {
            return response.json().then(function (data) {
                console.log(data);
                displayBreweries(data);
            })
        } else {
            alert("Error: " + response.status);
        }
    })
};

//create
var displayBreweries = function(data) {
    // If there are no breweries in that city alert the user
    if (data.length < 1) {
        breweriesContainerEl.text("No breweries in this city. Maybe you shouldn't go here...");
        return;
    }

    for (i = 0; i < data.length; i++) {
        // Create main elements
        var blockEl = $("<div>");
        var infoEl = $("<span>");
        var addressEl = $("<span>");

        // Create left side info
        var breweryName = $("<a>");
        var breweryType = $("<p>");

        // Fill left side info with data
        breweryName.text(data[i].name);
        if (data[i].website_url) {
            breweryName.attr("href", data[i].website_url);
        };
        breweryType.text(`Type: ${data[i].brewery_type}`);

        // Attach left side info
        infoEl.append(breweryName);
        infoEl.append(breweryType);

        // Create right side info
        var breweryStreet = $("<p>");
        var breweryCSZ = $("<p>");
        var breweryPhone = $("<a>");

        // Fill right side info with data
        breweryStreet.text(data[i].street);
        breweryCSZ.text(`${data[i].city}, ${data[i].state}, ${data[i].postal_code}`);
        breweryPhone.text(data[i].phone);

        // Attach right side info
        addressEl.append(breweryStreet);
        addressEl.append(breweryCSZ);
        addressEl.append(breweryPhone);

        blockEl.addClass( ["brewery-block", "bg-dark", "d-flex", "justify-content-between", "text-light"] )
        // Attach right and left elements to blockEl
        blockEl.append(infoEl);
        blockEl.append(addressEl);

        // Attach blockEl to the corresponding container
        breweriesContainerEl.append(blockEl);

    };
}

// getBreweries("atlanta");

citySearch.on("submit", getCityName)