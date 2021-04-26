import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWatchListThunk } from '../../store/watchlist'
const WatchList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const watchListData = dispatch(getWatchListThunk());

    }, [])



    return (
        <div>
            <h1>Single Watch List Component</h1>
        </div>
    )
}
export default WatchList