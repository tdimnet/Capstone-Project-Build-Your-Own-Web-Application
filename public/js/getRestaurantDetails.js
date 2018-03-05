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
      initMap(data.coordinates.latitude, data.coordinates.longitude)
  }).catch(error => alert(error))
}

function getCategoriesGifs(categories) {
  var alias = categories[0].alias;
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var url = `https://api.giphy.com/v1/gifs/search?api_key=Z5WMwvBFVx8W0k3ZsaURnmM9EYFkslC3&q=${alias}&limit=5`;
  fetch(proxyUrl + url).then(response => response.json()).then(data => displayCategoriesGifs(data.data))
}

function displayRestaurantInfo(restaurantData) {
  var restaurantInfo = `
    <div class="container">
        <h5>Restaurant ${restaurantData.name}</h5>
      <form method="post">
          <div class="form-group">
            <label for="nickName">Restaurant NickName</label>
            <input
                class="form-control"
                id="nickName"
                type="text"
                placeholder="e.g. My Favorite Pizza"
                name='nickName'
            />
          </div>
          <input
              type='hidden'
              value=${restaurantData.id}
              name='restaurantName'
          />
          <input
              type='hidden'
              value=${restaurantData.categories[0].alias}
              name='restaurantType'
          />
          <input
              type='hidden'
              value=${restaurantData.location.city}
              name='city'
          />
          <input
              class="btn btn-primary"
              type='submit'
              value='save restaurant'
          />
      </form>
    </div>
  `;
  restaurantDetails.innerHTML = restaurantInfo;
}


function displayCategoriesGifs(categoriesGifs) {
  var categories = `
    <div class="container">
        <h5>Our Gif Selections</h5>
        <ul class="list-inline">
    `;
    for (var i = 0; i < 3; i++) {
      categories += `
          <li class="list-inline-item">
              <iframe src="${categoriesGifs[i].embed_url}" frameBorder="0">
              </iframe>
          </li>
      `;
    }
  categories += '</ul></div>';
  restaurantDetails.insertAdjacentHTML('afterend', categories);
}

window.onload = function() {
  var restaurantId = window.location.href.slice(41);
  getRestaurantDetails(restaurantId);
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