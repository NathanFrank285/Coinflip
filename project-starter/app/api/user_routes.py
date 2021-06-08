from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/balance')
@login_required
def balance():
    id = current_user.id
    userDollarBalance = User.query.get(id).to_dict()['us_dollar']

    return {'balance': userDollarBalance}

@user_routes.route('/transfer', methods=['POST'])
@login_required
def transfer():
    id = current_user.id
    user = User.query.get(id).to_dict()
    transferQuantity = request.get_json()['transferQuantity']
    transferType = request.get_json()['transferType']

    if transferType == 'deposit':
        user.us_dollar = user.us_dollar + transferQuantity
    else:
        user.us_dollar = user.us_dollar + transferQuantity

    return {'success': 'transfer succesful'}
