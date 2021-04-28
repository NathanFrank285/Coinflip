const GET_COINBROWSER = "coinbrowser/GET_COINBROWSER";

const get_coinbrowser = (coins) => {
    return {
        type: GET_COINBROWSER,
        coins
    }
}

export const getCoinBrowserThunk = () => async (dispatch) => {
    const response = await fetch('/api/coinBrowser')
    const coins = await response.json()
    if (coins) {
        dispatch(get_coinbrowser(coins))
        return
    }

}

const initialState = {}
export default function coinBrowser(state = initialState, action) {
    switch (action.type) {
        case GET_COINBROWSER:
            return {...state, ...action.coins}
        default:
            return state
    }
    
}