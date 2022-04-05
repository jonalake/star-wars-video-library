const ul = document.querySelector("ul")

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
                    <time>${movie.release_date}</time>
                `
                return movieListing
            }).forEach(movie => {
                ul.append(movie)
            })
    })