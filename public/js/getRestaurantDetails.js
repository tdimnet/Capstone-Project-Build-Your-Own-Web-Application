var restaurantDetails = document.querySelector('#restaurant-details');

function getRestaurantDetails(restaurantId) {
  var proxyurl = "https://cors-anywhere.herokuapp.com/";
  var url = `https://api.yelp.com/v3/businesses/${restaurantId}`;

  var headers = new Headers();
  headers.append('Authorization', 'Bearer SwVspw3I5otouzM3D6E7pBlhLkQK6lxI01wtE7WUjlu4dcSdXSAXdxAXwIpfPOy1gte76m_94kyWBwjCIYHC4GfKX-iSmmYYkfUKbKndh8_WFm82jT1a7SualN-HWnYx');

  return fetch(
    proxyurl + url,
    {
      method: 'GET',
      headers: headers
    }
  )
    .then(response => response.json())
    .then(data => displayRestaurantInfo(data))
    .catch(error => alert(error))
}

function displayRestaurantInfo(restaurantData) {
  console.log(restaurantData)
  var restaurantInfo = `
    <ul>
        <li>${restaurantData.name}</li>
    </ul>
  `;

  restaurantDetails.innerHTML = restaurantInfo;

}

window.onload = function() {
  var restaurantId = window.location.href.slice(41);
  getRestaurantDetails(restaurantId);
}