import React from 'react';
import { useEffect, } from 'react'
import { useSelector } from 'react-redux'
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();



const WatchListItem = ({ ticker }) => {


    return (
        <div>
            <h1>{ticker}</h1>

        </div>
    )
}
export default WatchListItem