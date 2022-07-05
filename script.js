// GLOBAL VARIABLES
const API_KEY = '3f8ad94a3b64f92ec1bc6cce7e6f2c8f' // screaming snake case
const DOMAIN = 'https://api.themoviedb.org/3'
const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/original'

const button = document.querySelector('button')
const input = document.querySelector('input')
const movieList = document.querySelector('section')

// const movie = input.value // THIS would not work, get an error b.c of the way JS runs. At when the page loads there is no input

// FUNCTIONS
// 3. Add the axios API call to search movie
const getMovie = async () => {
  // console.log(`${input.value}`)

  // if (e.keycode === 13) {
  //   e.preventDefault()
  //   button.click()
  // }

  // 2. Store the text value of the input in a variable outside of your event listener.
  let movieInput = input.value
  let response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${movieInput}&api_key=${API_KEY}`
  )

  // To verify in the console that I'm retrieving information from TMDB.
  console.log(response) // returns info of the user input based on what URL for the call contains
  console.log(response.data.results) // returns array enclosed in the results

  // Invoking renderList function with parameter response.data.results
  renderList(response.data.results) // data.results is an array of movie objects based on the user input

  input.value = ''
}

// 4.Write a method(function) called renderList that receives an array of "movie" objects as a parameter. Call renderList from the event handler you wrote in the previous step and pass it the Search results from the axios response.
// should iterate over the movies it receives as an argument and insert the movie data from each object into the DOM as a new HTML element.
const renderList = (movies) => {
  movies.forEach((movie) => {
    // console.log('<- # of objects in array')
    // console.log(movie.original_title)
    // console.log(`${IMAGE_BASE_PATH}${movie.poster_path}`)

    let movieTitle = movie.original_title
    let moviePoster = movie.poster_path

    // inserting movie title from each object into DOM as a new HTML element
    if (moviePoster === null) {
      // The += in a sense appends one movie after the other
      movieList.innerHTML += `<div class='movieInfo'><h2>${movieTitle}</h2><p>NO POSTER AVAILABLE</p></div>`
    } else {
      movieList.innerHTML += `<div class='movieInfo'><h2>${movieTitle}</h2><img src=${IMAGE_BASE_PATH}${moviePoster} /></div>`
    }

    // TRY the creating an element and append it with appendChild way!!
  })
}

// EVENT LISTENERS
// 1. Attach an event listener that simply logs the text value of the input
button.addEventListener('click', getMovie)

// Trying to search when enter is pressed
// input.addEventListener('keyup', (e) => {
//   if (e.keycode === 13) {
//     e.preventDefault()
//     button.click()
//   }
//   getMovie
// })

// handler: function that does something when we hear the listener
