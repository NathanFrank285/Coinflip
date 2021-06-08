const GET_USD = "coindetails/GET_USD";
const EDIT_USD = "coindetails/EDIT_USD";

let initialState = {};
const accountUSD = (state = initialState, action) => {
  switch (action.type) {
    case GET_USD:
      return { ...state, ...action.payload };
    case EDIT_USD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default accountUSD;
