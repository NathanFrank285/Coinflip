from flask import Blueprint, jsonify, session, request
from app.models import db, Coin
from flask_login import login_required
from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()
coinBrowser_routes = Blueprint('coinBrowser', __name__)


@coinBrowser_routes.route('')
@login_required
def index():
    coins = Coin.query.all()
    list = []
    for coin in coins:
        list.append(coin.ticker)

    coinBrowserArray = []
    for ticker in list:
        # print(ticker)
        name = Coin.query.filter(Coin.ticker == ticker).first()
        data = cg.get_price(ids=f'{ticker}', vs_currencies='usd', include_market_cap='true',
                            include_24hr_vol='true', include_24hr_change='true', include_last_updated_at='true')
        data[f'{ticker}']['Name'] = name.name
        coinBrowserArray.append(data)

    return {"coinBrowserArray": coinBrowserArray}
