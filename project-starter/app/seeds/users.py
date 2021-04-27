# from werkzeug.security import generate_password_hash
from app.models import db, User, Coin, Portfolio, Watchlist, Trade


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password')
    db.session.add(demo)
    db.session.commit()


def seed_coins():
    bitcoin = Coin(name='Bitcoin', ticker='bitcoin')
    ethereum = Coin(name='Ethereum', ticker='ethereum')
    dogecoin = Coin(name='Dogecoin', ticker='dogecoin')
    basicAttentionToken = Coin(
        name='Basic Attention Token', ticker='basic-attention-token')
    litecoin = Coin(name='Litecoin', ticker='litecoin')
    cardano = Coin(name='Cardano', ticker='cardano')
    polkadot = Coin(name='Polkadot', ticker='polkadot')
    bitcoinCash = Coin(name='Bitcoin Cash', ticker='bitcoin-cash')
    stellar = Coin(name='Stellar', ticker='stellar')
    tether = Coin(name='Tether', ticker='tether')
    monero = Coin(name='Monero', ticker='monero')
    ripple = Coin(name='Ripple', ticker='ripple')
    usdCoin = Coin(name='USD Coin', ticker='usd-coin')

    coins = [bitcoin, ethereum, dogecoin, basicAttentionToken, litecoin, cardano, polkadot, bitcoinCash, stellar, tether, monero, ripple, usdCoin]
    for coin in coins:
        db.session.add(coin)
    db.session.commit()


def seed_portfolio():
    demo = Portfolio(userId=1, coinId=1, quantity=5, averagePrice=50000)

    db.session.add(demo)
    db.session.commit()


def seed_watchlist():
    demo1 = Watchlist(userId=1, coinId=1)
    demo2 = Watchlist(userId=1, coinId=2)
    demo3 = Watchlist(userId=1, coinId=3)
    demo4 = Watchlist(userId=1, coinId=4)
    demo5 = Watchlist(userId=1, coinId=5)
    demo6 = Watchlist(userId=1, coinId=6)
    demo7 = Watchlist(userId=1, coinId=7)

    demos = [demo1, demo2, demo3, demo4, demo5, demo6, demo7]
    db.session.add_all(demos)
    db.session.commit()


def seed_trades():
    demo = Trade(tradePrice=10000, tradeSize=5, buyOrSell='buy',
                 dateOfTrade='04-25-2021', userId=1, coinId=1)

    db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


def undo_coins():
    db.session.execute('TRUNCATE coins RESTART IDENTITY CASCADE;')
    db.session.commit()


def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()


def undo_trades():
    db.session.execute('TRUNCATE trades RESTART IDENTITY CASCADE;')
    db.session.commit()
