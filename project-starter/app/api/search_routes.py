from flask import Blueprint, jsonify
from app.models import Coin
from flask_login import login_required
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)


@search_routes.route('/<str:coin>')
@login_required
def search(coin):
    coinDetail = Coin.query.filter(or_(Coin.name == coin, Coin.ticker == coin))

    return coinDetail
