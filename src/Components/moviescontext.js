import React, { useContext,useReducer,useEffect } from "react"
import {reducer} from "./reducer"
const initialState={
    movieslist:[],
    totalResults:0,
    searchText:"hello",
    moviedata:[],
    prev:"",
    next:"",
    firstPhaseData:false,
    initialRender:true,
    moviesPerPage:10,
    currentPage:1,
    pageStart:1,

}

const MoviesContext = React.createContext()
const MoviesProvider = ({ children }) => {

const [state, dispatch] = useReducer(reducer, initialState)
const updateSearchText=(value)=>dispatch({type:"UPDATE_SEARCH_TEXT",payload:value})

const getMovies=(searchText,page=1)=>{
    fetch(`https://www.omdbapi.com/?apikey=e94218ee&page=${page}&s=${searchText}`)
    .then(response => response.json())
        .then(data => {
            dispatch({type:"LIST_RECEIVED",payload:{data:data.Search,totalResults:data.totalResults}})})
        .catch(error => console.log("error  : ",error))
}

useEffect(() => {
    const getMoreMovies=()=>{
        for(let pages=2;pages<=Math.ceil(state.totalResults/10);pages++){
             getMovies(state.searchText,pages)
        }
    }
    (state.initialRender ? state.initialRender=false:getMoreMovies())
}, [state.firstPhaseData])

const getAboutMovies=(imdbId)=>{
    fetch(`https://www.omdbapi.com/?apikey=e94218ee&i=${imdbId}`)
    .then(response => response.json())
        .then(data => {
            dispatch({type:"MOVIE_DATA_RECEIVED",payload:data})})
        .catch(error => console.log(error))

}
const updatePage=(pageNum)=>{
    dispatch({type:"UPDATE_PAGE",payload:pageNum})

}
const updateNextPage=()=>{
    dispatch({type:"NEXT_PAGE"})
}
const updatePrevPage=()=>{
    dispatch({type:"PREV_PAGE"})
}


    return (

        <MoviesContext.Provider value={{...state,getMovies,updatePrevPage,updateNextPage,updateSearchText,updatePage,getAboutMovies}}>
            {children}
        </MoviesContext.Provider>
    )
}
const useGlobalMovieContext = () => useContext(MoviesContext)
export { useGlobalMovieContext, MoviesProvider }

