$(document).ready(function() {
  $('#site-navbar').load('./navbar.html');
});

// fetch the items
fetch("./items.json").then((response) =>
  response.json().then((json) => {
    const items = (json.items)
    console.log(items);

    //
    items.forEach((item, index) => {
        $("#itemgrid").append(`
            <div class="grid item card" style="width: 18rem;">
                    <a href="${'./item.html?item=' + index}"><img class="card-img-top" style="height:18rem;" src="${item.images[0]}" alt="${item.title}"></a>
                    <div class="card-body">
                      <a href="${'./item.html?item=' + index}" class="card-link">${item.title}</a>
                      <p class="card-text">$${item.price.toFixed(2)}</p>
                      <p class="card-text">${getStars(averageReview(item.reviews))}</p>
                    </div>
                </div>
            `)
    })




  }));

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