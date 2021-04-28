from flask import Blueprint
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Coin, Portfolio

portfolio_routes = Blueprint('portfolio', __name__)

@portfolio_routes.route('')
@login_required
def getPortfolio():
  userId = current_user.id
  portfolioData = Portfolio.query.join(Coin).filter(
      Portfolio.userId == userId).all()
  portfolio = {}
  for row in portfolioData:
    # print(dir(row))
    portfolio[f'{row.coinInfo.ticker}'] = {
      'Name': row.coinInfo.name,
      'Quantity': row.quantity,
      'Average Price': row.averagePrice,
      'coinId': row.coinId,
    }
  # print("------------",dir( portfolioData))
  # portfolio = [for row in portfolioData]

  return {'Portfolio': portfolio}
  # return {'data': portfolioData}
