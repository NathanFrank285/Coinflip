import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './SearchList.css'


const SearchList = () => {
    let searchListData;
    const searchList = useSelector(state => Object.values(state?.search))
    if (searchList[0]?.length) {
        searchListData = searchList[0]?.map(coin => {
            return (<div className='searchlist-item' key={coin.name}  >
                <NavLink className='searchlist-link' to={`/coinDetail/${coin.ticker}`}>
                    <img className='search-image' src={coin.image} alt="coin"></img>
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
                <div className="bad-search">No coins returned matching that search.</div>

            </>
    }
    return (
        <div className='searchlist-body'>
            {searchListData}
        </div>
    )
}

export default SearchList
