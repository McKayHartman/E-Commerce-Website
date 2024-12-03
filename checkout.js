$(document).ready(function() {
    $('#site-navbar').load('./navbar.html');
  });

$(document).ready(function(){
    $("#submitBtn").on(click, function(){
        localStorage.clear();
        cartTotal = 0;
        localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
        localStorage.setItem("wishlistArray", JSON.stringify([]));
        localStorage.setItem("cartTotal", JSON.stringify([]));
        
    })
});
$(document).ready(function(){
    const cartTotal = JSON.parse(localStorage.getItem("cartTotal"));
   $(".totalDisplay").append("<h2>Total: "+ cartTotal +"</h2>");
});