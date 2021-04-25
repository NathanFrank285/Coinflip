from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  userCoins = db.relationship("Watchlist", backref="user")


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }

class Watchlist(db.Model):
  __tablename__ = 'watchlists'
  __table_args__ = (
    db.UniqueConstraint('userId', 'coinId', name="unique_coin"),
    )

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  coinId = db.Column(db.Integer, nullable=False)
  user = db.relationship("User", backref="userCoins")


class Portfolio(db.Model):
  __tablename__ = "portfolios"
  __table_args__ = (
    db.UniqueConstraint('userId', 'coinId',name='own_coin_once'),
    )

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  coinId = db.Column(db.Integer, db.ForeignKey('coins.id'), nullable=False)
  quantity = db.Column(db.Integer, nullable=False)
  averagePrice = db.Column(db.Integer, nullable=False)
  owner = db.relationship('Coin')


class Coin(db.Model):
  __tablename__ = "coins"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(), nullable=False)
  ticker = db.Column(db.String(), nullable=False)
