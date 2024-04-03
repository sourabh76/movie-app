import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = 'https://www.omdbapi.com/?t=jamesbond&apikey=f7442895'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [availableYear, setAvailableYear] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if(data.Response === "True") {
      setMovies(data.Search);
      setAvailableYear(data?.Search.map(item => item.Year));
    } else {
      setMovies([]);
    }
  }
  useEffect(() => {
    searchMovies("James Bond");

  }, []);

  const handleSearchChange = (e) => {
    setSearchMovie(e.target.value);
  };

  const handleYearFilterChange = (e) => {
    setFilterYear(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchMovie);
    }
  }

  const filteredMovies = filterYear ? movies.filter(movie => movie.Year === filterYear) : movies;
  const filterAvailableYear = availableYear.filter(item => item.startsWith(filterYear))

  return (
    <div className="app">
      <div className="navbar">
        <div className="search">
          <input
            placeholder="Search for Movies"
            value={searchMovie}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() =>searchMovies(searchMovie)}
          />
        </div>

        <div className="year">
          <input
          type="text" 
          placeholder="Filter by year..." 
          value={filterYear} 
          onChange={handleYearFilterChange}
          />
        </div>
      </div>

      {filterYear ? 
            <div className="availableYear">
              {
                filterAvailableYear.length > 1 && filterAvailableYear.map((item, index) => 
                  <li key={index} onClick={(e) => {setFilterYear(e.target.innerText)}}>
                    {item}
                  </li>
                )
              }
            </div>
            : null
          }

      {
        filteredMovies?.length > 0 ?
          (<div className="container">
            {filteredMovies.map((movie)=>(
              <MovieCard movie={movie} key={movie.imdbID}/>
            ))}
          </div>) :
          (
            <div className="empty">
              <h2>No movies Found</h2></div>
          )
      }
    </div>
  );
}

export default App;