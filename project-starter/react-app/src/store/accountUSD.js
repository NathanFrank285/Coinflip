const GET_USD = "coindetails/GET_USD";
const EDIT_USD = "coindetails/EDIT_USD";

const getDollarAmount = (USD) => {
  return {
    type: GET_USD,
    USD
  };
};

export const getDollarAmountThunk = (transferData) => async (dispatch) => {
  const data = await fetch(`/api/users/balance`);
  const details = await data.json();
  if (details.search === "bad search") {
    dispatch(getDollarAmount(details));
  }
  console.log('made it to this thunk');
  dispatch(getDollarAmount(details));
};

export const newTransferThunk = (transferData) => async (dispatch) => {
  const data = await fetch(`/api/users/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transferData),
  });
  const details = await data.json();
  if (details.search === "bad search") {
    dispatch(getDollarAmount(details));
  }
  console.log('made it to this thunk');
  dispatch(getDollarAmount(details));
};

let initialState = {};
const USDBalance = (state = initialState, action) => {
  switch (action.type) {
    case GET_USD:
      return {...action.USD };
    case EDIT_USD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default USDBalance;
