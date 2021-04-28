import React from 'react';
import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinDetailThunk } from '../../store/coinDetail'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import './CoinDetail.css'


const CoinDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { name } = useParams()
    const details = useSelector(state => state?.coinDetail?.coin)
    const badSearch = useSelector(state => state?.coinDetail?.search)

    useEffect(() => {
        dispatch(getCoinDetailThunk(name))
    }, [])

    console.log(badSearch);
    if (badSearch === "bad search") {
      history.push('/portfolio')
    }

    return (
        <div className="priceDetailContainer">
            <div className="header">

                <span>
                    <h1>{details?.name}</h1>
                    <h2>{details?.symbol.toUpperCase()}</h2>
                </span>
                <span>
                    <img src={details?.image.small} ></img>
                </span>
                <button className="addToWatchList">Add to Watch List</button>


                <div>

                </div>
            </div>
            <div className="graphDiv">
                GRAPH PLACEHOLDER
            </div>
            <div className="maketDetail">
                <div>Current Price: {details?.market_data?.current_price.usd}</div>
                <div>Total Supply: {details?.market_data?.circulating_supply}</div>
                <div>Market Cap : {details?.market_data?.market_cap.usd}</div>
                <div>24Hr Change: {details?.market_data?.price_change_24h}%</div>
                <div>Total Volume: {details?.market_data?.total_volume.usd}</div>
            </div>
            <div className='description'>
                {ReactHtmlParser(details?.description.de)}
            </div>
        </div>


    )

}

export default CoinDetail
