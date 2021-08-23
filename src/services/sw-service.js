const axios = require("axios");

export async function loadPerson(id) {
    return await axios.get("https://swapi.dev/api/people/" + id);
}

export async function loadPlanet(id) {
    return await axios.get("https://swapi.dev/api/planets/" + id);
}

export async function loadStarship(id) {
    return await axios.get("https://swapi.dev/api/starships/" + id);
}


