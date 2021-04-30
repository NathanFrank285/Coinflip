import React from 'react';
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinDetailThunk } from "../../store/coinDetail";
import { deleteFromWatchlist, addToWatchlist } from "../../store/watchlist";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import './CoinDetail.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { addToPortfolio, getPortfolioThunk, removeFromPortfolioThunk } from '../../store/portfolio'


const CoinDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name } = useParams()
  const details = useSelector(state => state?.coinDetail?.coin)
  const portfolio = useSelector(state => state?.portfolio?.Portfolio)

  const inWatchlist = useSelector(state => state?.coinDetail?.inWatchlist)
  const chartData24Hr = useSelector(state => state?.coinDetail?.prices24hr)
  const chartData30 = useSelector(state => state?.coinDetail?.prices30)
  const chartData300 = useSelector(state => state?.coinDetail?.prices300)
  const chartData7days = useSelector(state => state?.coinDetail?.prices7days)
  const badSearch = useSelector(state => state?.coinDetail?.search)
  const [portfolioClicked, setPortfolioClicked] = useState('')
  const [watchlistStatus, setWatchlistStatus] = useState("");
  const [graphStatus, setGraphStatus] = useState(chartData24Hr);
  const [quantity, setQuantity] = useState(0)
  const [inPortfolio, setInPortfolio] = useState('')


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
  const addToPortfolioSubmit = (e) => {
    e.preventDefault()
    const data = {
      coinId: details.id,
      quantity: quantity,
      averagePrice: details?.market_data?.current_price?.usd
    }
    setInPortfolio(true)
    setPortfolioClicked(false)
    dispatch(addToPortfolio(data))
  }
  const removeFromPortfolio = (e) => {
    dispatch(removeFromPortfolioThunk(name))
    setInPortfolio(false)
  }
  useEffect(() => {
    dispatch(getPortfolioThunk());
  }, [removeFromPortfolio]);


  return (
    <div className="price-detail-container">
      <div className="header">
        <div className='header-info-container'>
          <div className="detail-coin-name">{details?.name}</div>
          <div className="detail-coin-symbol">
            {details?.symbol.toUpperCase()}
          </div>
        </div>
        <div className="detail-coin-image-container">
          <img className="detail-coin-image" src={details?.image.small} />
        </div>
        <div className="detail-button-container">
          {inWatchlist == true && (
            <button
              onClick={removeFromWatchlist}
              className="removeFromWatchList detail-watchlist-button"
            >
              Remove From Watch List
            </button>
          )}

          {inWatchlist == false && (
            <button
              onClick={addTolist}
              className="addToWatchList detail-watchlist-button"
            >
              Add to Watch List
            </button>
          )}
        </div>
      </div>
      <div className="graph-div">
        <div className='detail-graph'>
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
        </div>
        {portfolioClicked ? <form onSubmit={addToPortfolioSubmit}>

          <label for='quantity'>Quantity in coins</label>
          <input onChange={(e) => setQuantity(e.target.value)} name='quantity' type='number'></input>
          <button type='submit'>Add to Portfolio</button>
        </form> :
          <div className="graph-buttons-container">
            <button
              className="graph-buttons"
              onClick={() => graphStatusSetter("24")}
            >
              24Hr
        </button>
            <button
              className="graph-buttons"
              onClick={() => graphStatusSetter("7")}
            >
              7 Days
        </button>
            <button
              className="graph-buttons"
              onClick={() => graphStatusSetter("30")}
            >
              30 days
        </button>
            <button
              className="graph-buttons"
              onClick={() => graphStatusSetter("300")}
            >
              300 days
        </button>
            {!inPortfolio && !portfolio[`${name}`] ?
              <button onClick={() => setPortfolioClicked(true)} className='graph-buttons'>Add to Portfolio </button>
              :
              <button onClick={removeFromPortfolio} className='graph-buttons'>Remove from Portfolio </button>
            }
          </div>
        }
      </div>
      <div className="market-detail">
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
