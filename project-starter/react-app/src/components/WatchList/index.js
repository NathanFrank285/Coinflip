import React from 'react';
import WatchListItem from '../WatchListItem'
import { Link } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWatchListThunk } from '../../store/watchlist'
const WatchList = () => {
    const dispatch = useDispatch()
    const watchlist = useSelector(state => state?.watchlist?.watchlist)
    useEffect(() => {
        const watchListData = dispatch(getWatchListThunk());

        const response = fetch('')

        // const coinArray = Object.keys(watchlist)
        console.log(watchlist)
        // console.log(coinArray)
    }, [watchlist])
    return (
        <div>
            <h1>hello</h1>
            <WatchListItem />

        </div>
    )
}
export default WatchList