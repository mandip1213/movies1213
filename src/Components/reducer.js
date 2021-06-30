import { useGlobalMovieContext } from './moviescontext'

export const reducer=(state,action)=>{

    if(action.type==="LIST_RECEIVED"){
        const list=action.payload.data 
        let movieslistdata;
        if(list){ movieslistdata=action.payload.data.map((item,index)=>{
            const prevID=(index===0 ?"":action.payload.data[index-1].imdbID)  
            const nextID=(index===action.payload.data.length-1?"":action.payload.data[index+1]["imdbID"]) 
            return {...item,prevID:prevID,nextID:nextID}
        })}
        return{...state,movieslist:[...state.movieslist,...movieslistdata],totalResults:action.payload.totalResults,firstPhaseData:true}
    }
    if(action.type==="UPDATE_SEARCH_TEXT"){

        return {...state,searchText:action.payload}
    }
    if(action.type==="MOVIE_DATA_RECEIVED"){
        return{...state,moviedata:action.payload}
    }
    if(action.type==="UPDATE_PAGE"){
        return{...state,currentPage:action.payload}
    }

    if(action.type==="PREV_PAGE"){
        if(state.currentPage===1){
            return {...state}
        }
        if((state.currentPage-1)%10 === 0){
            return({...state,currentPage:state.currentPage+1,pageStart:state.pageStart+10})
        }

        return{...state,currentPage:state.currentPage-1}
    }
    if(action.type==="NEXT_PAGE"){
        console.log(state.currentPage===Math.ceil(state.totalResults/10))
        if(state.currentPage===Math.ceil(state.totalResults/10)){
            // console.log("last")
            return{...state}
        }
        if(state.currentPage%10 === 0){
            return({...state,currentPage:state.currentPage+1,pageStart:state.pageStart+10})
        }

        return{...state,currentPage:state.currentPage+1}
    }
}
