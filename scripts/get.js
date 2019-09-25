function get(url, cb) {
    fetch(url)
    .then((res) => res.json())
    .then((json) => cb(json))
    .catch((error) => error)
}