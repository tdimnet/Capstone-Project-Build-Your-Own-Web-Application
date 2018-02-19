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
  console.log(businesses);
  var businessesList = '<ul class="businesses-list">';
  for (var i = 0; i < businesses.length; i++) {
    businessesList += `
      <div>
        <li class="business-name">${businesses[i].name}</li>
        <li class="business-price">${businesses[i].price}</li>
        <li class="business-rating">${businesses[i].rating}</li>
        <li class="business-is_closed">
            ${businesses[i].is_closed ? 'close' : 'open'}
        </li>
        <li class="business-link">
            <a href="/profile/restaurant/${businesses[i].id}">
                See more info about the restaurant
            </a>
          </li>
        <hr>
      </div>
    `;
  }
  businessesList += '</ul>';
  searchForm.insertAdjacentHTML('afterend', businessesList);
}


searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  if (verifyFields(searchInput.value, locationInput.value)) {
    getRestaurantInfos(searchInput.value, locationInput.value);
  }
});