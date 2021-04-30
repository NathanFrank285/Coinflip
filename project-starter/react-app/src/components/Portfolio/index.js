import React from "react";
import WatchList from '../WatchList'
import PortfolioGraph from '../PortfolioGraph'
import './portfolio.css'

const Portfolio = () => {
    return (
        <div className="port-page">
            <div className="port-container">
                <div className="port-table">
                    <PortfolioGraph />
                </div>
                <div className="watch-div">
                    <WatchList />
                </div>
            </div>
        </div>
    )
}

export default Portfolio
