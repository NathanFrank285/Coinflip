import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Splash from "./components/Splash";
import SplashNav from "./components/SplashNav"
import Portfolio from "./components/Portfolio";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CoinDetail from "./components/CoinDetail"
import SearchList from "./components/SearchList"
import CoinBrowser from "./components/CoinBrowser"
import Footer from "./components/Footer"
import LoginForm from "./components/auth/LoginForm"
import SignUpForm from "./components/auth/SignUpForm"

import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <SplashNav />
          <Splash />
          <Footer />
        </Route>
        <Route path="/login" exact={true}>
          <SplashNav />
          <LoginForm />
          <Footer />
        </Route>
        <Route path="/signUp" exact={true}>
          <SplashNav />
          <SignUpForm />
          <Footer />
        </Route>
        <ProtectedRoute path="/portfolio">
          <NavBar />
          <Portfolio />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/searchList">
          <NavBar />
          <SearchList />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/coinBrowser">
          <NavBar />
          <CoinBrowser />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/coindetail/:name">
          <NavBar />
          <CoinDetail />
          <Footer />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
