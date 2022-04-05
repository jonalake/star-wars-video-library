const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const main = document.querySelector("main")
const spinner = document.querySelector(".spinner")

fetch(`https://swapi.dev/api/films/${queryString.get("movie")}`)
    .then(response => response.json())
    .then(response => {
        main.classList.add("movie_detail")
        const title = document.querySelector("title")
        title.textContent = response.title
        const movieDetail = document.createElement("div")
        movieDetail.classList.add("movie")
        movieDetail.innerHTML = `
            <img class="poster" src="" />
            <a href="movie.html?movie=${queryString.get("movie")}">${response.title}</a>
            <p>${response.opening_crawl}</p>
            <h2>Characters</h2>
            <ul class="characters">
        `
        if (response.title === "A New Hope") {
            fetch(`http://www.omdbapi.com/?t=Star+Wars&apikey=cba21048`)
                .then(response => response.json())
                .then(response => {
                    const poster = document.querySelector(".poster")
                    poster.src = `${response.Poster}`
                })
        } else {
            fetch(`http://www.omdbapi.com/?t=${response.title}&apikey=cba21048`)
                .then(response => response.json())
                .then(response => {
                    const poster = document.querySelector(".poster")
                    poster.src = `${response.Poster}`
                })
        }
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
            spinner.classList.add("hidden")
        })
    })
