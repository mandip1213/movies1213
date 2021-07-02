import React, { useEffect } from 'react'
import { useGlobalTmdbContext } from './Tmdbcontext'
import Pagination2 from './Pagination2'
import { Link } from "react-router-dom"
import defaultposter from "./images/defaultposter.png"
const Trending = () => {
    const { trending: { currentPage, total_lists }, getMoviesByType } = useGlobalTmdbContext()

    const movieslisttoshow = total_lists.slice((currentPage - 1) * 10, currentPage * 10)


    useEffect(() => {
        getMoviesByType("trending")
    }, [])
    return (<>
        <Pagination2 moviesType="trending" />
        <div className="trending-movies">
            <div className="movies-searches">
                {movieslisttoshow.map(movieItem => {
                    const { poster_path, id, media_type, title, release_date } = movieItem
                    return (
                        <div key={id} className="movies-search">
                            <img src={poster_path === null ? defaultposter : `https://image.tmdb.org/t/p/w400${poster_path}`} className="search-image" alt="poster not available" />
                            <div className="search-title" >{title}</div>
                            <div className="search-type">Type: {media_type} </div>
                            <div className="search-year">Released :{release_date}</div>
                            {/* <Link to="#" onClick={() => getMoreAboutMovies(id)} className="btn-primary deatils">deatils</Link> */}
                            <Link to={`/movies/${id}`}className="btn-primary deatils">deatils</Link>

                        </div>
                    )
                })
                }
                <div className="div-for-reponsive"></div>
                <div className="div-for-reponsive"></div>
                <div className="div-for-reponsive"></div>
                <div className="div-for-reponsive"></div>
                <div className="div-for-reponsive"></div>
            </div>
        </div>
    </>)
}
export default Trending
