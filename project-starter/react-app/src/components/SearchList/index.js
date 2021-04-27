import React, { useState } from "react";
import  { useSelector } from "react-redux";


const SearchList = () => {
    const searchList = useSelector(state => state?.searchList)

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
