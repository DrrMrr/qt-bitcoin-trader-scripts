var variablePath = "D:\\Damjan\\Qsync\\Bitcoin\\QT Bitcoin Trader\\QTBitcointTrader\\";
///////////////		log to file or window		///////////////////
var logToFile = true;
var logToWindow = true;
var logFile = variablePath + "TraderLastBuyLogger.txt";

function eventLogger(tempString) {
    if (logToFile)
        trader.fileAppend(logFile, trader.dateTimeString() + ": " + tempString);
    if (logToWindow)
        trader.log(tempString);
}
///////////		write last bid price	///////////////////////////
var bidPriceFile = variablePath + "bidPrice.txt";
var bidPrice = trader.get("BidPrice");
eventLogger("bidPrice: " + bidPrice);
trader.fileWrite(bidPriceFile, bidPrice);

///////////		write LastMyBuyPrice & LastMySellPrice	///////////
var lastMyBuyPrice = trader.get("LastMyBuyPrice");
var lastMyBuyPriceFile = variablePath + "lastMyBuyPrice.txt";
var lastMySellPriceOld = trader.get("LastMySellPrice");
var lastMySellPriceFile = variablePath + "lastMySellPrice.txt";
if (lastMyBuyPrice > 0)
    trader.fileWrite(lastMyBuyPriceFile, lastMyBuyPrice);
if (lastMySellPriceOld > 0)
    trader.fileWrite(lastMySellPriceFile, lastMySellPriceOld);
eventLogger("lastMyBuyPrice: " + lastMyBuyPrice);
eventLogger("lastMySellPrice: " + lastMySellPriceOld);

///////////		write currencySecondaryBalance	///////////////////
var currencyPrimary = "USD";
var currencySecondary = "ETH";
var lastCurrencySecondaryBallanceFile = variablePath + "lastCurrencySecondaryBallance.txt";
var currencySecondaryBalance = trader.get("Balance", currencySecondary);
eventLogger("currencySecondaryBalance: " + currencySecondaryBalance);