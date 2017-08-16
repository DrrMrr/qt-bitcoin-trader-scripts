var variablePath = "/home/damien/Desktop/QTBitcointTrader/";
var fileLoggerFile = variablePath + "fileLoggerTrader2.txt";
var lastMyBuyPrice= trader.get("LastMyBuyPrice");
var lastMyBuyPriceFile = variablePath + "lastMyBuyPrice.txt";
var lastMySellPrice= trader.get("LastMySellPrice");
var lastMySellPriceFile = variablePath + "lastMySellPrice.txt";


trader.fileWrite(lastMyBuyPriceFile,lastMyBuyPrice);
trader.fileWrite(lastMySellPriceFile,lastMySellPrice);

trader.log("VAL[lastMyBuyPrice]: ", lastMyBuyPrice);	
trader.log("VAL[lastMySellPrice]: ", lastMySellPrice);
fileLogger = "TraderLastBuy.lastMyBuyPrice: " + lastMyBuyPrice;
logger();
fileLogger = "TraderLastBuy.lastMySellPrice: " + lastMyBuyPrice;
logger();


function lastMyBuyPrice() {	
	lastMyBuyPrice = trader.get("LastMyBuyPrice");	
	trader.log("VAL[lastMyBuyPrice().lastMyBuyPrice]: ", lastMyBuyPrice);
	trader.fileWrite(lastMyBuyPriceFile,lastMyBuyPrice);
	fileLogger = "TraderLastBuy.lastMyBuyPrice: " + lastMyBuyPrice;
	logger();
}


function logger() {
	    trader.fileAppend(fileLoggerFile, fileLogger + " - " + trader.dateTimeString());
}

