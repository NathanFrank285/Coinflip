from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Watchlist, Coin
from pycoingecko import CoinGeckoAPI


cg = CoinGeckoAPI()
watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('')
@login_required
def index():
    id = current_user.id
    user_watchlist = Watchlist.query.filter(Watchlist.userId == id).all()
    print(user_watchlist)
    list = []
    for row in user_watchlist:
        list.append(Coin.query.get(row.coinId))
    #* myCoins is an array of coins that user has on their watchlist
    myCoins = [coin.ticker for coin in list]
    #todo loop through mycoins, perform the api call for each coin, structure into an object with each coin name as the key, send to thunk
    watchlist = []
    for coin in myCoins:
        data = cg.get_price(ids=f'{coin}', vs_currencies='usd', include_market_cap='true',
                     include_24hr_vol='true', include_24hr_change='true', include_last_updated_at='true')
        print(data)
        watchlist.append(data)
        print(watchlist)

    return {"watchlist": watchlist}


@watchlist_routes.route('/<id>', methods=['post'])
@login_required
def watchListPost(id):
    currentUserId = current_user.id
    coinId = id

    newItem = Watchlist()

    newItem.userId = currentUserId
    newItem.coinId = coinId

    db.session.add(newItem)
    db.session.commit()

    return "Success"


@watchlist_routes.route('/<id>', methods=['delete'])
# @login_required
def watchListDelete(id):
    # currentUserId = current_user.id
    currentUserId = 1
    coinId = id

    delete_item = Watchlist.query.filter(Watchlist.userId == currentUserId).filter(
        Watchlist.coinId == coinId).first()

    db.session.delete(delete_item)
    db.session.commit()

    return "crushed it"
