from flask import Blueprint, jsonify
from app.models import Coin
from flask_login import login_required
from sqlalchemy import or_
from pycoingecko import CoinGeckoAPI
import re
cg = CoinGeckoAPI()

search_routes = Blueprint('search', __name__)


@search_routes.route('/<coin>')
@login_required
def search(coin):
 
    coins = Coin.query.filter(
        or_(Coin.name.ilike(f"%{coin}%"), Coin.ticker.ilike(f"%{coin}%"), Coin.symbol.ilike(f"%{coin}%"))).all()
    coinDict = {coin.name: coin.to_dict() for coin in coins}
    searchDict = []
    for match in coins:
        one = cg.get_coin_by_id(match.ticker)
        searchDict.append({'name': one['name'], 'image': one['image']
                           ['small'], 'price': one['market_data']['current_price']['usd'], 'ticker': one['id'], 'priceChange': one['market_data']['price_change_percentage_24h']})

    return {'search': searchDict}
