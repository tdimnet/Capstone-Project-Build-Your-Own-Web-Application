var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var locationInput = document.querySelector('#location-input');

function verifyFields(searchInputText, locationInputText) {
  return searchInputText.length !== 0 && locationInputText.length !== 0;
}

function getRestaurantInfo(searchInputText, locationInputText) {
  return fetch(`https://api.yelp.com/v3/businesses/search?term=${searchInputText}&longitude=-${locationInputText}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer SwVspw3I5otouzM3D6E7pBlhLkQK6lxI01wtE7WUjlu4dcSdXSAXdxAXwIpfPOy1gte76m_94kyWBwjCIYHC4GfKX-iSmmYYkfUKbKndh8_WFm82jT1a7SualN-HWnYx'
    }
  }).then(response => console.log(response)).catch(error => console.log(error))
}


searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  if (verifyFields(searchInput.value, locationInput.value)) {
    getRestaurantInfo(searchInput.value, locationInput.value);
  }
});