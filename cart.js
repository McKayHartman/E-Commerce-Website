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
$(document).ready(function()
{
    // get the item parameters from the URL
    const parameters = new URLSearchParams(window.location.search);
    const itemId = parameters.get("item");
    let i = 0;
    cartArray.forEach((element) => {
        fetch("./items.json").then((response) =>
            response.json().then((json) => 
    {
            const item = (json.items[itemId])

              // assignes currentItem to item with id number
              // of current element's identifier number
            const currentItem = json.items[element.identifier]; 
            // DEBUG     
        $(".cartContainer").append(`

        <div id="cartItem">
            <div id="smallItemDisplay" class="cartSection">
                <img id="thumbnailImage" src="${currentItem.images}">
            </div>
            <div id="itemInfo" class="cartSection">
                <h3 id="itemTitle">${currentItem.title}</h3>
                <h4 id="itemPrice">$${currentItem.price}</h4>
                <p id="itemQuantity">Quantity: ${element.quantity}</p>
            </div>
            <div id="itemActions" class="cartSection">
                <button onclick="removeItemFromCart(event)" class="itemDeleteButton" data-index="${currentItem.id}" type="button">Delete</button>
                <button class="itemIncreaseQuantityButton btn" type="button">+1</button>
                <button class="itemDecreaseQuanitityButton btn" type="button">-1</button>
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
    // loop through all items in cartArray
    cartArray.forEach((item, index) => {
        if (item.identifier == itemId) {
            // remove it from the list
            cartArray.splice(index, 1);
            // DEBUG
            console.log("cart array", cartArray);
            // remove element
            $(document).find(`[data-index='${itemId}']`).closest("#cartItem").remove();
        }
    });
}
// event listener
$(document).ready(function(){
    $(".itemDeleteButton").on("click", function(){
        console.log("hello");
});
});
// // event listener
// $(document).ready(function(){
//     $("#itemDeleteButton").on("click", console.log(this));

//     $("#itemDeleteButton").on("click", removeItemFromCart(this.data-index));
//     console.log("*******");
// });

