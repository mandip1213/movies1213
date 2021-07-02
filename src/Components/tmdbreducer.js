import { initialTmdbState } from "./Tmdbcontext"

export const tmdbReducer = (tmdbState, action) => {
    if (action.type === "UPDATE_SEARCH_TEXT") {
        return { ...tmdbState, searchText: action.payload }
    }
    if (["TRENDING", "POPULAR", "TOP_RATED", "UPCOMING", "SEARCHRESULTS"].includes(action.type)) {
        const dataType = action.type.toLowerCase()
        let { total_pages, total_results, total_lists } = tmdbState[dataType]
        total_pages = action.payload.total_pages
        total_results = action.payload.total_results
        total_lists = [...tmdbState[dataType].total_lists, ...action.payload.results]
        let newObject = { ...tmdbState[dataType], total_pages: total_pages, total_results: total_results, total_lists: total_lists, firstPhaseData: true }
        if (dataType === "searchresults") {
            newObject = { ...newObject, total_pages_to_show: Math.ceil(total_results / 10) }
        }
        return { ...tmdbState, [dataType]: newObject }

    }
    if (action.type === "UPDATE_PAGE") {
        const newObject = { ...tmdbState[action.payload.moviesType], currentPage: action.payload.number }
        return { ...tmdbState, [action.payload.moviesType]: newObject }

    }
    if (action.type === "NEXT_PAGE") {
        let newObject;
        const { currentPage, pageStart, total_pages_to_show } = tmdbState[action.payload]
        if (currentPage === total_pages_to_show) {
            newObject = { ...tmdbState[action.payload], pageStart: 1, currentPage: 1 }
        }
        else if (currentPage % tmdbState.pagesPerScreen === 0) {
            newObject = { ...tmdbState[action.payload], pageStart: pageStart + tmdbState.pagesPerScreen, currentPage: currentPage + 1 }
        }
        else {
            newObject = { ...tmdbState[action.payload], currentPage: currentPage + 1 }
        }

        return { ...tmdbState, [action.payload]: newObject }

    }
    if (action.type === "PREV_PAGE") {
        let newObject;
        const { currentPage, pageStart, total_pages_to_show } = tmdbState[action.payload]
        if (currentPage === 1) {
            // newObject = { ...tmdbState[action.payload], pageStart: total_pages_to_show - 4, currentPage: total_pages_to_show }
            newObject = { ...tmdbState[action.payload], pageStart: ( total_pages_to_show%5===0?total_pages_to_show-4:total_pages_to_show - (total_pages_to_show%5)+1), currentPage: total_pages_to_show }
        }
        else if ((currentPage - 1) % tmdbState.pagesPerScreen === 0) {
            newObject = { ...tmdbState[action.payload], pageStart: pageStart - tmdbState.pagesPerScreen, currentPage: currentPage - 1 }
        }
        else {
            newObject = { ...tmdbState[action.payload], currentPage: currentPage - 1 }
        }
        return { ...tmdbState, [action.payload]: newObject }

    }
    if (action.type === "CLEAR_SEARCH") {
        return { ...tmdbState,searchresults:initialTmdbState["searchresults"] }
    }
    if (action.type === "MOVIE_DATA_RECEIVED") {
        return { ...tmdbState,singleMovieData:{movieData:action.payload,isLoading:false}}
    }

}

