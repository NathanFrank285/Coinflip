const GET_WATCHLIST = 'watchlist/GET_WATCHLIST'
const DELETE_WATCHLIST_ITEM = 'watchlist/DELETE_WATCHLIST_ITEM'

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

export const addToWatchlist = (name, status) => async (dispatch) => {
//   if (!status) {
//     let coinDetails = await fetch(`/api/inWatchlist/${name}`, {
//       method: "POST",
//     });
//     let res = await coinDetails.json();
//     console.log(res);
//     dispatch(getCoinDetail({ inWatchlist: !status }));
//   } else {
//     let coinDetails = await fetch(`/api/inWatchlist/${name}`, {
//       method: "DELETE",
//     });
//     let res = await coinDetails.json();
//     console.log(res);
//     dispatch(getCoinDetail({ inWatchlist: !status }));
//   }
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



        default:
            return state
    }
}
