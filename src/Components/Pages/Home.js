import React from 'react'
import { useGlobalMovieContext } from '../moviescontext'
import Movieslist from "./Movieslist"
import {Link} from "react-router-dom"
// useFetch('http://www.omdbapi.com/?apikey=e94218ee&page=2&s=batman')

const Home = () => {
    const { getMovies, searchText, updateSearchText } = useGlobalMovieContext()
    return (<>
        <div className="search-container">
            <input type="text" onChange={(e) => updateSearchText(e.target.value)} value={searchText} className="serach-text" />
            <Link to="/movies"><button className="btn-primary"
                onClick={() => {getMovies(searchText)}}>Search</button>
                </Link>
        </div>

    </>)
}

export default Home
