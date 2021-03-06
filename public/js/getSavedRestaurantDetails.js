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
  var restaurantInfo = `
  <div class="container">
  <h5 class="text-center">${restaurantData.name}</h5>
      <div class="table-reponsive">
          <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th>Element</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
                  <tr>
                      <th>Restaurant Name</th>
                      <td>${restaurantData.name}</td>
                  </tr>
                  <tr>
                      <th>Restaurant Category</th>
                      <td>${restaurantData.categories[0].title}</td>
                  </tr>
                  <tr>
                      <th>Phone</th>
                      <td>${restaurantData.display_phone}</td>
                  </tr>
                  <tr>
                      <th>Rating</th>
                      <td>${restaurantData.rating}</td>
                  </tr>
                  <tr>
                      <th>Review Count</th>
                      <td>${restaurantData.review_count}</td>
                  </tr>
                  <tr>
                      <th>Adresse</th>
                      <td>${restaurantData.location.address1}</td>
                  </tr>
                  <tr>
                      <th>Zip Code</th>
                      <td>${restaurantData.location.zip_code}</td>
                  </tr>
                  <tr>
                      <th>City</th>
                      <td>${restaurantData.location.city}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
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
  var categories = `
  <div class="container">
        <h5>Our related Gif Selections</h5>
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