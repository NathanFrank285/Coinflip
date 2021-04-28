const GET_COIN_DETAILS = "coindetails/GET_COIN_DETAILS";

const getCoinDetail = (details) => {
  return {
    type: GET_COIN_DETAILS,
    payload: details,
  };
};

export const getCoinDetailThunk = (name) => async (dispatch) => {
  const data = await fetch(`/api/coindetail/${name}`);
  const details = await data.json();
  console.log(details);
  if (details.search === "bad search") {
    // dispatch(push("/portfolio"));
    //todo reroute logic here
  }

  dispatch(getCoinDetail(details));
};

let initialState = {};
const coinDetail = (state = initialState, action) => {
  switch (action.type) {
    case GET_COIN_DETAILS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default coinDetail;
