var breweriesContainerEl = $("#breweries-container");
var cityInput = $("#city");
var stateInput = $("#state");
var locationSearch = $("#location-search");


// Formats user inputs to API's required formatting
var getLocationValues = function() {
    var city = cityInput.val().replace(".", "").replace(" ", "_");
    
    // Converts a state's abbreviation to the name
    var convertStateAbbr = function(stateCode) {
        var stateAbbr = stateCode.val().replace(" ", "").toUpperCase();
        
        var statesArray = [
            ['Arizona', 'AZ'],
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];
    
        for (i = 0; i < statesArray.length; i++) {
            if (statesArray[i][1] === stateAbbr) {
                return statesArray[i][0];
            }
        }
    }

    // Decides how to deal with state input value
    if (stateInput.val().length > 2) {
        var state = stateInput.val().replace(" ", "_");
    } else if (stateInput.val().length === 2) {
        var state = convertStateAbbr(stateInput);
    } else if (stateInput.val().length < 2) {
        breweriesContainerEl.text("Please enter a valid state name or abbreviation");
        return;
    }

    // Clears any old search results from the page
    breweriesContainerEl.empty();

    getBreweries(city, state)
};

// Pulls breweries for users chosen location
var getBreweries = function (cityValue, stateValue) {
    var APIUrl = `https://api.openbrewerydb.org/breweries?by_city=${cityValue}&by_state=${stateValue}&per_page=50`

    fetch(APIUrl).then(function (response) {
        if (response.ok) {
            return response.json().then(function (data) {
                console.log(data);
                displayBreweries(data);
                initMap(data);
            })
        } else {
            breweriesContainerEl.text("Error: " + response.status);
        }
    })
};

// Create elements with brewery information
var displayBreweries = function(data) {
    // If there are no breweries in that city alert the user
    if (data.length < 1) {
        breweriesContainerEl.text("No breweries in this city. Either double check your spelling or never visit this boring city.");
        return;
    }

    var header = $("<h1>");
    header.text(`Breweries in ${data[0].city}, ${data[0].state}`);
    header.addClass("breweries-list-header");
    breweriesContainerEl.append(header);

    // Creates elements to populate data onto the webpage
    for (i = 0; i < data.length; i++) {
        // Capitalizes strings
        var capitalize = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
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
        breweryType.text(`Type: ${capitalize(data[i].brewery_type)}`);

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
        breweryPhone.text(`PH: ${data[i].phone}`);

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

// Adds location data to the map
function initMap(data){

    // Creates an array of nested arrays with required data for setMarkers function
    var createArrays = function(data) {
        breweriesArray = []
    
        // Adds a nested array into breweriesArray for each brewery
        for (i = 0; i < data.length; i++) {
            var array = [data[i].name, data[i].latitude, data[i].longitude];
            breweriesArray.push(array);
        }
    }    
    
    // Creates markers for google maps with breweries that have lat and lon values
    var setMarkers = function(map) {

        for (let i = 0; i < breweriesArray.length; i++) {
            var brewName = breweriesArray[i][0];
            var brewLat = parseFloat(breweriesArray[i][1]);
            var brewLon = parseFloat(breweriesArray[i][2]);

            // If brewery has all 3 values requried then it creates a marker
            if (brewName !== null && brewLat !== null && brewLon !== null) {
                new google.maps.Marker({
                    position: { lat: brewLat, lng: brewLon },
                    map,
                    title: brewName,
                });
            }
        }
    }

    // Gets the first lon and lat value from a brewery to center the map around the city
    for (i = 0; i < data.length; i++) {
        if (data[i].latitude && data[i].longitude) {
            var cityLatitude = parseFloat(data[i].latitude);
            var cityLongitude = parseFloat(data[i].longitude);
            break;
        } 
    };

    createArrays(data);

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: cityLatitude, lng: cityLongitude},
      });
    
    setMarkers(map);
};


// Event listener for user inputs
locationSearch.on("submit", function (event) {
    event.preventDefault();

    if (cityInput.val() && stateInput.val()) {
        cityInput.val().toLowerCase();
        getLocationValues();
    } else {
        breweriesContainerEl.text("Please enter a city and state.");
    }
})

// Initialized page with ATL baby
getBreweries("Atlanta", "Georgia")