import Movie from './Movie'

const Movies = ({movies,onDelete,onUpdate}) =>{
    
    return(
        <>
            {movies.map((movie)=>(
                <Movie key={movie.movieId} movie={movie} onDelete= {onDelete} onUpdate ={onUpdate}/>    
            ))

            }
        </>
    )
}

export default Movies