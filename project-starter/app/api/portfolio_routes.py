from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Coin, Portfolio
from pycoingecko import CoinGeckoAPI
from sqlalchemy import and_

cg = CoinGeckoAPI()
portfolio_routes = Blueprint('portfolio', __name__)


@portfolio_routes.route('')
@login_required
def getPortfolio():
    userId = current_user.id
    portfolioData = Portfolio.query.join(Coin).filter(
        Portfolio.userId == userId).all()
    portfolio = {}
    portfolioSum = 0
    tickers = []
    for row in portfolioData:
        data = cg.get_price(ids=f'{row.coinInfo.ticker}', vs_currencies='usd', include_market_cap='true',
                            include_24hr_vol='true', include_24hr_change='true', include_last_updated_at='true')
        tickers.append(row.coinInfo.ticker)
        portfolio[f'{row.coinInfo.ticker}'] = {
            'Ticker': row.coinInfo.ticker,
            'Name': row.coinInfo.name,
            'Quantity': row.quantity,
            'AveragePrice': row.averagePrice,
            'coinId': row.coinId,
            'coinData': data[f"{row.coinInfo.ticker}"]
        }
        portfolioSum = portfolioSum + \
            (row.quantity*data[f"{row.coinInfo.ticker}"]['usd'])
    print(tickers)

    def getHistory24(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=1)

    def getHistory7(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=7)

    def getHistory30(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=30)

    def getHistory300(ticker):
        return cg.get_coin_market_chart_by_id(ticker, vs_currency='usd', days=300)

    # historic_prices24 = []
    # historic_prices7 = []
    # historic_prices30 = []
    # historic_prices300 = []
    # history24hr = getHistory24(ticker)
    # history7 = getHistory7(ticker)
    # history30 = getHistory30(ticker)
    # history300 = getHistory300(ticker)
    # for price in history24hr['prices']:
    #     historic_prices24.append({'price': price[1]})
    # for price in history7['prices']:
    #     historic_prices7.append({'price': price[1]})
    # for price in history30['prices']:
    #     historic_prices30.append({'price': price[1]})
    # for price in history300['prices']:
    #     historic_prices300.append({'price': price[1]})

    return {'Portfolio': portfolio, 'PortfolioTotalUsd': portfolioSum}


@portfolio_routes.route('/<ticker>', methods=['POST'])
@login_required
def addToPortfolio(ticker):
    id = current_user.id
    coinId = Coin.query.filter(Coin.ticker == ticker).first().to_dict()['id']
    already_owned_bool = Portfolio.query.filter(
        and_(Portfolio.coinId == coinId, Portfolio.userId == id)).first() is not None

    if already_owned_bool:
        already_owned = Portfolio.query.filter(
            and_(Portfolio.coinId == coinId, Portfolio.userId == id)).first()
        # print('quote version', already_owned['quantity'])
        # print('dot version', already_owned.quantity)
        already_owned.quantity = already_owned.quantity + \
            int(request.get_json()['quantity'])
        current_average = already_owned.quantity * \
            already_owned.averagePrice
        owned_sum = current_average + \
            (int(request.get_json()['quantity']) *
             int(request.get_json()['averagePrice']))
        new_average_price = (
            owned_sum / (already_owned.quantity + int(request.get_json()['quantity'])))

        already_owned.averagePrice = round(new_average_price, 2)
        print(already_owned)
        db.session.commit()
        return {}
    else:

        print(request.get_json()['quantity'])
        new_portfolio_item = Portfolio()
        new_portfolio_item.userId = id
        new_portfolio_item.coinId = coinId
        new_portfolio_item.quantity = request.get_json()['quantity']
        new_portfolio_item.averagePrice = request.get_json()['averagePrice']
        db.session.add(new_portfolio_item)
        db.session.commit()
        return {}
