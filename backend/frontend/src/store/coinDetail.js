const GET_COIN_DETAILS = "coindetails/GET_COIN_DETAILS";
const EDIT_WATCHLIST_ITEM = "coindetails/EDIT_WATCHLIST_ITEM";

const getCoinDetail = (details) => {
  return {
    type: GET_COIN_DETAILS,
    payload: details,
  };
};

export const getCoinDetailThunk = (name) => async (dispatch) => {
  const data = await fetch(`/api/coindetail/${name}`,);
  const details = await data.json();
    if (details.search === 'bad search'){
        dispatch(getCoinDetail(details));
    }
  dispatch(getCoinDetail(details));
};


let initialState = {};
const coinDetail = (state = initialState, action) => {
  switch (action.type) {
    case GET_COIN_DETAILS:
      return { ...state, ...action.payload };
    case EDIT_WATCHLIST_ITEM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default coinDetail;
