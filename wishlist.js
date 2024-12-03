$(document).ready(function() {
    $('#site-navbar').load('./navbar.html');
  });

console.log("test");
const wishlistArray = JSON.parse(localStorage.getItem("wishlistArray")) || [];
const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
// retrive arrays from local storage
console.log("Wishlist array: ", wishlistArray);
// Using the array from local storage
// dynamically populate the cart with items from the array
$(document).ready(function()
{
    
    // get the item parameters from the URL
    const parameters = new URLSearchParams(window.location.search);
    const itemId = parameters.get("item");
    wishlistArray.forEach((element) => {
        fetch("./items.json").then((response) =>
            response.json().then((json) => 
    {
            const item = (json.items[itemId])

              // assignes currentItem to item with id number
              // of current element's identifier number
            const currentItem = json.items[element]; 
            // DEBUG     
        $(".cartContainer").append(`
        
        <div id="cartItem">
            <div id="smallItemDisplay" class="cartSection">
                <img id="thumbnailImage" src="${currentItem.images}">
            </div>
            <div id="itemInfo" class="cartSection">
                <h3 id="itemTitle">${currentItem.title}</h3>
                <h4 id="itemPrice">$${currentItem.price}</h4>
            </div>
            <div id="itemActions" class="cartSection">
                <button onclick="removeItemFromCart(event)" class="itemDeleteButton btn-custom" data-index="${currentItem.id}" type="button">Delete</button>
                <button onclick="addItemToCart(event)" class="addItemToCartButton btn-custom" data-index="${currentItem.id}" type="button">Add to Cart</button>
            </div>
        </div>

        `)
    }));

});});

// function to remove an item from the cart
function removeItemFromCart(event)
{

    let item = event.target;
    console.log(item);
    let itemId = item.getAttribute('data-index');

    //DEBUG
    console.log(itemId);
    // loop through all items in wishlistArray
    wishlistArray.forEach((item, index) => {
        if (item == itemId) {
            // remove it from the list
            wishlistArray.splice(index, 1);
            localStorage.setItem("wishlistArray", JSON.stringify(wishlistArray));
            // DEBUG
            console.log("cart array", wishlistArray);
            // remove element
            $(document).find(`[data-index='${itemId}']`).closest("#cartItem").remove();
        }
    });
}


