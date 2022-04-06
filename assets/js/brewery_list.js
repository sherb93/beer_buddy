var APIUrl = "https://api.openbrewerydb.org/breweries?by_city=atlanta&per_page=50"
var breweriesContainerEl = $("#breweries-container");
var cityInput = $("#city");
var stateInput = $("#state");
var locationSearch = $("#location-search");

// Formats user inputs to API's required formatting
var getLocationValues = function() {
    var city = cityInput.val().replace(".", "").replace(" ", "_").toLowerCase();
    
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
        var state = stateInput.val().replace(" ", "_").toLowerCase();
    } else if (stateInput.val().length === 2) {
        var state = convertStateAbbr(stateInput);
    } else if (stateInput.val().length < 2) {
        alert("Please enter a valid state name or abbreviation");
        return;
    }

    // Clears any old search results from the page
    breweriesContainerEl.empty();

    getBreweries(city, state)
};

// Pulls breweries for users chosen location
var getBreweries = function (cityValue, stateValue) {
    console.log(cityValue, stateValue);
    var APIUrl = `https://api.openbrewerydb.org/breweries?by_city=${cityValue}&by_state=${stateValue}&per_page=50`

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
        breweriesContainerEl.text("No breweries in this city. Either double check your spelling or never visit this boring city.");
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


locationSearch.on("submit", function (event) {
    event.preventDefault();

    if (cityInput.val() && stateInput.val()) {
        cityInput.val().toLowerCase();
        getLocationValues();
    } else {
        alert("Please enter a city and state.");
    }
})