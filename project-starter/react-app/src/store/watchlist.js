const GET_WATCHLIST = 'watchlist/GET_WATCHLIST'


const get_watchlist = (watchlist) => {
    return {
        type: GET_WATCHLIST,
        watchlist
    }
}



export const getWatchListThunk = () => async (dispatch) => {

    const response = await fetch('/api/watchlist')
    const watchlist = await response.json()
    if (watchlist) {
        dispatch(get_watchlist(watchlist))
        return
    }

}

const initialState = {}

export default function watchlist(state = initialState, action) {
    switch (action.type) {
        case GET_WATCHLIST:
            return { ...state, ...action.watchlist }
        default:
            return state
    }
}
