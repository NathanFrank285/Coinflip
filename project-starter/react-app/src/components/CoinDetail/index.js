import React from 'react';
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinDetailThunk } from "../../store/coinDetail";
import { deleteFromWatchlist, addToWatchlist } from "../../store/watchlist";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import './CoinDetail.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CoinDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name } = useParams()
  const details = useSelector(state => state?.coinDetail?.coin)
  const inWatchlist = useSelector(state => state?.coinDetail?.inWatchlist)
  const chartData24Hr = useSelector(state => state?.coinDetail?.prices24hr)
  const chartData30 = useSelector(state => state?.coinDetail?.prices30)
  const chartData300 = useSelector(state => state?.coinDetail?.prices300)
  const chartData7days = useSelector(state => state?.coinDetail?.prices7days)
  const badSearch = useSelector(state => state?.coinDetail?.search)
  const [watchlistStatus, setWatchlistStatus] = useState("");
  const [graphStatus, setGraphStatus] = useState(chartData24Hr);


  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
  };


  useEffect(() => {
    dispatch(getCoinDetailThunk(name));
    console.log(watchlistStatus)
  }, [watchlistStatus]);



  if (badSearch === "bad search") {
    history.go(0)
    history.push('/portfolio')
  }

  const addTolist = () => {
    dispatch(addToWatchlist(name));
    setWatchlistStatus(true)
  }

  const removeFromWatchlist = () => {
    dispatch(deleteFromWatchlist(name));
    setWatchlistStatus(false)
  };
  const graphStatusSetter = (time) => {
    if (time === '24') {
      setGraphStatus(chartData24Hr)
    }
    if (time === '7') {
      setGraphStatus(chartData7days)
    }
    if (time === '30') {
      setGraphStatus(chartData30)
    }
    if (time === '300') {
      setGraphStatus(chartData300)
    }
  }


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
            <button onClick={addTolist} className="addToWatchList">
              Add to Watch List
            </button>
          )}
        </div>
      </div>
      <div className="graphDiv">
        <ResponsiveContainer
          width='100%'
          height={400}
        >
          <LineChart

            data={graphStatus ? graphStatus : chartData24Hr}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <YAxis domain={["auto", "auto"]} />
            <XAxis type='category' dataKey='date' domain={['auto', 'auto']} />
            <Tooltip />

            <Line type="linear" dot={false} dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <div>
          <button onClick={() => (graphStatusSetter('24'))}>24Hr</button>
          <button onClick={() => (graphStatusSetter('7'))}>7 Days</button>
          <button onClick={() => (graphStatusSetter('30'))}>30 days</button>
          <button onClick={() => (graphStatusSetter('300'))}>300 days</button>
        </div>
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
