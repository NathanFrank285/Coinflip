from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Coin, db, Watchlist
from pycoingecko import CoinGeckoAPI
from datetime import datetime, timedelta
from sqlalchemy import and_
cg = CoinGeckoAPI()

coinDetail_routes = Blueprint('coindetail', __name__)


@coinDetail_routes.route('/<ticker>')
@login_required
def index(ticker):
    coinExist = Coin.query.filter(Coin.ticker.ilike(f"%{ticker}%")).first()
    id = current_user.id


    def inUsersWatchlist(userId, coinId):
      output = Watchlist.query.filter(and_(Watchlist.userId == userId, Watchlist.coinId == coinId)).first() is not None
      if (output):
        return True
      else:
        return False

    def getHistory(ticker):
      return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=1)

    try:
        inAPI = cg.get_coin_by_id(ticker)['name']
    except ValueError:
        return {'search': 'bad search'}

    if(not coinExist and inAPI):
        history = getHistory(ticker)
        historic_prices = []
        for price in history['prices']:
            historic_prices.append({'price': price[1]})
        newCoin = Coin()
        newCoin.ticker = ticker
        newCoin.name = cg.get_coin_by_id(ticker)['name']
        db.session.add(newCoin)
        db.session.commit()
        data = cg.get_coin_by_id(ticker)
        inWatchlist = False
        return {'coin': data, 'prices': historic_prices, 'inWatchlist': inWatchlist}
    historic_prices = []
    history = getHistory(ticker)
    for price in history['prices']:
        historic_prices.append({'price': price[1]})

    data = cg.get_coin_by_id(ticker)
    inWatchlist = inUsersWatchlist(id, coinExist.id)
    # return {'coin': data, 'prices': historic_prices}
    return {'coin': data, 'prices': historic_prices, 'inWatchlist': inWatchlist}
