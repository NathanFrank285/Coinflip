import React, { useState } from "react";
import  { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const SearchList = () => {
    const searchList = useSelector(state => Object.values(state?.search))
    console.log(searchList)
    const renderSearch = searchList.map(coin =>{
        // console.log("THIS!!!!:", coin)
        return (
            <NavLink to={`/coinDetail/${coin.name}`}>
                {coin.name}
            </NavLink>
        )
    })

    return (
        <div>
            {renderSearch}
        </div>
    )
}

export default SearchList
