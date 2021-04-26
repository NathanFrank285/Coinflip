const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


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
    let watchlistData = {}
    watchlist.tickers.forEach(async (watchlistItem) => {

        let price = await CoinGeckoClient.simple.price({
            ids: [`${watchlistItem.ticker}`],
            vs_currencies: ['usd']
        })
        watchlistData[`${watchlistItem.ticker}`] = price.data[`${watchlistItem.ticker}`].usd

    })
    console.log(watchlistData)

    if (watchlistData) {

        return dispatch(get_watchlist(watchlistData))
    }

}

const initialState = {}

const watchListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WATCHLIST:

            return { ...state, watchlist: action.payload }
        default:
            return state
    }

}
export default watchListReducer