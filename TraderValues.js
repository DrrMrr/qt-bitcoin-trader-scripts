var variablePath = "/home/damien/Desktop/QTBitcointTrader/Variables/";
///////////////////////////////////////////////////////////////////
var bidPriceFile = variablePath + "bidPrice.txt";
var bidPrice = trader.get("BidPrice");
trader.fileWrite(bidPriceFile,bidPrice);
///////////////////////////////////////////////////////////////////