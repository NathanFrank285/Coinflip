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
  for row in portfolioData:
    data = cg.get_price(ids=f'{row.coinInfo.ticker}', vs_currencies='usd', include_market_cap='true', include_24hr_vol='true', include_24hr_change='true', include_last_updated_at='true')
    print(data, "here is the data!!!!!!!!!!!!!!")
    # {'bitcoin': {'usd': 54697, 'usd_market_cap': 1022998512561.4462, 'usd_24h_vol': 48358885951.45435, 'usd_24h_change': -0.6118487157235886, 'last_updated_at': 1619652063}}
    portfolio[f'{row.coinInfo.ticker}'] = {
      'Ticker': row.coinInfo.ticker,
      'Name': row.coinInfo.name,
      'Quantity': row.quantity,
      'AveragePrice': row.averagePrice,
      'coinId': row.coinId,
      'coinData': data[f"{row.coinInfo.ticker}"]
    }
  # print("------------",dir( portfolioData))
  # portfolio = [for row in portfolioData]

  return {'Portfolio': portfolio}
  # return {'data': portfolioData}
