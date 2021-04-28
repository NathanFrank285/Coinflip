from flask import Blueprint
from flask_login import login_required
from app.models import Coin, db
from pycoingecko import CoinGeckoAPI
from datetime import datetime, timedelta
cg = CoinGeckoAPI()

coinDetail_routes = Blueprint('coindetail', __name__)


@coinDetail_routes.route('/<ticker>')
@login_required
def index(ticker):
    coinExist = Coin.query.filter(Coin.ticker.ilike(f"%{ticker}%")).first()

    def getHistory(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=1)

    try:
        inAPI = cg.get_coin_by_id(ticker)['name']
    except ValueError:
        return {'search': 'bad search'}

    if(not coinExist and inAPI):
        # print("------------ known coin loop")
        history = getHistory(ticker)
        historic_prices = []
        for price in history['prices']:
            historic_prices.append({'price': price[1]})
        # print(historic_prices)
        newCoin = Coin()
        newCoin.ticker = ticker
        newCoin.name = cg.get_coin_by_id(ticker)['name']
        db.session.add(newCoin)
        db.session.commit()
        data = cg.get_coin_by_id(ticker)
        return {'coin': data, '24hr_prices': historic_prices}
    historic_prices = []
    history = getHistory(ticker)
    for price in history['prices']:
        historic_prices.append({'price': price[1]})
    # print(historic_prices)

    data = cg.get_coin_by_id(ticker)
    return {'coin': data, 'prices': historic_prices}
