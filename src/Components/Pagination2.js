import React from 'react'
import { useGlobalTmdbContext } from './Tmdbcontext'

const Pagination2 = ({moviesType}) => {
    const {[moviesType]:moviesData,prevPage,nextPage,updatePage}=useGlobalTmdbContext() 
    const {currentPage,pageStart,total_pages_to_show}=moviesData
    // const PagesNum= Array.from({length:5},(v,k)=>k+pageStart)
    const PagesNum= Array.from({length:(total_pages_to_show<pageStart+4?(total_pages_to_show-pageStart+1):5)},(v,k)=>k+pageStart)
    return (<>
    <ul  className="pagination2">
        <li className="prev_ pagination2-item" onClick={()=>prevPage(moviesType)}>prev</li>
        {PagesNum.map(number=>{
            return(
            <li key={number} onClick={()=>updatePage(number,moviesType)}
            className={`${number===currentPage?"active":null} pagination2-item`}>{number}</li>
        )
        })}
        <li className="next_ pagination2-item" onClick={()=>nextPage(moviesType)}>next</li>
    </ul>


    </>
    )
}

export default Pagination2
