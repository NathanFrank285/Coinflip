const GET_WATCHLIST = 'watchlist/GET_WATCHLIST'
const DELETE_WATCHLIST_ITEM = 'watchlist/DELETE_WATCHLIST_ITEM'
const ADD_WATCHLIST_ITEM = 'watchlist/ADD_WATCHLIST_ITEM'

const getWatchlist = (watchlist) => {
    return {
        type: GET_WATCHLIST,
        watchlist
    }
}
const deleteWatchlistItem = (watchlist) => {
    return {
      type: DELETE_WATCHLIST_ITEM,
      watchlist,
    };
}

const addWatchlistItem = (watchlist) => {
    return {
        type: ADD_WATCHLIST_ITEM,
        watchlist
    }
}

export const addToWatchlist = (name) => async (dispatch) => {
    let coinDetails = await fetch(`/api/watchlist/${name}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      }
    });
    let watchlist = await coinDetails.json();
    if (watchlist){
        dispatch(addWatchlistItem(watchlist))
        return
    }
};


export const getWatchListThunk = () => async (dispatch) => {

    const response = await fetch('/api/watchlist')
    const watchlist = await response.json()
    if (watchlist) {
        dispatch(getWatchlist(watchlist))
        return
    }

}

export const deleteFromWatchlist = (ticker) => async (dispatch) => {
    console.log('did I make it to the thunk', ticker);
    const response = await fetch(`/api/watchlist/${ticker}`, {
      method: "DELETE",
    });
    const watchlist = await response.json();
    if (watchlist) {
      dispatch(deleteWatchlistItem(watchlist));
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
        case ADD_WATCHLIST_ITEM:
            return { ...state, ...action.watchlist }



        default:
            return state
    }
}
