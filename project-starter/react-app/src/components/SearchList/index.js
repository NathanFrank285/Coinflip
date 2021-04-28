import React, { useState } from "react";
import  { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './SearchList.css'


const SearchList = () => {
    const searchList = useSelector(state => Object.values(state?.search))
    console.log(searchList)
    const renderSearch = searchList.map(coin =>{
        // console.log("THIS!!!!:", coin)
        return (
            <div className='searchlist-item' >
                <NavLink className='searchlist-link' to={`/coinDetail/${coin.ticker}`}>
                    {coin.name}
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
