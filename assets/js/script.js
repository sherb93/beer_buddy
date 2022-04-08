// Declare Variables
var signinBtn = $("#signinBtn")
var usernameTextField = $("#exampleDropdownFormEmail1")
var usernameBox = $("#username")
var searchBtn = $("#searchBtn")
var brewList= $("#brewList")
var reviewList = $("#reviewList")
var userInput = $("#input")
var visitCount = $(".visitCount")

var bNameText = $("#bName")
var bReviewText = $("#bReview")


signinBtn.on("click", function(event) {
    localStorage.setItem("username", usernameTextField.val())
    document.location.href = "./breweries_visited.html";
    return false;
})

function loadBreweriesVisited() {
    var username = localStorage.getItem("username")
    usernameBox.text(username)
    localStorage.setItem("brewCounter", JSON.stringify(0))
}

function storeReview() {
    var brewCounterString = localStorage.getItem("brewCounter")
    var brewCounter = JSON.parse(brewCounterString)
    var localStorageBName = "bName" + brewCounter
    var localStorageBReview = "bReview" + brewCounter
    localStorage.setItem(localStorageBName, bNameText.val())
    localStorage.setItem(localStorageBReview, bReviewText.val())

    // Add to review list
    var rating = $('input[name="rate"]:checked').val()
    var newForm = $("<form>");
    for (var i = 0; i < rating; i++) {
        newForm.append("★")
    }
    newForm.append("Brewery Name: " + bNameText.val() + "<br>")
    newForm.append(bReviewText.val())
    reviewList.append(newForm)

    // Clear ReviewList inputs
    bNameText.val("")
    bReviewText.val("")
    $('input[name="rate"]').prop('checked', false);
}

// Pulls in form data
searchBtn.on("click", function(event) {
    event.preventDefault()
    var brewInput = userInput.val();
    console.log(brewInput);
    listCreator(brewInput);
    countBrew();
})

// Creates a list with the data 
var listCreator = function(brewInput) {
    var newBrew = $("<a>").addClass("newBrewery");
    newBrew.text(brewInput);
    brewList.append(newBrew);
}

// Count Up

var countBrew = function() {
    var brewCounterString = localStorage.getItem("brewCounter")
    var brewCounter = JSON.parse(brewCounterString)
    brewCounter++;
    localStorage.setItem("brewCounter", JSON.stringify(brewCounter))
    visitCount.text("Total Visited Breweries: " + brewCounter);
}

// var reviewListCreator = function() {
//     reviewList.prepend(
//         `
//         <form>
//             <div class="rate">
//                 <input type="radio" id="star5" name="rate" value="5" />
//                 <label for="star5" title="text">5 stars</label>
//                 <input type="radio" id="star4" name="rate" value="4" />
//                 <label for="star4" title="text">4 stars</label>
//                 <input type="radio" id="star3" name="rate" value="3" />
//                 <label for="star3" title="text">3 stars</label>
//                 <input type="radio" id="star2" name="rate" value="2" />
//                 <label for="star2" title="text">2 stars</label>
//                 <input type="radio" id="star1" name="rate" value="1" />
//                 <label for="star1" title="text">1 star</label>
//             </div>
//             <br><br>

//             <label for="bName">Brewery Name:</label>
//             <input type="text" id="bName" name="bName"><br>
//             <input type="text" id="bReview"><br>
//             <button type="button" onclick="storeReview()">Submit</button>
//         </form>
//         `
//     )
// }