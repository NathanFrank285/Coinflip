from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Coin, db, Watchlist
from pycoingecko import CoinGeckoAPI
from datetime import datetime, timedelta
from sqlalchemy import and_
from datetime import datetime
import math
cg = CoinGeckoAPI()

coinDetail_routes = Blueprint('coindetail', __name__)


@coinDetail_routes.route('/<ticker>')
@login_required
def index(ticker):
    coinExist = Coin.query.filter(Coin.ticker.ilike(f"%{ticker}%")).first()
    id = current_user.id

    def inUsersWatchlist(userId, coinId):
        output = Watchlist.query.filter(
            and_(Watchlist.userId == userId, Watchlist.coinId == coinId)).first() is not None
        if (output):
            return True
        else:
            return False

    def getHistory24(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=1)

    def getHistory7(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=7)

    def getHistory30(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=30)

    def getHistory300(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=300)

    try:
        inAPI = cg.get_coin_by_id(ticker)['name']
    except ValueError:
        return {'search': 'bad search'}

    if(not coinExist and inAPI):

        history24hr = getHistory24(ticker)
        history7 = getHistory7(ticker)
        history30 = getHistory30(ticker)
        history300 = getHistory300(ticker)
        historic_prices24 = []
        historic_prices7 = []
        historic_prices30 = []
        historic_prices300 = []

        
        for price in history24hr['prices']:
            time = price[0] / 1000
            historic_prices24.append({'price': price[1]})
            historic_prices24.append(
                {'date': datetime.fromtimestamp(price[0] / 1000)})
            # historic_prices24.append(dates)
        for price in history7['prices']:
            historic_prices7.append({'price': price[1]})
        for price in history30['prices']:
            historic_prices30.append({'price': price[1]})
        for price in history300['prices']:
            historic_prices300.append({'price': price[1]})

        newCoin = Coin()
        newCoin.ticker = ticker
        newCoin.name = cg.get_coin_by_id(ticker)['name']
        db.session.add(newCoin)
        db.session.commit()
        data = cg.get_coin_by_id(ticker)
        inWatchlist = False
        return {'coin': data, 'prices24HR': historic_prices24, 'prices7days': historic_prices7, 'prices30': historic_prices30, 'prices300': historic_prices300, 'inWatchlist': inWatchlist}

    historic_prices24 = []
    historic_prices7 = []
    historic_prices30 = []
    historic_prices300 = []
    history24hr = getHistory24(ticker)
    history7 = getHistory7(ticker)
    history30 = getHistory30(ticker)
    history300 = getHistory300(ticker)
    middle24 = math.floor(len(history24hr['prices'])/2)
    for price in history24hr['prices']:
        historic_prices24.append({'price': format(price[1], '.2f'), 'date': datetime.fromtimestamp(
            price[0] / 1000).strftime('%x')})
    for price in history7['prices']:
        historic_prices7.append({'price': format(price[1], '.2f'), 'date': datetime.fromtimestamp(
            price[0] / 1000).strftime('%x')})
    for price in history30['prices']:
        historic_prices30.append({'price': format(price[1], '.2f'), 'date': datetime.fromtimestamp(
            price[0] / 1000).strftime('%x')})
    for price in history300['prices']:
        historic_prices300.append({'price': format(price[1], '.2f'), 'date': datetime.fromtimestamp(
            price[0] / 1000).strftime('%x')})

    data = cg.get_coin_by_id(ticker)
    inWatchlist = inUsersWatchlist(id, coinExist.id)
    coinsList = cg.get_coins_list()

    return {'coin': data, 'prices24hr': historic_prices24, 'prices7days': historic_prices7, 'prices30': historic_prices30, 'prices300': historic_prices300, 'inWatchlist': inWatchlist}
