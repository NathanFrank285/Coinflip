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

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
            maxWidth: 1200,
        },
    });

    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    function createData(name, price, change, volume, marketCap) {
        return { name, price, change, volume, marketCap };
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

    const rows = coinBrowser?.map(coin => {
        const name = Object.keys(coin)
        return createData(
          name,
          coin[`${name[0]}`].usd,
          coin[`${name[0]}`].usd_24h_change,
          coin[`${name[0]}`].usd_24h_vol,
          coin[`${name[0]}`].usd_market_cap
        );
    })
    // usd: 54816, usd_24h_change: 0.2844488253537837, usd_24h_vol: 46893571860.279526, usd_market_cap: 1024712665930.4342}
  const classes = useStyles();
  console.log("rows!!!!!!!!", rows)
  return (
    <div className="coinBrowser-body">
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
                  Change
                </TableCell>
                <TableCell className="browser-head" align="right">
                  Volume
                </TableCell>
                <TableCell className="browser-head" align="right">
                  Market Cap
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
                    {"$" + row?.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" className="browser-data">
                    {row?.change.toFixed(2) + "%"}
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
  );
}
