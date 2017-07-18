# qt-bitcoin-trader-scripts



QT Bitcoin trader scripts

These scripts are working with QT Bitcoin Trader: https://sourceforge.net/projects/bitcointrader/

and were inspired by the user on QT Bitcoin Trader Forum: https://bitcointalk.org/index.php?topic=201062.new#new

Read page "How to setup" and "How it works" for further instructions. Currently, they are used on my Raspberry Pi and all values in the variable folder are set with my latest configurations.

All comments and ideas are welcome and all new functionalities will be committed here.

Contributions are also welcome on my BTC address 1AgxFdBGFVvJRmLk6JYBJozuR3UZ7NuHTU or you can donate it to author of QT Bitcoin Trader 1d6iMwjjNo8ZGYeJBZKXgcgVk9o7fXcjc

Best regards

Damien


# How it works


The idea of these scripts is, to make more bids, where first bids are with lower volume and when the price falls, the volume increases.

Old bids are cleared when one of next conditions are fulfilled:

- sell has been executed when resetPrice condition in percentage is reached
- after every sell or restart of script Trader
- min value is checked and then if the current price is bigger for more than resetPrice in percentage, everything restarts

# How to setup

**Included trading pairs**

Current scripts are for buying and selling Ethereums in Bitcoin (ETHBTC). If you want to use it as something like BTCLTC trader, Then change first all BTC strings to XXX, then ETH to BTC and then XXX to LTC. Do this in all scripts.

**Create new scripts in QT Bitcoin trader**

Open four new scripts in your QT Bitcoin Trader and name them


- Trader
- TraderMain
- TraderMainRestart
- TraderValues


**Copy script files into QT Bitcoin Trader**

Copy script files that end with .js in the proper script of QT Bitcoin Trader.

**Set variables and log files path**

Set Variables path in script Trader and TraderMain to your path where all Variables and log files will be saved.

**Setting the variables**

feeMaker.txt


Maker fees are paid when you add liquidity to our order book by placing a limit order under the ticker price for buy and above the ticker price for sell (source bitfinex.com).


feeTaker.txt


Taker fees are paid when you remove liquidity from our order book by placing any order that is executed against an order of the order book (source bitfinex.com).


firstBuy.txt


when the first bid will take place. If you are testing the script, then set the value to bigger than 5. If the value is set to 0, then the first bid will be the same as the current price and order will be executed.


martin.txt


this value sets how much apart are the bids.


numberOfOrders.txt


set maximum number of bid orders


profit.txt


how to lay into each sell order.


profitInDollars.txt


set profit for each ask price (sell price) in dollars.


profitInDollarsCondition.txt


if it's set to true, then profit for each selling price(ask) will be calculated from value found in profitInDollarsCondition.txt, otherwise what is defined in profitInPercentage.txt. Best to leave it to false and set profit in percentage.


profitInPercentage.txt


set profit for each ask price (sell price) in percentage. This value set's how much profit would you like to make with each buy and sell.


resetPrice.txt


this value is in percentage and it defines, if price goes up, when all the bids cleared and generated like at first run.


stepBetweenOrders.txt


overlap stroke rates, calculating the depth of the table buy orders.  For example, in a first step, the price 10BTC percentage of overlap of 20% means that the table will be set in the range // 8-10BTC.


**Log files**

At start, log files will be created:


_logBidPrice.txt
_logfileLoggerTrader.txt
_logLastSale.txt
_logLastBTCbalance.txt
_logLastETHbalance.txt


Log files can be deleted before start or when all scripts are stopped.

**Starting the scripts**

Start the script named "TraderMainRestart". This script stops and runs everything.

