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

    db.session.add(bitcoin)
    db.session.commit()


def seed_portfolio():
    demo = Portfolio(userId=1, coinId=1, quantity=5, averagePrice=50000)

    db.session.add(demo)
    db.session.commit()


def seed_watchlist():
    demo = Watchlist(userId=1, coinId=1)

    db.session.add(demo)
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
