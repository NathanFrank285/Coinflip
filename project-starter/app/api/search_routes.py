from flask import Blueprint, jsonify
from app.models import Coin
from flask_login import login_required
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)


@search_routes.route('/<coin>')
@login_required
def search(coin):

    coins = Coin.query.filter(Coin.name.ilike(f"%{coin}%")).all()
    print(coins)
    return coins
