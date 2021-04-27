import React from 'react';
import { useEffect, } from 'react'
import { useSelector } from 'react-redux'



const WatchListItem = ({ coin }) => {

    String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

    return (
        <div className="watchlist-box">

            <ul>
                <li>{coin[0].capitalize()}</li>
                <li>
                    Current Price: {coin[2]}
                </li>
                <li>
                    24 hour change {coin[3].toFixed(2)}%
                </li>
                <li>
                    24 hour volume {coin[4]}
                </li>
            </ul>
        </div>
    )
}
export default WatchListItem
