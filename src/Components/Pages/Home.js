import React from 'react'
import { useGlobalTmdbContext } from '../Tmdbcontext'
import {Link} from "react-router-dom"

const Home = () => {
    const {getMoviesByType,updateSearchText,searchText,clearSearchResults}=useGlobalTmdbContext()
    return (<>
        <div className="search-container">
            <input placeholder="search movies" type="text" onChange={(e) => updateSearchText(e.target.value)} value={searchText} className="serach-text" />

            <Link to={`${searchText.length!==0?"/movies":"/"}`}><button className="btn-primary"
                onClick={() => {
                    clearSearchResults();
                    (searchText.length!==0?getMoviesByType("searchresults"):alert("SearchBox Can't be empty"))}}>Search</button>
                </Link>
        </div>

    </>)
}

export default Home
