from flask.cli import AppGroup
from .users import seed_users, undo_users, seed_coins, seed_portfolio, undo_coins, seed_trades, seed_watchlist, undo_portfolios, undo_trades, undo_watchlists

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_coins()
    seed_portfolio()
    seed_trades()
    seed_watchlist()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_coins()
    undo_portfolios()
    undo_watchlists()
    undo_trades()

    # Add other undo functions here
