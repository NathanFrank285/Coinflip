from flask import Blueprint
from flask_login import login_required
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

coinDetail_routes = Blueprint('coindetail', __name__)


@coinDetail_routes.route('/<name>')
@login_required
def index(name):
    data = cg.get_coin_by_id(name)
    print('-----------------------------------')
    return {'coin': data}
