import React from "react";
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioThunk } from "../../store/portfolio";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "./PortfolioGraph.css";


export default function PortfolioGraph() {
  const portfolio = useSelector(state => state?.portfolio?.Portfolio)


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPortfolioThunk());
  }, []);

  const useStyles = makeStyles({
    table: {
        minWidth: 650,
        maxWidth: 1200,
    },
});

const classes = useStyles()

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function createData(name, price, dailychange, performance, volume) {
    return { name, price, dailychange, performance, volume};
}

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const formatCash = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
};

let rows;
let table;

if(portfolio){
  let portVals = Object.values(portfolio)
  rows = portVals?.map(coin => {
    console.log(coin, "LLLLLLLLLLLLLLLLLLLLLLL")
    console.log(coin.coinData.usd, "CCCCCCCCCCCCCCCCCCCCCCCCC")
      // const name = Object.keys(coin)
      return createData(
        coin.Name,
        coin.coinData.usd,
        coin.coinData.usd_24h_change,
        coin.coinData.usd_24h_vol,
        coin.coinData.usd_market_cap
      );
  })
  console.log(rows, "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
}


// if(portfolio){


  // const tickers = Object.keys(portfolio)
  // console.log(crows, "TTTTTTTTTTTTTTTTT")
  // for(let coin of tickers){
    // console.log(portfolio[`${coin}`]["Name"], "here is the coin!!")
  //   return
    // createData(
    //   // portfolio[`${coin}`]["Name"],
    //   // portfolio.coin[`coinData`].usd,
    //   // portfolio.coin[`coinData`].usd_24h_change,
    //   // (portfolio.coin[`coinData`].usd),
    //   // portfolio.coin[`coinData`].usd_24h_vol
    // );
  // }
// }


// usd: 54816, usd_24h_change: 0.2844488253537837, usd_24h_vol: 46893571860.279526, usd_market_cap: 1024712665930.4342}
if(rows){
  console.log(rows[0].change, "---------------------------------")
  table = (
    <div className="portfolio-body">
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="browser-head">Name</TableCell>
                <TableCell className="browser-head" align="right">
                  Price
                </TableCell>
                <TableCell className="browser-head" align="right">
                  24hr Change
                </TableCell>
                <TableCell className="browser-head" align="right">
                  Performance
                </TableCell>
                <TableCell className="browser-head" align="right">
                  Volume
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row?.name}>
                  <TableCell component="th" scope="row">
                    <NavLink
                      className="browser-link"
                      to={`/coinDetail/${row.name}`}
                    >
                      {row.name}
                    </NavLink>
                  </TableCell>
                  <TableCell align="right" className="browser-data">
                    {"$" + row.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" className="browser-data">
                    {"%" + row.dailychange.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" className="browser-data">
                    {formatCash(row?.volume)}
                  </TableCell>
                  <TableCell align="right" className="browser-data">
                    {formatCash(row?.marketCap)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
} else {
  table = (
    <div></div>
  )
}


return (
  <>
    {table}
  </>
);
}
