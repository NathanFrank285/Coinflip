const GET_WATCHLIST = 'watlist/GET_WATCHLIST'


const get_watchlist = (watchlist) => {
    return {
        type: GET_WATCHLIST,
        payload: watchlist
    }
}



export const getWatchListThunk = () => async (dispatch) => {

    const response = await fetch('/api/watchlist')
    const watchlist = await response.json()
    console.log('------------------')
    console.log(watchlist)
    if (response.ok) {

        dispatch(get_watchlist(watchlist))
    }

}

const initialState = { watchlist: null }

const watchListReducer = (state, action) => {
    switch (action.type) {
        case GET_WATCHLIST:
            return { ...state, watchlist: action.payload }
        default:
            return state
    }

}