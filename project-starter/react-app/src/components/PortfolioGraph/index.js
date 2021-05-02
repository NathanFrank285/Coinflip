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
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";
import "./PortfolioGraph.css";


export default function PortfolioGraph() {
  const portfolio = useSelector((state) => state?.portfolio?.Portfolio);
  const totalPortfolio = useSelector(state => state?.portfolio?.PortfolioTotalUsd)
  // const chartData24Hr = useSelector(state => state?.coinDetail?.prices24hr)
  // const chartData30 = useSelector(state => state?.coinDetail?.prices30)
  // const chartData300 = useSelector(state => state?.coinDetail?.prices300)
  // const chartData7days = useSelector(state => state?.coinDetail?.prices7days)
  // const [graphStatus, setGraphStatus] = useState(chartData24Hr);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPortfolioThunk());
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 800,
      maxWidth: "auto",
      backgroundColor: "#e1fcf9",
      fontFamily: "inherit",
    },
    header: {
      fontFamily: "inherit",
      fontSize: 30,
      fontWeight: 600,
    },
    dataName: {
      fontFamily: "inherit",
      fontSize: 26,
    },
    dataPoints: {
      fontFamily: "inherit",
      fontSize: 22,
    },
    positive: {
      color: "green",
    },
    negative: {
      color: "red",
    },
  });

  const classes = useStyles();

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  function createData(name, price, balance, performance, allocation, ticker) {
    return { name, price, balance, performance, allocation, ticker };
  }

  // const graphStatusSetter = (time) => {
  //   if (time === '24') {
  //     setGraphStatus(chartData24Hr)
  //   }
  //   if (time === '7') {
  //     setGraphStatus(chartData7days)
  //   }
  //   if (time === '30') {
  //     setGraphStatus(chartData30)
  //   }
  //   if (time === '300') {
  //     setGraphStatus(chartData300)
  //   }
  // }

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
  };

  let rows;
  let table;

  if (portfolio) {
    let portVals = Object.values(portfolio);
    rows = portVals?.map((coin) => {
      return createData(
        coin.Name,
        coin.coinData.usd,
        coin.Quantity * coin.coinData.usd,
        (coin.coinData.usd / coin.AveragePrice - 1) * 100,
        (((coin.Quantity * coin.coinData.usd)/totalPortfolio)*100),
        coin.Ticker
      );
    });
  }

  if (rows) {
    table = (
      // <div className="portfolio-body">
        // <div className="table-container">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.header}>Name</TableCell>
                  <TableCell className={classes.header} align="right">
                    Price
                  </TableCell>
                  <TableCell className={classes.header} align="right">
                    Balance
                  </TableCell>
                  <TableCell className={classes.header} align="right">
                    Performance
                  </TableCell>
                  <TableCell className={classes.header} align="right">
                    Allocation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => (
                  <TableRow key={row?.name}>
                    <TableCell component="th" scope="row">
                      <NavLink
                        className={"browser-link"}
                        to={`/coinDetail/${row.ticker}`}
                      >
                        {row.name}
                      </NavLink>
                    </TableCell>
                    <TableCell align="right" className={classes.dataPoints}>
                      {row.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell align="right" className={classes.dataPoints}>
                      {row.balance.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    {row?.performance >= 0 ? (
                      <TableCell
                        align="right"
                        className={`${classes.dataPoints} ${classes.positive}`}
                      >
                        {row?.performance.toFixed(2) + "%"}
                      </TableCell>
                    ) : (
                      <TableCell
                        align="right"
                        className={`${classes.dataPoints} ${classes.negative}`}
                      >
                        {row?.performance.toFixed(2) + "%"}
                      </TableCell>
                    )}
                    <TableCell align="right" className={classes.dataPoints}>
                      {formatCash(row?.allocation.toFixed(2)) + "%"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        // </div>
      // </div>
    );
  } else {
    table = <div></div>;
  }

  return(
        <div>
          {/* <div className="graphDiv">
            <LineChart
            width={730}
            height={400}
            data={graphStatus}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <Line type="linear" dataKey="price" stroke="#8884d8" />
            </LineChart>
            <div>
              <button onClick={() => (graphStatusSetter('24'))}>24Hr</button>
              <button onClick={() => (graphStatusSetter('7'))}>7 Days</button>
              <button onClick={() => (graphStatusSetter('30'))}>30 days</button>
              <button onClick={() => (graphStatusSetter('300'))}>300 days</button>
            </div>
          </div> */}
          {table}
        </div>
       )
}
