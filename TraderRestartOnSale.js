var variablePath = "C:\\Users\\Damjan\\Documents\\GitHub\\qt-bitcoin-trader-scripts\\BTCIOT\\";
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

var currencyPrimary = "USD";
var currencySecondary = "BTC";

function restartEverything() {

    var scriptName = "restartEverything()";
    eventLogger(scriptName + ".START");
    eventLogger(scriptName + "./#/#/#/#////////////   RESTART   ////////////////////");
    eventLogger(scriptName + ".Restart Trader & TraderMain & TraderMainRestart");
    trader.groupStop("TraderMain");
    trader.groupStop("Trader");
    trader.groupStop("TraderMainRestart");
    trader.cancelBids(currencySecondary + currencyPrimary);
    trader.fileWrite(lastTradeStatusFile, "SELL");
    eventLogger(scriptName + ".SELL");
    trader.groupStart("TraderMainRestart");


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

    trader.fileWrite(lastTradeStatusFile, "SELL");

    trader.delay(5,"restartEverything()");
    eventLogger(scriptName + ".END");
}


function emptyLogFiles() {     
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
    trader.fileWrite(lastTradeStatusFile, "SELL");
    eventLogger("SELL");   
}