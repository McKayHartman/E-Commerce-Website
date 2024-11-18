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

function getStars(score)
{
    return ('⭐'.repeat(Math.floor(score)) + 
            ((Math.round(score % 1) >= 1) ? '½' : ''));
}