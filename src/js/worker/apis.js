const APIURL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'

function getJSON(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300 && xhr.response) {
      cb(null, xhr.response);
    } else {
      cb(new Error('failed to load api'))
    }
  };
  xhr.send();
}

export function fetchQuakes(minmagniture) {
  return new Promise((resolve, reject) => {
    let currentDay = new Date();
    let previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1)

    getJSON(
      `${APIURL}&starttime=${previousMonth.toDateString()}&endtime=${currentDay.toDateString()}&minmagnitude=${minmagniture}`,
      (err, result) => {
        if (err) return reject(err)

        resolve(result)
      }
    )
  })
}

export function searchQuakes(query) {
  return new Promise((resolve, reject) => {
    const magnitude = query.magnitude;
    const minDate = query.mindate;
    const maxDate = query.maxdate;

    getJSON(
      `${APIURL}&starttime=${minDate}&endtime=${maxDate}&minmagnitude=${magnitude}`,
      (err, result) => {
        if (err) return reject(err)

        resolve(result)
      }
    )
  })
}
