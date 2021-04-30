import React from 'react';
import { useEffect, } from 'react'
import { useDispatch } from 'react-redux'
import {deleteFromWatchlist} from '../../store/watchlist'
import './WatchListItem.css'


const WatchListItem = ({ coin }) => {
    const dispatch = useDispatch()

String.prototype.capitalize = function () {
return this.charAt(0).toUpperCase() + this.slice(1);
};
const formatCash = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
};

const removeFromWatchlist = (e) => {

dispatch(deleteFromWatchlist(e.target.id));
}

    return (
      <div className="watchlist-box">
        <ul>
          <li>{`${coin[0].capitalize()}: ${coin[2].toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`}</li>
          <li>
            Market Cap:{" $"}
            {formatCash(coin[5])}
          </li>
          <li>24 hour change: {coin[3].toFixed(2)}%</li>
          <li>
            24 hour volume:{" $"}
            {formatCash(coin[4])}
          </li>
        </ul>
        <button className='deleteFromWatchlist' id={coin[0]} onClick={removeFromWatchlist}>delete</button>
      </div>
    );
}
export default WatchListItem
