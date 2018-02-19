var restaurantDetails = document.querySelector('#restaurant-details');

function getRestaurantDetails(restaurantId) {
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var url = `https://api.yelp.com/v3/businesses/${restaurantId}`;

  var headers = new Headers();
  headers.append('Authorization', 'Bearer SwVspw3I5otouzM3D6E7pBlhLkQK6lxI01wtE7WUjlu4dcSdXSAXdxAXwIpfPOy1gte76m_94kyWBwjCIYHC4GfKX-iSmmYYkfUKbKndh8_WFm82jT1a7SualN-HWnYx');

  return fetch(
    proxyUrl + url,
    {
      method: 'GET',
      headers: headers
    }
  )
    .then(response => response.json())
    .then(data => {
      getCategoriesGifs(data.categories)
      displayRestaurantInfo(data)
  }).catch(error => alert(error))
}

function getCategoriesGifs(data) {
  var alias = data[0].alias;
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var url = `https://api.giphy.com/v1/gifs/search?api_key=Z5WMwvBFVx8W0k3ZsaURnmM9EYFkslC3&q=${alias}&limit=5`;
  fetch(proxyUrl + url).then(response => response.json()).then(data => displayCategoriesGifs(data.data))
}

function displayRestaurantInfo(restaurantData) {
  var restaurantInfo = `
    <ul>
        <li>${restaurantData.name}</li>
    </ul>
  `;
  restaurantDetails.innerHTML = restaurantInfo;
}


function displayCategoriesGifs(categoriesGifs) {
  var categories = '<ul>';
  for (var i = 0; i < categoriesGifs.length; i++) {
    categories += `<li><iframe src="${categoriesGifs[i].embed_url}" width="400" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></li>`;
  }
  categories += '</ul>';
  restaurantDetails.insertAdjacentHTML('afterend', categories);
}

window.onload = function() {
  var restaurantId = window.location.href.slice(41);
  getRestaurantDetails(restaurantId);
}