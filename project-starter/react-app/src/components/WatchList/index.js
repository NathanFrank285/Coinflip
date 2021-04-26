import React from 'react';
import { Link } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWatchListThunk } from '../../store/watchlist'
const WatchList = () => {
    const dispatch = useDispatch()
    const tickers = useSelector(state => state?.watchlist)
    useEffect(() => {
        const watchListData = dispatch(getWatchListThunk());

    }, [tickers])
    console.log(tickers)


    return (
        <div>

        </div>
    )
}
export default WatchList