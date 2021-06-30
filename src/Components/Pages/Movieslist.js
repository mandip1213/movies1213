import React from 'react'
import {Link} from "react-router-dom"
import defaultposter from "../images/defaultposter.png"
import { useGlobalMovieContext } from '../moviescontext'
import Pagination from "../Pagination"

const Movieslist = () => {
    const {movieslist,currentPage}=useGlobalMovieContext()
    // console.log("check",moviesliZZZZZst)
    if(!movieslist ){
        return(<div>no movie from the name you searched</div>)
    }
    const movieslisttoshow=movieslist.slice((currentPage-1)*10,((currentPage-1)*10+1)+9)
    return (<>
<Pagination/>
    <div className="movies-searches">
        {movieslisttoshow.map(movie=>{
            const {Poster,Title,Type,Year,imdbID}=movie
            return(
            <div key={imdbID} className="movies-search">
                <img src={Poster!=="N/A" ? Poster : defaultposter} className="search-image" alt="poster not available" />
                <div className="search-title">{Title}</div>
                <div className="search-type">Type: {Type} </div>
                <div className="search-year">Year:{Year}</div>
                <Link to= {`/movie/${imdbID}`} className="btn-primary deatils">deatils</Link>

            </div>
)
         })

        }
        <div className="div-for-reponsive"></div>
        <div className="div-for-reponsive"></div>
        <div className="div-for-reponsive"></div>
        <div className="div-for-reponsive"></div>
        <div className="div-for-reponsive"></div>
        <div className="div-for-reponsive"></div>
    </div>

    </>
    )
}

export default Movieslist