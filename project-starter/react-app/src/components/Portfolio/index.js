import React from "react";
import WatchList from '../WatchList'
import PortfolioGraph from '../PortfolioGraph'
const Portfolio = () => {
    return (
        <div>
            <div>
                <PortfolioGraph />
            </div>
            <div>
                <WatchList />
            </div>
        </div>
    )
}

export default Portfolio
