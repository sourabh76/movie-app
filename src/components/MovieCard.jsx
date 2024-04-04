import React from "react";

const MovieCard = ({movie}) => {
    const handleClick = () => {
        alert("Video Clicked");
    }

    return (
        <div className="movie" onClick={handleClick}>
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== "N/A" ? movie.Poster : ""} alt={movie.Title} />
            </div>
        </div>
    )
}
export default MovieCard