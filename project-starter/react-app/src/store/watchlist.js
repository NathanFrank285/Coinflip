const GET_WATCHLIST = 'watchlist/GET_WATCHLIST'
const DELETE_WATCHLIST_ITEM = 'watchlist/DELETE_WATCHLIST_ITEM'

const get_watchlist = (watchlist) => {
    return {
        type: GET_WATCHLIST,
        watchlist
    }
}
const delete_watchlist_item = (watchlist) => {
    return {
      type: DELETE_WATCHLIST_ITEM,
      watchlist,
    };
}

export const getWatchListThunk = () => async (dispatch) => {

    const response = await fetch('/api/watchlist')
    const watchlist = await response.json()
    if (watchlist) {
        dispatch(get_watchlist(watchlist))
        return
    }

}

export const deleteWatchlistItem = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/watchlist/${ticker}`, {
      method: "DELETE",
    });
    const watchlist = await response.json();
    if (watchlist) {
      dispatch(delete_watchlist_item(watchlist));
      return;
    }
}


const initialState = {}
export default function watchlist(state = initialState, action) {
    switch (action.type) {
        case GET_WATCHLIST:
            return { ...state, ...action.watchlist }
        case DELETE_WATCHLIST_ITEM:
            return { ...state, ...action.watchlist }



        default:
            return state
    }
}
