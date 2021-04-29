from flask import Blueprint
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Coin, Portfolio
from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()
portfolio_routes = Blueprint('portfolio', __name__)

@portfolio_routes.route('')
@login_required
def getPortfolio():
  userId = current_user.id
  portfolioData = Portfolio.query.join(Coin).filter(
      Portfolio.userId == userId).all()
  portfolio = {}
  portfolioSum = 0
  for row in portfolioData:
    data = cg.get_price(ids=f'{row.coinInfo.ticker}', vs_currencies='usd', include_market_cap='true', include_24hr_vol='true', include_24hr_change='true', include_last_updated_at='true')
    print(data, "here is the data!!!!!!!!!!!!!!")
    portfolio[f'{row.coinInfo.ticker}'] = {
      'Ticker': row.coinInfo.ticker,
      'Name': row.coinInfo.name,
      'Quantity': row.quantity,
      'AveragePrice': row.averagePrice,
      'coinId': row.coinId,
      'coinData': data[f"{row.coinInfo.ticker}"]
    }
    portfolioSum = portfolioSum + (row.quantity*data[f"{row.coinInfo.ticker}"]['usd'])

  return {'Portfolio': portfolio, 'PortfolioTotalUsd': portfolioSum}
