# qt-bitcoin-trader-scripts



QT Bitcoin trader scripts (README IS NOT UPDATED!)

These scripts are working with QT Bitcoin Trader: https://sourceforge.net/projects/bitcointrader/

and were inspired by the user on QT Bitcoin Trader Forum: https://bitcointalk.org/index.php?topic=201062.new#new

Read page "How to setup" and "How it works" for further instructions. Currently, they are used on my Raspberry Pi and all values in the variable folder are set with my latest configurations.

All comments and ideas are welcome and all new functionalities will be committed here.

Contributions are also welcome on my BTC address 1PR1PH2dqx5gBH5dzY5wXV4h62so11Q4MK or you can donate it to author of QT Bitcoin Trader 1d6iMwjjNo8ZGYeJBZKXgcgVk9o7fXcjc

Binance referral link: https://www.binance.com/?ref=10757282

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
- TraderLastBuy
- TraderRestartOnSale (this script is optional and it runs individually)

**Copy script files into QT Bitcoin Trader**

Copy script files that end with .js in the proper script of QT Bitcoin Trader.

**Set variables and log files path**

Set Variables path in script Trader and TraderMain to your path where all Variables and log files will be saved.

**Setting the variables**

_feeMaker.txt_


Maker fees are paid when you add liquidity to our order book by placing a limit order under the ticker price for buy and above the ticker price for sell (source bitfinex.com).


_feeTaker.txt_


Taker fees are paid when you remove liquidity from our order book by placing any order that is executed against an order of the order book (source bitfinex.com).


_FirstBuy.txt_


when the first bid will take place. If you are testing the script, then set the value to bigger than 5. If the value is set to 0, then the first bid will be the same as the current price and order will be executed.


_Martin.txt_


this value sets how much apart are the bids.


_NumberOfOrders.txt_


set maximum number of bid orders


_Profit.txt_


how to lay into each sell order.


_profitInDollars.txt_


set profit for each ask price (sell price) in dollars.


_profitInDollarsCondition.txt_


if it's set to true, then profit for each selling price(ask) will be calculated from value found in profitInDollarsCondition.txt, otherwise what is defined in profitInPercentage.txt. Best to leave it to false and set profit in percentage.


_profitInPercentage.txt_


set profit for each ask price (sell price) in percentage. This value set's how much profit would you like to make with each buy and sell.


_resetPrice.txt_


this value is in percentage and it defines, if price goes up, when all the bids cleared and generated like at first run.

_resetBidsEnabled.txt_

if this variable is set to true, then all bids will be reset and new bids will be generated, when condition in resetPrice.txt will be reached.

_allBidsPrice.txt_

If a variable in allBidsPriceEnabled.txt is set to true, then all bids will set at fixed price. This can be good if you want to make more bids in closer range between them.

_allBidsPriceEnabled.txt_

Condition for setting all bids with same price.

_firstBidPrice.txt_

If variable in firstBidPriceEnabled.txt is set to true, then first price will be at price that was set. If allBidsPriceEnabled is also true, then the price set in file allBidsPrice.txt will prevail.

_firstBidPriceEnabled.txt_

Condition for setting first bid with fixed price.

_StepBetweenOrders.txt_


overlap stroke rates, calculating the depth of the table buy orders.  For example, in a first step, the price 10BTC percentage of overlap of 20% means that the table will be set in the range // 8-10BTC.


**Log files**

At start, log files will be created:


* bidPrice.txt
* fileLoggerTrader.txt
* lastSale.txt
* qtLastBTCbalance.log
* lastETHbalance.txt


Log files can be deleted before start or when all scripts are stopped.

**Starting the scripts**

Start the script named "TraderMainRestart". This script stops and runs everything.
