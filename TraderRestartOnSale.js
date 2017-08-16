var variablePath = "/home/damien/Desktop/QTBitcointTrader/";
var fileLoggerFile = variablePath + "fileLoggerTrader3.txt";

function restartEverything() {
	trader.groupStart("TraderMainRestart");
}

function logger() {
	    trader.fileAppend(fileLoggerFile, fileLogger + " - " + trader.dateTimeString());
}

trader.on("LastMySellPrice").changed() {
	trader.log("trader.on(LastMySellPrice).changed()", "");
	trader.groupStop("TraderMain");
	trader.groupStop("Trader");
	trader.groupStop("TraderValues");	
	trader.groupStop("TraderMainRestart");
	trader.cancelBids("ETHBTC");
	
	fileLogger = "TraderRestartOnSale.trader.on(LastMySellPrice).changed(): YES";
	logger();	
	fileLogger = "TraderRestartOnSale.OpenAsksCount: " + trader.get("OpenAsksCount");
	logger();

	trader.delay(15, "restartEverything()");
}




/*
trader.on("OpenAsksCount").changed()
{
	trader.log("trader.on(OpenAsksCount).changed()", "");
	trader.groupStop("TraderMainRestart");
	trader.groupStart("TraderMainRestart");	
}
*/


