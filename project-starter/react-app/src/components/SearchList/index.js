import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './SearchList.css'


const SearchList = () => {
    let searchListData;
    const searchList = useSelector(state => Object.values(state?.search))
    // console.log('list', searchList[0])
    if (searchList[0]?.length) {
        searchListData = searchList[0]?.map(coin => {
            return (<div className='searchlist-item' key={coin.name}  >
                <NavLink className='searchlist-link' to={`/coinDetail/${coin.ticker}`}>
                    <img className='search-image' src={coin.image}></img>
                    <div>{coin.name}</div>
                    <div>{coin.price}</div>
                    <div>{coin.priceChange}</div>
                </NavLink>
            </div>
            )
        })
    } else {
        searchListData =
            <>
                <div className="bad-search">No Coins Returned Matching That Search.</div>

            </>
    }

    // console.log("THIS!!!!:", coin)



    return (
        <div className='searchlist-body'>
            {searchListData}
        </div>
    )
}

export default SearchList
