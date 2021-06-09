import React from "react";
import WatchList from '../WatchList'
import PortfolioGraph from '../PortfolioGraph'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioThunk } from "../../store/portfolio";
import './portfolio.css'
import DepositsWithdrawals from "../DepositsWithdrawals";
import { getDollarAmountThunk } from "../../store/accountUSD";


const Portfolio = () => {
    const portfolio = useSelector((state) => state?.portfolio?.Portfolio);
    const totalPortfolio = useSelector(state => state?.portfolio?.PortfolioBalance);
    const USDBalance = useSelector(state => state?.USDBalance?.balance);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPortfolioThunk());
        dispatch(getDollarAmountThunk())
    }, []);

    let total = 0

    if (portfolio) {
        total = totalPortfolio.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        })
    }
    let USDTotal;
    if (USDBalance) {
         USDTotal = USDBalance.toLocaleString("en-US", {
           style: "currency",
           currency: "USD",
         });
    }
    return (
      <div className="port-page">
        <div className="balanceDeposits-container">
          <div className="balances">
            <div className="port-balance">Total Balance: {total}</div>
            <div className="USD-balance">USD Balance: {USDTotal} </div>
          </div>
          <div className="despositWithdrawals-container">
            <DepositsWithdrawals />
          </div>
        </div>

        <div className="port-container">
          <div className="port-table">
            <PortfolioGraph />
          </div>
          <div className="watch-div">
            <div className="watchlist-title">WATCHLIST</div>
            <WatchList />
          </div>
        </div>
      </div>
    );
}

export default Portfolio
