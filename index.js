function stringifyParams(params) {
  const queryItems = Object.keys(params).map((key) => `${key}=${params[key]}`);
  return queryItems.join("&");
}

function getParks(state, max) {
  const headers = new Headers();
  headers.append("X-Api-Key", "JjbWiPzVs3m6MR0hxnBmyUaaVEFweH0SjS0u3yQK");

  const requestOptions = {
    method: "GET",
    // headers: headers,
    redirect: "follow",
    mode: "no-cors",
  };

  const params = {
    stateCode: state,
    limit: max,
    api_key: "JjbWiPzVs3m6MR0hxnBmyUaaVEFweH0SjS0u3yQK",
  };

  const paramString = stringifyParams(params);

  fetch("https://developer.nps.gov/api/v1/parks?" + paramString, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result));
  // .catch((error) => console.log("error", error));
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
