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
            <p>${review.username}</p>
            <p>${review.review}</p>
            <p>${getStars(review.score)}</p>`)
    });




  }));

function getStars(score)
{
    return ('⭐'.repeat(Math.floor(score)) + 
            ((Math.ceil(score % 1) >= 1) ? '½' : ''));
}