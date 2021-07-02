import React,{useContext,useReducer,useEffect} from "react"
import {tmdbReducer} from "./tmdbreducer"
export const initialTmdbState={
    trending:{total_pages:0,total_pages_to_show:20,total_results:0,total_lists:[],firstPhaseData:false,currentPage:1,pageStart:1},
    popular:{total_pages:0,total_pages_to_show:20,total_results:0,total_lists:[],firstPhaseData:false,currentPage:1,pageStart:1},
    top_rated:{total_pages:0,total_pages_to_show:20,total_results:0,total_lists:[],firstPhaseData:false,currentPage:1,pageStart:1},
    upcoming:{total_pages:0,total_pages_to_show:20,total_results:0,total_lists:[],firstPhaseData:false,currentPage:1,pageStart:1},
    searchresults:{total_pages:0,total_pages_to_show:4,total_results:0,total_lists:[],firstPhaseData:false,currentPage:1,pageStart:1},
    pagesPerScreen:5,
    searchText:"",
    singleMovieData:{movieData:{},isLoading:true},
}

const TmdbContext=React.createContext()
export const TmdbContextProvider=({children})=>{
    const [tmdbState, dispatch] = useReducer(tmdbReducer, initialTmdbState)
const updateSearchText=(value)=>dispatch({type:"UPDATE_SEARCH_TEXT",payload:value})
const clearSearchResults=()=>{
    dispatch({type:"CLEAR_SEARCH"})
}
    const getMoviesByType=(url,page=1,)=>{
        let urlTemplate;
        if (url==="trending"){
         urlTemplate=`https://api.themoviedb.org/3/${url}/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`
        }
        else if(["top_rated","popular","upcoming"].includes(url)){
         urlTemplate=`https://api.themoviedb.org/3/movie/${url}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`}
        else if(url==="searchresults"){
            urlTemplate=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${tmdbState.searchText}&page=${page}&include_adult=false`
        }
        else{
            alert("the movie type you are searching is undefined")
            return;
        }
        fetch(urlTemplate)
        .then(response=>response.json())
        .then(datas=>{
          
            dispatch({type:url.toUpperCase(),payload:datas})
            
        })
        .catch(error=>alert("there was an error while fetching the data.Sorry for the inconvenience caused"))
 }
 useEffect(() => {
     
    if(tmdbState["searchresults"].firstPhaseData){
        for(let pages=2;pages<=(tmdbState["searchresults"].total_pages);pages++){
            getMoviesByType("searchresults",pages)
        }
    }
}, [tmdbState["searchresults"].firstPhaseData])


 useEffect(() => {
    if(tmdbState["trending"].firstPhaseData){
        for(let pages=2;pages<=(tmdbState["trending"].total_pages_to_show)/2;pages++){
            getMoviesByType("trending",pages)
        }
    }

}, [tmdbState["trending"].firstPhaseData])

useEffect(() => {
    if(tmdbState["top_rated"].firstPhaseData){
        for(let pages=2;pages<=(tmdbState["top_rated"].total_pages_to_show)/2;pages++){
                 getMoviesByType("top_rated",pages)
             }
    }
}, [tmdbState["top_rated"].firstPhaseData])

useEffect(() => {
    if(tmdbState["popular"].firstPhaseData){
        for(let pages=2;pages<=(tmdbState["popular"].total_pages_to_show)/2;pages++){
                 getMoviesByType("popular",pages)
             }
    }
}, [tmdbState["popular"].firstPhaseData])

useEffect(() => {
    if(tmdbState["upcoming"].firstPhaseData){
        for(let pages=2;pages<=(tmdbState["upcoming"].total_pages_to_show)/2;pages++){
                 getMoviesByType("upcoming",pages)
             }
    }
}, [tmdbState["upcoming"].firstPhaseData])
const getMoreAboutMovies=(movie_id)=>{
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&&append_to_response=credits%2Cimage%2Ctrailers`)
        .then(response=>response.json())
        .then(dataa=>dispatch({type:"MOVIE_DATA_RECEIVED",payload:dataa}))
        .catch(error=>alert("there was an error while fetching the data sorry for the inconvinience"))
    }

    const prevPage=(moviesType)=>{dispatch({type:"PREV_PAGE",payload:moviesType})}
    const nextPage=(moviesType)=>{dispatch({type:"NEXT_PAGE",payload:moviesType})}
    const updatePage=(number,moviesType)=>{dispatch({type:"UPDATE_PAGE",payload:{number:number,moviesType:moviesType}})}

    return(
        <TmdbContext.Provider value={{...tmdbState,updateSearchText,getMoviesByType,prevPage,getMoreAboutMovies,nextPage,updatePage,clearSearchResults}}>
            {children}

        </TmdbContext.Provider>
    )
}
export const useGlobalTmdbContext=()=>useContext(TmdbContext)
