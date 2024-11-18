// fetch the items
fetch("./items.json").then((response) =>
  response.json().then((json) => {
    const items = (json.items)
    console.log(items);

    items.forEach((item, index) => {
        $("#itemgrid").append(`
            <div class="grid item card" style="width: 18rem;">
                    <img class="card-img-top" src="${item.images[0]}" alt="${item.title}">
                    <div class="card-body">
                      <a href="${'./item.html?item=' + index}" class="card-link">${item.title}</a>
                      <p class="card-text">Item Price</p>
                      <p class="card-text">${getStars(averageReview(item.reviews))}</p>
                    </div>
                </div>
            `)
    })




  }));

function getStars(score)
{
    return ('⭐'.repeat(Math.floor(score)) + 
            ((Math.ceil(score % 1) >= 1) ? '½' : ''));
}

function averageReview(reviews)
{
    return ((reviews.map(review => review.score)
            .reduce((total, value) => total + value)) / reviews.length);
}