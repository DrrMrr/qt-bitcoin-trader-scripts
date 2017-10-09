var variablePath = "D:\\Damjan\\Qsync\\Bitcoin\\QT Bitcoin Trader\\QTBitcointTrader - 11.09.2017\\";
///////////////		log to file or window		///////////////////
var logToFile = true;
var logToWindow = true;
var logFile = variablePath + "TraderMainRestartLogger.txt";

function eventLogger(tempString) {
    if (logToFile)
        trader.fileAppend(logFile, trader.dateTimeString() + ": " + tempString);
    if (logToWindow)
        trader.log(tempString);
}
eventLogger("Restart TraderMain");
trader.groupStop("TraderLastBuy");
trader.groupStop("TraderMain");
trader.groupStop("Trader");
trader.delay(5,"StartEverything()");


function StartEverything()
{
    var scriptName = "StartEverything()";
    eventLogger(scriptName + ".START");
   
    trader.groupStart("TraderMain");

    eventLogger(scriptName + ".END");
}