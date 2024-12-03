$(document).ready(function() {
    $('#site-navbar').load('./navbar.html');
  });

// Retrieve the cart array from local storage
$(document).ready(function(){
    let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
})

// retrive arrays from local storage
const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
const wishlistArray = JSON.parse(localStorage.getItem("wishlistArray")) || [];

// Using the array from local storage,
// dynamically populate the cart with items from the array
$(document).ready(function(){cartArray.forEach(function(item)
{
    console.log("test");
    console.log(item);
});
});
