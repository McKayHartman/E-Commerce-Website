const sortTypes = new Set(["default", "highPrice", "lowPrice", "lowRating", "highRating", "alphabetical"]);

$(document).ready(function() {
  $('#site-navbar').load('./navbar.html');
});

// fetch the items
fetch("./items.json").then((response) =>
  response.json().then((json) => {
    const items = (json.items)
    console.log(items);

    displayItems(items);


}));

function sortItems(sortType)
{
  console.log("sorting items!")
  fetch("./items.json").then((response) =>
    response.json().then((json) => {
      const items = (json.items)

      if (sortTypes.has(sortType))
      {
        switch(sortType)
        {
          case "default":
            items.sort((a, b) => a.id - b.id);
            break;
        
          case "highPrice":
            items.sort((a, b) => b.price - a.price);
            break;
  
          case "lowPrice":
            items.sort((a, b) => a.price - b.price);
            break;
  
          case "highRating":
            items.sort((a, b) => averageReview(b.reviews) - averageReview(a.reviews));
            break;
  
          case "lowRating":
            items.sort((a, b) =>  averageReview(a.reviews) - averageReview(b.reviews));
            break;
  
          case "alphabetical":
            items.sort((a, b) =>  a.title.localeCompare(b.title));
            break;
        }
        $("#itemgrid").empty();
        displayItems(items);
      }
      
      
  }));

}

function getStars(score)
{
    return ('⭐'.repeat(Math.floor(score)) + 
            ((Math.round(score % 1) >= 1) ? '½' : ''));
}

function averageReview(reviews)
{
    return ((reviews.map(review => review.score)
            .reduce((total, value) => total + value)) / reviews.length);
}

function displayItems(items)
{
  items.forEach((item, index) => {
    $("#itemgrid").append(`
        <div class="grid item card" style="width: 18rem;">
                <a href="${'./item.html?item=' + index}"><img class="card-img-top" style="height:18rem;" src="${item.images[0]}" alt="${item.title}"></a>
                <div class="card-body">
                  <a href="${'./item.html?item=' + index}" class="itemName">${item.title}</a>
                  <p class="card-text">$${item.price.toFixed(2)}</p>
                  <p class="card-text">${getStars(averageReview(item.reviews))}</p>
                </div>
            </div>
        `)
})
}

//create arrays in local storage
$(document).ready(function(){

  // Initalize the arrays
  if(!localStorage.getItem("cartArray")){
    // cart array will store cart objects that have
    // the unique itemId and a quantity
    localStorage.setItem("cartArray", JSON.stringify([]));
    console.log("cartArray initialized");
  }

  if(!localStorage.getItem("wishlistArray")){
    // wishlist array does not need quantity,
    // so it can be an array of id numbers
    localStorage.setItem("wishlistArray", JSON.stringify([]));
    console.log("wishlistArray initialzied");
  }
  
  // DEBUG
  const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
  const wishlistArray = JSON.parse(localStorage.getItem("wishlistArray")) || [];

  console.log("local storage checked");
  console.log("Cart array at home page:", cartArray);
  console.log("wishlist array at home page:", wishlistArray);
});

