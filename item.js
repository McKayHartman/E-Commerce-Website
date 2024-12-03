$(document).ready(function() {
  $('#site-navbar').load('./navbar.html');
  // get the item parameters from the URL
  const parameters = new URLSearchParams(window.location.search);
  const itemId = parameters.get("item");
  fetch("./items.json").then((response) =>
    response.json().then((json) => {
      const item = (json.items[itemId])
      console.log(item);

      // fill in the HTML with the json object
      $("#title").html(item.title);
      $("#description").html(item.description);
      $("#mainImage").attr( "src", item.images[0]);
      $("#price").html(`\$${item.price}`);

      // fill in each review
      item.reviews.forEach((review) => {
          $("#reviews").append(`
              <div class="card">
                      <div class="card-header">
                          ${review.username}
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">${getStars(review.score)}</h5>
                        <p class="card-text">${review.review}</p>
                      </div>
              </div>`)
      });




    }));

});



function getStars(score)
{
    return ('⭐'.repeat(Math.floor(score)) + 
            ((Math.round(score % 1) >= 1) ? '½' : ''));
}

// constructor function to create an cart item that
// stores the item and its quantity;
// later used to add them to an array of items
function cartItem(identifier)
{
  this.identifier = identifier;
  this.quantity = 1;
}


// function that adds an item to the locally
// stored cartArray
function addToCart(item)
{
  const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
  // add the item to the array
  cartArray.push(new cartItem(item));
  // store the array back in local storage
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  // DEBUG
  console.log("added item to cart array")
  console.log("Cart array: ", cartArray);
}

// add event listener
$(document).ready(function(){
  $('#addToCartBtn').on('click', function()
  {
    const parameters = new URLSearchParams(window.location.search);
    const itemId = parameters.get("item");

    addToCart(itemId);
    
  });
});

// function that adds an item to the
// locally stored wishlistArray
function addToWishlist(item)
{
  const wishlistArray = JSON.parse(localStorage.getItem("wishlistArray")) || [];

  // add the item to the array
  wishlistArray.push(item);
  // store the array
  localStorage.setItem("wishlistArray", JSON.stringify(wishlistArray));
  // DEBUG
  console.log("added item to wishlist array");
  console.log("Wishlist array: ", wishlistArray);
}

// add event listener
$(document).ready(function(){
  $('#addToWishlistBtn').on('click', function()
  {
    const parameters = new URLSearchParams(window.location.search);
    const itemId = parameters.get("item");
    addToWishlist(itemId);
  });
});

