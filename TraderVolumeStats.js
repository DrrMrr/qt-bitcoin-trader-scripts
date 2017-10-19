var variablePath = "D:\\Damjan\\Qsync\\Bitcoin\\QT Bitcoin Trader\\QTBitcointTrader\\";
///////////////		log to file or window		///////////////////
var logToFile = true;
var logToWindow = true;
var logFile = variablePath + "TraderVolumeStatsLogger.txt";

function eventLogger(tempString) {
    if (logToFile)
        trader.fileAppend(logFile, trader.dateTimeString() + ": " + tempString);
    if (logToWindow)
        trader.log(tempString);
}

writeStats();
trader.timer(60, "writeStats()");

function writeStats() {
    var price = trader.get("LastPrice");
    var volume = trader.get("10MinVolume");
    var scriptName = "writeStats()";
    //eventLogger(scriptName + ".START");    
    eventLogger("," + price + "," + trader.get("10MinBuyDivSell") + "," + volume + "," + trader.get("AsksPrice", volume) + "," + trader.get("BidsPrice", volume));
    //eventLogger(scriptName + ".END");
}