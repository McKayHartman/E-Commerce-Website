const sortTypes = new Set(["default", "highPrice", "lowPrice", "lowRating", "highRating", "alphabetical"]);
const parameters = new URLSearchParams(window.location.search);
const page = parameters.has("page") ? parameters.get("page") : 1;
console.log("page: " + page);
const itemsPerPage = 8;

$(document).ready(function() {
  $('#site-navbar').load('./navbar.html');
});

// fetch the items
fetch("./items.json").then((response) =>
  response.json().then((json) => {
    const items = (json.items)
    console.log(items);

    if(parameters.get("sort"))
    {
      switch(parameters.get("sort"))
        {
          case "default":
            items.sort((a, b) => a.id - b.id);
            break;
        
          case "highPrice":
            items.sort((a, b) => b.price - a.price);
            break;
  
          case "lowPrice":
            items.sort((a, b) => a.price - b.price);
            break;
  
          case "highRating":
            items.sort((a, b) => averageReview(b.reviews) - averageReview(a.reviews));
            break;
  
          case "lowRating":
            items.sort((a, b) =>  averageReview(a.reviews) - averageReview(b.reviews));
            break;
  
          case "alphabetical":
            items.sort((a, b) =>  a.title.localeCompare(b.title));
            break;
        }
    }

    displayItems(items);

    // get page number buttons
    for (i = Math.max(page - 3, 1); i < Math.min(page + 3, (Math.ceil((items.length) / 8))); i++)
    {
      $("#page-number-buttons").append(`<button class='btn btn-light mx-1' onclick='jumpToPage(${i})'>${i}</button>`);
    }
    $("#page-number-buttons").append(`<button class='btn btn-light mx-1' onclick='jumpToPage(${Math.ceil((items.length) / 8)})'>${Math.ceil((items.length) / 8)}</button>`);
    

}));

function sortItems(sortType)
{
  window.location.replace(window.location.href.split('/')[0] + `/?sort=${sortType}`);
      
}

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

function displayItems(items)
{
  items.slice(itemsPerPage * (page - 1), itemsPerPage * (page))
    .forEach((item) => {
      $("#itemgrid").append(`
          <div class="grid item card" style="width: 18rem;">
                  <a href="${'./item.html?item=' + item.id}"><img class="card-img-top" style="height:18rem; transition: transform 1s;" src="${item.images[0]}" alt="${item.title}"></a>
                  <div class="card-body">
                    <a href="${'./item.html?item=' + item.id}" class="itemName">${item.title}</a>
                    <p class="card-text">$${item.price.toFixed(2)}</p>
                    <p class="card-text">${getStars(averageReview(item.reviews))}</p>
                  </div>
              </div>
          `)
})}

function nextPage()
{
  fetch("./items.json").then((response) =>
    response.json().then((json) => {
      const items = (json.items)
      if (page <= Math.floor((items.length) / 8))
      {
          window.location.replace(window.location.href.split('/')[0] + '?' +
            `sort=${parameters.get('sort') ?? 'default'}&` +
            `page=${(parseInt(page) + 1)}`)
      }
  }));
}

function prevPage()
{
  if (page > 1)
    {
        window.location.replace(window.location.href.split('/')[0] + '?' +
          `sort=${parameters.get('sort') ?? 'default'}&` +
          `page=${(parseInt(page) - 1)}`)
    }
}

function jumpToPage(location)
{
  window.location.replace(window.location.href.split('/')[0] + '?' +
    `sort=${parameters.get('sort') ?? 'default'}&` +
    `page=${location}`)
}

//create arrays in local storage
$(document).ready(function(){

  // Initalize the arrays
  if(!localStorage.getItem("cartArray")){
    // cart array will store cart objects that have
    // the unique itemId and a quantity
    localStorage.setItem("cartArray", JSON.stringify([]));
    console.log("cartArray initialized");
  }

  if(!localStorage.getItem("wishlistArray")){
    // wishlist array does not need quantity,
    // so it can be an array of id numbers
    localStorage.setItem("wishlistArray", JSON.stringify([]));
    console.log("wishlistArray initialzied");
  }
  // init cart total
  if(!localStorage.getItem("cartTotal")){
    localStorage.setItem("cartTotal", JSON.stringify([]));
  }
  
  // DEBUG
  const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
  const wishlistArray = JSON.parse(localStorage.getItem("wishlistArray")) || [];

  console.log("local storage checked");
  console.log("Cart array at home page:", cartArray);
  console.log("wishlist array at home page:", wishlistArray);
});

