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

        return dispatch(get_watchlist(watchlist))
    }

}

const initialState = {}

const watchListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WATCHLIST:
            return { ...state, ...action.payload }
        default:
            return state
    }

}
export default watchListReducer