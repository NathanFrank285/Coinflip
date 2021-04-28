import React from 'react';
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinDetailThunk } from "../../store/coinDetail";
import { deleteFromWatchlist, addToWatchlist } from "../../store/watchlist";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import './CoinDetail.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const CoinDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { name } = useParams()
    const details = useSelector(state => state?.coinDetail?.coin)
    const inWatchlist = useSelector(state => state?.coinDetail?.inWatchlist)
    const chartData = useSelector(state => state?.coinDetail?.prices)
    const badSearch = useSelector(state => state?.coinDetail?.search)
    const [watchlistStatus, setWatchlistStatus] = useState("");

    const formatCash = (n) => {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
    };


    useEffect(() => {
      dispatch(getCoinDetailThunk(name));
    }, [watchlistStatus]);


    if (badSearch === "bad search") {
        history.go(0)
        history.push('/portfolio')
    }


    console.log("ws",watchlistStatus, "inwl", inWatchlist,"name", name);

    const addToWatchlist = () => {
        console.log('I am a console fucking log')
    //     dispatch(addToWatchlist(name));
    //     // setWatchlistStatus(true)
    }

    const removeFromWatchlist = () => {
        dispatch(deleteFromWatchlist(name));
        setWatchlistStatus(false)
    };


    return (
      <div className="priceDetailContainer">
        <div className="header">
          <span>
            <h1>{details?.name}</h1>

            <h2>{details?.symbol.toUpperCase()}</h2>
          </span>
          <span>
            <img src={details?.image.small}></img>
          </span>
          <div>
            {inWatchlist == true && (
              <button
                onClick={removeFromWatchlist}
                className="removeFromWatchList"
              >
                Remove From Watch List
              </button>
            )}

            {inWatchlist == false && (
              <button onClick={addToWatchlist} className="addToWatchList">
                Add to Watch List
              </button>
            )}
          </div>
        </div>
        <div className="graphDiv">
          <LineChart
            width={730}
            height={400}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="maketDetail">
          <div>
            Current Price:{" "}
            {details?.market_data?.current_price.usd.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div>
            Total Supply: {formatCash(details?.market_data?.circulating_supply)}
          </div>
          <div>
            Market Cap : {formatCash(details?.market_data?.market_cap.usd)}
          </div>
          <div>
            24Hr Change:{" "}
            {details?.market_data?.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div>
            Total Volume: {formatCash(details?.market_data?.total_volume.usd)}
          </div>
        </div>
        <div className="description">
          {ReactHtmlParser(details?.description.de)}
        </div>
      </div>
    );

}

export default CoinDetail
