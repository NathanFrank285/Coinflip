import React from "react";
import { NavLink } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoinBrowserThunk} from '../../store/coinBrowser'
import './CoinBrowser.css'



export default function CoinBrowser() {
    const dispatch = useDispatch();
    const coinBrowser = useSelector(state => state?.coinBrowser?.coinBrowserArray)

    useEffect(() => {
        dispatch(getCoinBrowserThunk());
    }, [])

    const useStyles = makeStyles((theme) => ({
      table: {
        minWidth: 'auto',
        maxWidth: "auto",
        backgroundColor: "#e1fcf9",
        fontFamily: "inherit",
        [theme.breakpoints.down(650)]: {
          minWidth: 400,
          maxWidth: 500,
        },
      },
      header: {
        fontFamily: "inherit",
        fontSize: 30,
        fontWeight: 600,
        [theme.breakpoints.down(1200)]: {
          fontSize: 22,
          fontWeight: 600,
        },
        [theme.breakpoints.down(650)]: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
      dataName: {
        fontFamily: "inherit",
        fontSize: 26,
        [theme.breakpoints.down(1200)]: {
          fontSize: 18,
        },
        [theme.breakpoints.down(650)]: {
          fontSize: 14,
        },
      },
      dataPoints: {
        fontFamily: "inherit",
        fontSize: 22,
        [theme.breakpoints.down(1200)]: {
          fontSize: 18,
        },
        [theme.breakpoints.down(650)]: {
          fontSize: 12,
        },
      },
      positive: {
        color: "green",
      },
      negative: {
        color: "red",
      },
    }));
    const classes = useStyles();

    function createData(name, price, change, volume, marketCap, ticker) {
        return { name, price, change, volume, marketCap,ticker };
    }

    const formatCash = (n) => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
    };



    const rows = coinBrowser?.map(coin => {
        const name = Object.keys(coin)
        return createData(
          coin[`${name}`].Name,
          coin[`${name[0]}`].usd,
          coin[`${name[0]}`].usd_24h_change,
          coin[`${name[0]}`].usd_24h_vol,
          coin[`${name[0]}`].usd_market_cap,
          name
        );
    })


  return (
    <div className="coinBrowser-body">
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow >
                <TableCell className={classes.header}>Name</TableCell>
                <TableCell className={classes.header} align="right">
                  Price
                </TableCell>
                <TableCell className={classes.header} align="right">
                  Change
                </TableCell>
                <TableCell className={classes.header} align="right">
                  Volume
                </TableCell>
                <TableCell className={classes.header} align="right">
                  Market Cap
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
                    {"$" + row?.price.toFixed(2)}
                  </TableCell>
                  {row?.change > 0 ? (
                    <TableCell
                      align="right"
                      className={`${classes.dataPoints} ${classes.positive}`}
                    >
                      {"+" + row?.change.toFixed(2) + "%"}
                    </TableCell>
                  ) : (
                    <TableCell
                      align="right"
                      className={`${classes.dataPoints} ${classes.negative}`}
                    >
                      {row?.change.toFixed(2) + "%"}
                    </TableCell>
                  )}

                  <TableCell align="right" className={classes.dataPoints}>
                    {formatCash(row?.volume)}
                  </TableCell>
                  <TableCell align="right" className={classes.dataPoints}>
                    {formatCash(row?.marketCap)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
