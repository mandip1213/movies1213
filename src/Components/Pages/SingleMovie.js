import React, { useEffect,useRef } from 'react'
import defaultposter from "../images/defaultposter.png"
import { useParams } from 'react-router-dom'
import { useGlobalTmdbContext } from '../Tmdbcontext'
import {FaQuoteLeft,FaQuoteRight} from "react-icons/fa"
import {AiFillCloseSquare,AiOutlineYoutube} from "react-icons/ai"
import {BiCameraMovie} from "react-icons/bi"
function useCloseOnOutsideClick(ref) {
    //function to close the movie details if clicked outside
    function LoginHandler(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            window.history.go(-1)
        }
    }
    useEffect(() => {
            document.addEventListener("click", LoginHandler)
            return () => {
                document.removeEventListener("click", LoginHandler)
        }
    }, [])
}
const SingleMovie = () => {
    const movie_container = useRef(null);
    useCloseOnOutsideClick(movie_container)
    window.scrollTo(0, 0) // it takes you to top of page not where you are scrolling
    const { id } = useParams()
    const { getMoreAboutMovies, singleMovieData: { movieData, isLoading } } = useGlobalTmdbContext()
    useEffect(() => {
        getMoreAboutMovies(id)
    }, [])
    if (isLoading) {
        return (<div className="data-loading">Loading ...</div>)
    }
    const { title, adult, poster_path, credits: { crew }, genres, trailers:{youtube},homepage, overview, release_date, tagline, runtime, spoken_languages } = movieData
    return (<>
        <div ref={movie_container} className="movie-container">
            <div className="movie-tagline"><h2>{tagline!==""?<><FaQuoteLeft/> {tagline} <FaQuoteRight/></>:null}</h2></div>
            <div className="movie">
                <img src={poster_path === null ? defaultposter : `https://image.tmdb.org/t/p/w400${poster_path}`} className="movie-image" alt="poster not available" />
                <div className="movie-details">
                    <h1 className="movie-title"> {title} 
                    {adult === false ? null : <span className="movie-eighteen-plus">18+</span>}</h1>
                    <div className="movie-genre"><span className="movie-key"> Genre :</span>
                        <span className="movie-value"> {genres.map(item => item.name).join(' , ')}</span>
                    </div>

                    <div className="movie-langauge"><span className="movie-key"> Language :  </span>
                        <span className="movie-value"> {spoken_languages.map(item => item.english_name).join(" , ")}</span> </div>
                    <div className="random"></div>


                    <div className="movie-released-date"><span className="movie-key"> Released: </span>
                        <span className="movie-value"> {release_date}</span> </div>
                    <div className="movie-time"><span className="movie-key"> Runtime :</span>
                        <span className="movie-value"> {runtime} min</span> </div>
                    <div className="movie-writer"><span className="movie-key"> Writer :</span>
                        <span className="movie-value">{crew.filter(crewitem => crewitem["department"] === "Writing")
                            .map(item => item.name).join(" , ")}</span> </div>


                    <div className="movie-director"><span className="movie-key"> Director :</span>
                        <span className="movie-value">{crew.filter(crewitem => crewitem["department"] === "Directing")
                            .map(item => item.name).join(" , ")}</span> </div>
                    <div className="movie-plot"><span className="movie-key"> Plot :</span>
                        <span className="movie-value"> {overview}</span></div>
                        <div className="external-links">
                            <span 
                            onClick={()=>(homepage.length!==0?window.open(homepage):alert("sorry , No Home Page available for this movie"),"_blank")} className="external-link movie-link"><BiCameraMovie/></span>
                             <span 
                            onClick={()=>{
                                const linkyoutube=youtube.filter(item=>item.type==="Trailer");
                                (linkyoutube.length!==0? window.open(`https://www.youtube.com/watch?v=${linkyoutube[0].source}`,"_blank" ) :alert("No trailer available for this movie"))}} 
                                className="external-link  youtube-link"><AiOutlineYoutube/></span>
                        </div>
                </div>
            <span onClick={()=>window.history.go(-1)}
            className="movie-close-icon"><AiFillCloseSquare/></span>
            </div>

        </div>
    </>)
}
export default SingleMovie