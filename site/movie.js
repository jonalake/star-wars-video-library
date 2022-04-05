const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const main = document.querySelector("main")
const spinner = document.querySelector(".spinner")

fetch(`https://swapi.dev/api/films/${queryString.get("movie")}`)
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })