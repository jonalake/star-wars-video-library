const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const main = document.querySelector("main")
const spinner = document.querySelector(".spinner")

fetch(`https://swapi.dev/api/films/${queryString.get("movie")}`)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        const title = document.querySelector("title")
        title.textContent = response.title
        const movieDetail = document.createElement("div")
        movieDetail.classList.add("movie")
        movieDetail.innerHTML = `
            <a href="movie.html?movie=${queryString.get("movie")}">${response.title}</a>
            <time>${response.release_date.slice(0,4)}</time>
            <h2>Opening Crawl</h2>
            <p>${response.opening_crawl}</p>
            <h2>Characters</h2>
            <ul class="characters">
        `
        main.append(movieDetail)
        const characters = response.characters.map(character => {
            return fetch(character).then(response => response.json())
        })
        return Promise.all(characters)
    })
    .then(responses => {
        const ul = document.querySelector("ul")
        responses.forEach(response => {
            const li = document.createElement("li")
            li.textContent = `${response.name}`
            ul.append(li)
        })
    })
