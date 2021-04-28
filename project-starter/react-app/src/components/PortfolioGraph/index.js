import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioThunk } from "../../store/portfolio";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortfolioThunk());
  }, []);
  return "this is my graph";
}
