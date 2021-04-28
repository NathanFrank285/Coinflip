import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './SearchList.css'


const SearchList = () => {
    const searchList = useSelector(state => Object.values(state?.search))
    console.log('list', searchList[0])
    const renderSearch = searchList[0]?.map(coin => {
        console.log("THIS!!!!:", coin)
        return (
            <div className='searchlist-item'  >
                <NavLink className='searchlist-link' to={`/coinDetail/${coin.ticker}`}>
                    <img src={coin.image}></img>
                    <div>{coin.name}</div>
                    <div>{coin.price}</div>
                    <div>{coin.priceChange}</div>
                </NavLink>
            </div>
        )
    })

    return (
        <div className='searchlist-body'>
            {renderSearch}
        </div>
    )
}

export default SearchList
