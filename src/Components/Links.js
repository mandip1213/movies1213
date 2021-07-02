import React from 'react'
import { NavLink } from "react-router-dom"
import { useGlobalTmdbContext } from './Tmdbcontext'

const Links = () => {
    const { getMoviesByType } = useGlobalTmdbContext()
    return (
        <div className="movies-by-type-btns">
            <NavLink exact to="/" activeClassName="active" className="movies-by-type-btn"
                onClick={() => getMoviesByType("trending")}>Trending</NavLink>
            <NavLink activeClassName="active" className="movies-by-type-btn" to="/TopRated"
            >TopRated</NavLink>
            <NavLink activeClassName="active" className="movies-by-type-btn" to="/popular"
            >Popular</NavLink>
            <NavLink activeClassName="active" className="movies-by-type-btn" to="/upcoming"
            >Upcoming</NavLink>

        </div>
    )
}

export default Links
