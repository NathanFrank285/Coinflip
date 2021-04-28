from flask import Blueprint
from flask_login import login_required
from app.models import Coin, db
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

coinDetail_routes = Blueprint('coindetail', __name__)


@coinDetail_routes.route('/<ticker>')
@login_required
def index(ticker):
  coinExist = Coin.query.filter(Coin.ticker.ilike(f"%{ticker}%")).first()
  try:
    inAPI = cg.get_coin_by_id(ticker)['name']
  except:
    return {'search': 'bad search'}

  if(not coinExist and inAPI):
    newCoin = Coin()
    newCoin.ticker = ticker
    newCoin.name = cg.get_coin_by_id(ticker)['name']
    db.session.add(newCoin)
    db.session.commit()
    data = cg.get_coin_by_id(ticker)
    return {'coin': data}



  data = cg.get_coin_by_id(ticker)
  return {'coin': data}
