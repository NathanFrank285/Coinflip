from flask import Blueprint, jsonify
from app.models import Coin
from flask_login import login_required
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)


@search_routes.route('/<coin>')
@login_required
def search(coin):

    coins = Coin.query.filter(or_(Coin.name.ilike(f"%{coin}%"), Coin.ticker.ilike(f"%{coin}%"))).all()
    print(coins[0].to_dict())
    coinDict = {coin.name: coin.to_dict() for coin in coins}
    print(coinDict, "======================")
    return coinDict
