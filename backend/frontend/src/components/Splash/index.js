import React from "react";
import DarkLogo from "../../images/DarkLogo.png"
import "./splash.css"

const Splash = () => {
  // const [email, setEmail] = useState('demo@aa.io')
  // const [password, setPassword] = useState('password')

  // const loginDemoUser = async () => {
  //   await dispatch(login(email, password))
  //   history.push("/portfolio")
  // }

  return (
    <div className="splash-body">
      <img className="splash-logo" src={DarkLogo} alt="logo" />
      <img className="splash-logo-2" src={DarkLogo} alt="logo" />
      <div className="splash-title-container">
        <div className="splash-title"> Welcome to Coinflip </div>
        <div className="splash-subtitle">A CryptoTracker</div>
      </div>
      <div className="blurb">
        <div>
          Track, invest, and learn about different cryptocurrencies!
        </div>
        <div>
          Coinflip allows you to add cryptocurrencies to your personal
          portfolio, view the current price of a coin as well as view a
          graph with the price history of the coin, add coins you're
          interested in to a watchlist, and learn about some background
          information on each coin.
        </div>
      </div>
      {/* <div className="splash-forms">
        <div className="splash-login">
          <div>
            {" "}
            <LoginForm />{" "}
          </div>
          <div className="splash-demo">
            <div className="demo-label">Demo User Login</div>
            <button className="demo-btn" onClick={loginDemoUser}>
              Demo
            </button>
          </div>
        </div>
        <div className="splash-signup">
          {" "}
          <SignUpForm />{" "}
        </div>
      </div> */}
    </div>
  );
};

export default Splash;
