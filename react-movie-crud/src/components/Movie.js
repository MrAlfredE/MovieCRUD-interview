import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Movie = ({movie, onDelete, onUpdate}) => {
    return (
        <div className = 'movie' onDoubleClick={()=>onUpdate(movie.movieId)}>
            <h3>{movie.name} <FaTimes style={{color:'red',cursor:'pointer'}} onClick={() => onDelete(movie.movieId)}/></h3>
            <p>Year: {movie.year}</p>
            <p>Run time: {movie.duration} min</p>
            <p>Plot: {movie.discript}</p>
        </div>
    )
}

export default Movie
