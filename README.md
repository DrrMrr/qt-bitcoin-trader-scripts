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

sell has been executed when resetPrice condition in percentage is reached after every sell or restart of script Trader, min value is checked and then if the current price is bigger for more than resetPrice in percentage, everything restarts

