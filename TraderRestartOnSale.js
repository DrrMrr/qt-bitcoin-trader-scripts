var variablePath = "D:\\Damjan\\Qsync\\Bitcoin\\QT Bitcoin Trader\\QTBitcointTrader - 11.09.2017\\";
var lastTradeStatusFile = variablePath + "lastTradeStatusFile.txt";

emptyLogFiles();
///////////////		log to file or window		///////////////////
var logToFile = true;
var logToWindow = true;
var logFile = variablePath + "TraderRestartOnSaleLogger.txt";

function eventLogger(tempString) {
    if (logToFile)
        trader.fileAppend(logFile, trader.dateTimeString() + ": " + tempString);
    if (logToWindow)
        trader.log(tempString);
}
///////////////////////////////////////////////////////////////////

var currencyPrimary = "BTC";
var currencySecondary = "ETH";

function restartEverything() {

    var scriptName = "restartEverything()";
    eventLogger(scriptName + ".START");

    eventLogger(scriptName + ".Restart Trader & TraderMain & TraderMainRestart");
    trader.groupStop("TraderMain");
    trader.groupStop("Trader");
    trader.groupStop("TraderMainRestart");
    trader.cancelBids(currencySecondary + currencyPrimary);
    trader.groupStart("TraderMainRestart");

    trader.fileWrite(lastTradeStatusFile, "SELL");
    eventLogger(scriptName + ".SELL");

    eventLogger(scriptName + ".END");
}


trader.on("LastMyBuyPrice").changed()
{
    var scriptName = "trader.on(LastMyBuyPrice).changed()";
    eventLogger(scriptName + ".START");

    trader.fileWrite(lastTradeStatusFile, "BUY");
    eventLogger(scriptName + ".BUY");

     eventLogger(scriptName + ".END");
}


trader.on("LastMySellPrice").changed() {    
    var scriptName = "trader.on(LastMySellPrice).changed()";
    eventLogger(scriptName + ".START");

    trader.delay(5,"restartEverything()");
    eventLogger(scriptName + ".END");
}


function emptyLogFiles() {
    trader.fileWrite(lastTradeStatusFile, "SELL");
    eventLogger("SELL");    
    var emptyLogFile = "";
    emptyLogFile = variablePath + "TraderLogger.txt";
    trader.fileWrite(emptyLogFile, "");
    emptyLogFile = variablePath + "TraderMainLogger.txt";
    trader.fileWrite(emptyLogFile, "");
    emptyLogFile = variablePath + "TraderMainRestartLogger.txt";
    trader.fileWrite(emptyLogFile, "");
    emptyLogFile = variablePath + "TraderLastBuyLogger.txt";
    trader.fileWrite(emptyLogFile, "");
    emptyLogFile = variablePath + "TraderRestartOnSaleLogger.txt";
    trader.fileWrite(emptyLogFile, "");
}