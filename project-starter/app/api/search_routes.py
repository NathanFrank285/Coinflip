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
    # coins = cg.get_coins_list()
    # coinIds = [coin['id'] for coin in coins]
    # print(coinIds)

    # for id in coinIds:
    #     if re.match(rf'{coin}', id):
    #         matchs.append(id)
    # print(matchs)
    coins = Coin.query.filter(
        or_(Coin.name.ilike(f"%{coin}%"), Coin.ticker.ilike(f"%{coin}%"))).all()
    coinDict = {coin.name: coin.to_dict() for coin in coins}
    # print(coinDict)
    searchDict = []
    for match in coins:
        one = cg.get_coin_by_id(match.ticker)
        searchDict.append({'name': one['name'], 'image': one['image']
                           ['small'], 'price': one['market_data']['current_price']['usd'], 'ticker': one['id'], 'priceChange': one['market_data']['price_change_percentage_24h']})
        # searchDict.update('image', one['image']['small'])
        # searchDict.update('price', one['market_data']['current_price']['usd'])

    # print(one['image']['small'])
    # print(one['name'])
    # print(one['market_data']['current_price']['usd'])
    print(searchDict)
    # # print(coins[0].to_dict())
    # print(coinDict, "======================")
    # return coinDict
    return {'search': searchDict}
