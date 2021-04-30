const GET_PORTFOLIO = "portfolio/GET_PORTFOLIO";
const getPortfolio = (portfolio) => {
  return {
    type: GET_PORTFOLIO,
    portfolio,
  };
};
export const getPortfolioThunk = () => async (dispatch) => {
  let portfolioDetails = await fetch("/api/portfolio");
  let portfolio = await portfolioDetails.json();
  console.log("========================", portfolio);
  if (portfolio) {
    dispatch(getPortfolio(portfolio));
    return;
  }
};
export const addToPortfolio = (data) => async (dispatch) => {
  const response = await fetch(`/api/portfolio/${data.coinId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log(response)


}
const initialState = {};
export default function portfolio(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return { ...state, ...action.portfolio };
    default:
      return state;
  }
}
