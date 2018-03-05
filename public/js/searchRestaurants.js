var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var locationInput = document.querySelector('#location-input');

function verifyFields(searchInputText, locationInputText) {
  return searchInputText.length !== 0 && locationInputText.length !== 0;
}

function getRestaurantInfos(searchInputText, locationInputText) {
  var proxyurl = "https://cors-anywhere.herokuapp.com/";
  var url = `https://api.yelp.com/v3/businesses/search?term=${searchInputText}&location=-${locationInputText}`;

  var headers = new Headers();
  headers.append('Authorization', 'Bearer SwVspw3I5otouzM3D6E7pBlhLkQK6lxI01wtE7WUjlu4dcSdXSAXdxAXwIpfPOy1gte76m_94kyWBwjCIYHC4GfKX-iSmmYYkfUKbKndh8_WFm82jT1a7SualN-HWnYx');


  return fetch(
    proxyurl + url,
    { method: 'GET', headers: headers })
      .then(response => response.json())
      .then(data => displayBusinesses(data.businesses))
      .catch(error => alert(error))
}

function displayBusinesses(businesses) {
  var businessesList = `
    <div class="container table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                  <th>#</th>
                  <th>Restaurant Name</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>See Restaurant Details</th>
                </tr>
            </thead>
            <tbody>
  `;
  for (var i = 0; i < businesses.length; i++) {
    businessesList += `
      <tr>
        <td>${i + 1}</td>
        <td>${businesses[i].name}</td>
        <td>${businesses[i].price}</td>
        <td>${businesses[i].rating}</td>
        <td>
            ${businesses[i].is_closed ? 'close' : 'open'}
        </td>
        <td>
            <a 
                class="btn btn-outline-primary" 
                href="/profile/restaurant/${businesses[i].id}"
            >
                See more info about the restaurant
            </a>
          </td>
      </tr>
    `;
  }
  businessesList += `
        </tbody>
    </table>
  </div>
  `;
  searchForm.insertAdjacentHTML('afterend', businessesList);
}


searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  if (verifyFields(searchInput.value, locationInput.value)) {
    getRestaurantInfos(searchInput.value, locationInput.value);
  }
});