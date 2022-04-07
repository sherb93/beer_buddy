// Declare Variables

var searchBtn = $("#searchBtn")
var brewList= $("#brewList")
var userInput = $("#input")
var visitCount = $(".visitCount")
var brewCounter = 0

// Pulls in form data
searchBtn.on("click", function(event) {
    event.preventDefault()
    var brewInput = userInput.val();
    console.log(brewInput);
    listCreator(brewInput);
    countBrew(brewCounter);
})

// Creates a list with the data 
var listCreator = function(brewInput) {
var newBrew = $("<a>").addClass("newBrewery");
newBrew.text(brewInput);
brewList.append(newBrew);

   
}

// Count Up

var countBrew = function() {
    brewCounter++;
    visitCount.text("Total Visited Breweries: " + brewCounter);
}
