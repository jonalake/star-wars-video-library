const ul = document.querySelector("ul")
const spinner = document.querySelector(".spinner")

fetch("https://swapi.dev/api/films")
    .then(response => response.json())
    .then(response => {
        let count = 0;
        const movieList = response.results
            .map(movie => {
                const movieListing = document.createElement("div")
                movieListing.classList = "movie-listing"
                movieListing.innerHTML = `
                    <a href="movie.html?movie=${++count}">${movie.title}</a>
                    <time>${movie.release_date.slice(0,4)}</time>
                `
                return movieListing
            }).forEach(movie => {
                ul.append(movie)
                spinner.classList.add("hidden")
            })
    })