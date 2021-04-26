from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Watchlist, Coin


watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('/')
@login_required
def index():
    id = current_user.id
    # user_watchlist = Watchlist.query.join(
    #     Coin).filter(Watchlist.userId == id).all()
    user_watchlist = Watchlist.query.filter(Watchlist.userId == id).all()
    list = []
    for row in user_watchlist:
        # list.append(Coin.query.filter(Coin.id == row.coinId).all())
        list.append(Coin.query.get(row.coinId))
    # user_list = [{'id': row.id, 'coinId': row.coinId, 'userId': row.userId}
    #              for row in user_watchlist]
    # for row in user_watchlist:

    # return {'data': user_list}
    print(dir(list[0]))
    myCoins = [{'ticker': coin.ticker} for coin in list]
    print(myCoins)
    return {
        'tickers':  myCoins
    }


@watchlist_routes.route('/<int:id>', methods=['POST'])
@login_required
def watchListPost(id):
    currentUserId = current_user.id
    coinId = id

    newItem = Watchlist(currentUserId, coinId)
    db.session.add(newItem)
    db.session.commit()

    return
