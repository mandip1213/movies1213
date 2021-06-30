import React, { useEffect } from 'react'
import defaultposter from "../images/defaultposter.png"
import { useParams, Link } from 'react-router-dom'
import { useGlobalMovieContext } from '../moviescontext'
import {FaArrowCircleRight,FaArrowCircleLeft} from "react-icons/fa"

const SingleMovie = () => {
    const { getAboutMovies, movieslist, moviedata } = useGlobalMovieContext()
    let firstMovie, lastMovie;
    const { id } = useParams()
    const [{ prevID, nextID }] = (movieslist.filter(movie => {
        firstMovie = (id === movieslist[0].imdbID)
        lastMovie = (id === movieslist[movieslist.length - 1].imdbID)
        return movie.imdbID === id
    }))
    useEffect(
        () => getAboutMovies(id), [id]
    )
    console.log(moviedata)
    const { Title, Genre, Poster, Language, Country, Type, Director, imdbRating, imdbVotes, Runtime, Released, Writer, Actors, Plot } = moviedata
    return (<>
        <div className="movie-container">
            <div className="movie">
            <img className="movie-image" src={Poster === "N/A" ? defaultposter : Poster}  alt="poster not available" />
            <div className="movie-details">
            <h1 className="movie-title"> {Title}</h1>
            <div className="movie-type"><span className="movie-key"> Type :</span> 
            <span className="movie-value"> {Type}</span> </div>
            <div className="movie-genre"><span className="movie-key"> Genre :</span> 
            <span className="movie-value"> {Genre}</span> </div>
            <div className="movie-langauge"><span className="movie-key"> Language :</span> 
            <span className="movie-value"> {Language}</span> </div>
            <div className="movie-released-date"><span className="movie-key"> Released : </span>  
            <span className="movie-value"> {Released}</span> </div>
            <div className="movie-time"><span className="movie-key"> Length :</span> 
            <span className="movie-value"> {Runtime}</span> </div>
            <div className="movie-director"><span className="movie-key"> Director :</span> 
            <span className="movie-value"> {Director}</span> </div>
            <div className="movie-writer"><span className="movie-key"> Writer :</span> 
            <span className="movie-value"> {Writer}</span> </div>
            <div className="movie-actors"><span className="movie-key"> Cast : </span> 
            <span className="movie-value"> {Actors}</span> </div>
            <div className="movie-country"><span className="movie-key"> Country :</span> 
            <span className="movie-value"> {Country}</span> </div>
            <div className="movie-plot"><span className="movie-key"> Plot :</span>  
            <span className="movie-value"> {Plot}</span></div>
            </div>
            </div>
            
           
               { (firstMovie?<Link to="#" className="prev-next-disable prev"><FaArrowCircleLeft/></Link>
                :<Link className="prev" to={`/movie/${prevID}`}><FaArrowCircleLeft/></Link>
                )}
                {(lastMovie ? <Link to="#" className="prev-next-disable next"><FaArrowCircleRight/></Link>
                :<Link className="next" to={`/movie/${nextID}`}><FaArrowCircleRight/></Link>)}
        </div>
    </>
    )
}

export default SingleMovie
