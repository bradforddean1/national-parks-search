function parseAddress(addresses) {
  const address = `${addresses[0].line1}, ${addresses[0].city}, ${addresses[0].stateCode}  ${addresses[0].postalCode}`;
  return address;
}

function displayResult(responseJson) {
  console.log(responseJson);

  $("#js-results").empty();

  const html = [];

  html.push("<ul>");
  for (data of responseJson.data) {
    html.push("<li>");
    html.push(data.name + ": ");
    html.push(data.description + " ");
    html.push("Website: " + data.url + ", ");

    html.push("Address: " + parseAddress(data.addresses));
    html.push("</li>");
  }
  html.push("</ul>");

  $("#js-results").html(html.join(""));
}

function stringifyParams(params) {
  const queryItems = Object.keys(params).map((key) => `${key}=${params[key]}`);
  return queryItems.join("&");
}

function getParks(state, max) {
  const params = {
    stateCode: state,
    limit: max,
    api_key: "JjbWiPzVs3m6MR0hxnBmyUaaVEFweH0SjS0u3yQK",
  };

  const paramString = stringifyParams(params);

  fetch("https://developer.nps.gov/api/v1/parks?" + paramString)
    .then((response) => response.json())
    .then((result) => displayResult(result))
    .catch((error) => console.log("error", error));
}

function watchSubmit() {
  $("#js-get-parks").submit(function (e) {
    e.preventDefault();
    const max = $("#js-max-results").val();
    const state = $("#js-state").val();
    getParks(state, max);
  });
}

$(watchSubmit);
