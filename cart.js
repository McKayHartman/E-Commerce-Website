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
let cartTotal = 0.0;
let jsonItems;

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
                <img class="cart-item-image" src="${currentItem.images}">
            </div>
            <div id="itemInfo" class="cartSection">
                <h3 id="itemTitle">${currentItem.title}</h3>
                <h4 id="itemPrice">$${currentItem.price}</h4>
                <p id="itemQuantity">Quantity: ${element.quantity}</p>
            </div>
            <div class="d-flex">
                <div id="itemActions" class="cartSection col">
                    <button onclick="removeItemFromCart(event)" class="itemDeleteButton btn btn-custom w-100 mb-2" style="cursor: url(cursors/skull/frame1.png), auto; animation: skull 800ms infinite;" data-index="${currentItem.id}" type="button">Delete</button>
                    <div class="w-100"></div>
                    <div class="d-flex">
                        <button onclick="increaseQuantity(event)" class="itemIncreaseQuantityButton btn btn-custom flex-grow-1 mr-1 buy-button" data-index="${currentItem.id}" type="button">+1</button>
                        <button onclick="decreaseQuantity(event)" class="itemDecreaseQuanitityButton btn btn-custom flex-grow-1 ml-1" data-index="${currentItem.id}" style="cursor: url(cursors/skull/frame1.png), auto; animation: skull 800ms infinite;" type="button">-1</button>
                    </div>
                </div>
                <div class="col cartSection">
                    <h4>${'$' + (currentItem.price * element.quantity).toFixed(2)}</h4>
                </div>
            </div>
        </div>

        `)
        console.log("currentItem.price", currentItem.price, "* element.quantity: ", element.quantity);
        cartTotal += parseFloat(currentItem.price) * element.quantity;
        localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    })).then(()=> $("#cartTotal").html(cartTotal.toFixed(2)));
        

});});
// add total to end
$(document).ready(function()
{
    console.log("cartTotal: ", cartTotal);
});

// function to remove an item from the cart
function removeItemFromCart(event)
{

    fetch("./items.json").then((response) =>
        response.json().then((json) => {
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
                    localStorage.setItem("cartArray", JSON.stringify(cartArray));
                    // DEBUG
                    console.log("cart array", cartArray);
                    // remove element
                    $(document).find(`[data-index='${itemId}']`).closest("#cartItem").remove();
                }
            })
            $("#cartTotal").html(`Total: ${cartArray.reduce(
                (count, current) => count += json.items[current.identifier].price, 0)}`);
        } ))

    
}
// event listener
$(document).ready(function(){
    $(".itemDeleteButton").on("click", function(){
        console.log("hello");
});
});

function increaseQuantity(event){
    let item = event.target;

    let itemId = item.getAttribute('data-index');
    console.log(itemId);
    cartArray.forEach((item) => {
        console.log("test");
        if(item.identifier == itemId){
        // increase quantity
        item.quantity++;
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
        console.log("Item quantity: ", item.quantity);
        // update page
        $(document).find(`[data-index='${itemId}']`).parent("#itemInfo").children("#itemQuantity").html("Quantity: " + item.quantity);
        }
        location.reload();
        
    });
}
function decreaseQuantity(event){
    let item = event.target;

    let itemId = item.getAttribute('data-index');
    console.log(itemId);
    cartArray.forEach((item) => {
        console.log("test");
        if(item.identifier == itemId){
        // if item quantity is 1
        if (item.quantity == 1)
        {
            // return
            return;
        }
        // decrease quantity
        item.quantity--;
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
        console.log("Item quantity: ", item.quantity);
        // update page
        $(document).find(`[data-index='${itemId}']`).parent("#itemInfo").children("#itemQuantity").html("Quantity: " + item.quantity);
        }
        location.reload();
        
    });
}

