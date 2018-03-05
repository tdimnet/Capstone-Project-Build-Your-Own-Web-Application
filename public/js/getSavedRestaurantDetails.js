var restaurantDetails = document.querySelector('#restaurant-saved');

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
      getCategoriesGifs(data.categories);
      displayRestaurantInfo(data);
      initMap(data.coordinates.latitude, data.coordinates.longitude);
    })
    .catch(error => alert(error))
}

function displayRestaurantInfo(restaurantData) {
  console.log(restaurantData)
  var restaurantInfo = `
    <ul>
        <li>${restaurantData.name}</li>
    </ul>
    <hr>
  `;
  restaurantDetails.innerHTML = restaurantInfo;
}

function getCategoriesGifs(categories) {
  var alias = categories[0].alias;
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var url = `https://api.giphy.com/v1/gifs/search?api_key=Z5WMwvBFVx8W0k3ZsaURnmM9EYFkslC3&q=${alias}&limit=5`;
  fetch(proxyUrl + url).then(response => response.json()).then(data => displayCategoriesGifs(data.data))
}

function displayCategoriesGifs(categoriesGifs) {
  var categories = '<ul>';
  for (var i = 0; i < categoriesGifs.length; i++) {
    categories += `<li><iframe src="${categoriesGifs[i].embed_url}" width="400" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></li>`;
  }
  categories += '</ul>';
  restaurantDetails.insertAdjacentHTML('afterend', categories);
}

function initMap(lat, lng) {
  var uluru = {lat: lat, lng: lng};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

window.onload = function() {
  var restaurantId = window.location.href.slice(47);
  console.log(restaurantId)
  getRestaurantDetails(restaurantId);
}