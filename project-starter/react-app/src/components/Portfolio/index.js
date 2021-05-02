import React from "react";
import WatchList from '../WatchList'
import PortfolioGraph from '../PortfolioGraph'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioThunk } from "../../store/portfolio";
import './portfolio.css'

const Portfolio = () => {
    const portfolio = useSelector((state) => state?.portfolio?.Portfolio);
    const totalPortfolio = useSelector(state => state?.portfolio?.PortfolioTotalUsd);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPortfolioThunk());
    }, []);

    let total = 0

    if (portfolio) {
        total = totalPortfolio.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        })
    }
    return (
        <div className="port-page">
            <h1 className='port-balance'>Total Balance: {total}</h1>

            <div className="port-container">
                <div className="port-table">
                    <PortfolioGraph />
                </div>
                <div className="watch-div">
                    <div className='watchlist-title'>WATCHLIST</div>
                    <WatchList />
                </div>
            </div>
        </div>
    )
}

export default Portfolio
