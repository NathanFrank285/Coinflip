import React from 'react';
import WatchListItem from '../WatchListItem'
import { Link } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWatchListThunk } from '../../store/watchlist'
import './Watchlist.css'
const WatchList = () => {
    const dispatch = useDispatch()
    const watchlist = useSelector(state => state?.watchlist?.watchlist)
    useEffect(() => {
      dispatch(getWatchListThunk());
    }, [watchlist?.length]);

let coins = [];
let content = watchlist?.map(item => {
    // return Object.entries(item)
    // console.log(item)
    let key = Object.keys(item)
    let values = Object.values(item)
    coins.push([
      key[0],
      values[0].last_updated_at,
      values[0].usd,
      values[0].usd_24h_change,
      values[0].usd_24h_vol,
      values[0].usd_market_cap,
    ]);

})

return (
    <div className="watchlistContainer">
        <div className="watchlistUlContainer">
        {coins?.map((coin)=>{
            return (
                <div className="watchlist-Li"  key={coin[0]}><WatchListItem coin={coin} /></div>
            )
        })}

        </div>
    </div>
)
}
export default WatchList
