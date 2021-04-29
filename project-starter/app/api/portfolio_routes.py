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
  tickers = []
  for row in portfolioData:
    data = cg.get_price(ids=f'{row.coinInfo.ticker}', vs_currencies='usd', include_market_cap='true', include_24hr_vol='true', include_24hr_change='true', include_last_updated_at='true')
    tickers.append(row.coinInfo.ticker)
    portfolio[f'{row.coinInfo.ticker}'] = {
      'Ticker': row.coinInfo.ticker,
      'Name': row.coinInfo.name,
      'Quantity': row.quantity,
      'AveragePrice': row.averagePrice,
      'coinId': row.coinId,
      'coinData': data[f"{row.coinInfo.ticker}"]
    }
    portfolioSum = portfolioSum + (row.quantity*data[f"{row.coinInfo.ticker}"]['usd'])
  print(tickers)
  def getHistory24(ticker):
    return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=1)

  def getHistory7(ticker):
    return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=7)

  def getHistory30(ticker):
    return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=30)

  def getHistory300(ticker):
    return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=300)

  # historic_prices24 = []
  # historic_prices7 = []
  # historic_prices30 = []
  # historic_prices300 = []
  # history24hr = getHistory24(ticker)
  # history7 = getHistory7(ticker)
  # history30 = getHistory30(ticker)
  # history300 = getHistory300(ticker)
  # for price in history24hr['prices']:
  #     historic_prices24.append({'price': price[1]})
  # for price in history7['prices']:
  #     historic_prices7.append({'price': price[1]})
  # for price in history30['prices']:
  #     historic_prices30.append({'price': price[1]})
  # for price in history300['prices']:
  #     historic_prices300.append({'price': price[1]})

  return {'Portfolio': portfolio, 'PortfolioTotalUsd': portfolioSum}


@portfolio_routes.route('/<ticker>')
@login_required
def addToPortfolio(ticker):
  return {}
