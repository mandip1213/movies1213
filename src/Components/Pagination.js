import React from 'react'
import { useGlobalMovieContext } from './moviescontext'


const Pagination = () => {
    const { totalResults,pageStart,updateNextPage,updatePrevPage,updatePage,currentPage} = useGlobalMovieContext()
    const totalPages=Math.ceil(totalResults/10)
    if (currentPage %10===0){
        console.log("hello")
    }
    let pagesNum= Array.from({length:10},(v,k)=>k+pageStart)
    if(currentPage+9>totalPages){
        pagesNum=Array.from({length:totalPages-currentPage+1},(v,k)=>k+pageStart)
    }
    return (<ul className="pagination" >
        <li className="pagination-item" onClick={()=>updatePrevPage()}>prev</li>
        {pagesNum.map(number=>{

            return(
                <li className={`${number===currentPage?"active":null} pagination-item`} id={number} onClick={()=>updatePage(number)}>{number}</li>
            )
        })}
        <li className="pagination-item" onClick={()=>updateNextPage()}>next</li>



    </ul>
    )
}

export default Pagination
