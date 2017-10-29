var variablePath = "C:\\Users\\Damjan\\Documents\\GitHub\\qt-bitcoin-trader-scripts\\";
///////////////		log to file or window		///////////////////
var logToFile = true;
var logToWindow = true;
var logFile = variablePath + "TraderRestartIfNoSaleOrBuy.txt";

function eventLogger(tempString) {
    if (logToFile)
        trader.fileAppend(logFile, trader.dateTimeString() + ": " + tempString);
    if (logToWindow)
        trader.log(tempString);
}
///////////		write last bid price	///////////////////////////

var lastMySellPrice = 0;
var lastMySellPriceOld = trader.get("LastMySellPrice");
var lastMyBuyPrice = 0;
var lastMyBuyPriceOld = trader.get("LastMyBuyPrice");
var restartBuyDiffValue = 0.5;
var restartScripts = false;
var buyAbsDiff = 0;
var lastPrice = 0;
var resetPercentage = 0.3;

///////////////////////////////////////////////////////////////////
var resetPriceFile = variablePath + "resetPrice.txt";
var resetPrice = parseFloat(trader.fileReadAll(resetPriceFile));
///////////////////////////////////////////////////////////////////
var resetBidsEnabledFile = variablePath + "resetBidsEnabled.txt";
var resetBidsEnabled = trader.fileReadAll(resetBidsEnabledFile).toString().trim();
///////////////////////////////////////////////////////////////////
var raznostInPercentageFile = variablePath + "raznostInPercentage.txt";
var raznostInPercentage = parseFloat(trader.fileReadAll(raznostInPercentageFile));

var raznostInPercentageConditionFile = variablePath + "raznostInPercentageCondition.txt";
var raznostInPercentageCondition = trader.fileReadAll(raznostInPercentageConditionFile).toString().trim();
///////////////////////////////////////////////////////////////////

trader.timer(600, "restartEverything()");

function restartEverything() {
    var scriptName = "restartEverything()";
    eventLogger(scriptName + ".START");

    trader.log("CHECK.STEP1");
    lastMySellPrice = trader.get("LastMySellPrice");
    lastMyBuyPrice = trader.get("LastMyBuyPrice");
    lastPrice = trader.get("LastPrice");
    trader.log("LastMySellPrice: " + lastMySellPrice);
    trader.log("LastMySellPriceOld: " + lastMySellPriceOld);
    trader.log("LastMyBuyPrice: " + lastMyBuyPrice);
    trader.log("LastMyBuyPriceOld: " + lastMyBuyPriceOld);
    buyAbsDiff = Math.abs(lastMyBuyPrice - lastPrice);
    checkBuyAbsDiff();

    if (lastMySellPrice == lastMySellPriceOld && lastMyBuyPrice == lastMyBuyPriceOld) {
        trader.log("resetBidsEnabled: " + resetBidsEnabled);
        if (resetBidsEnabled == "true") {
            trader.log("STEP 1");
            trader.log("restartScripts: " + restartScripts);
            if (restartScripts == true) {
                trader.log("STEP 2");
                trader.log("RESTART");
                trader.groupStop("TraderMainRestart");
                trader.groupStart("TraderMainRestart");
            }
        } else {
            trader.log("STEP 3");
            trader.log("RESTART");
            trader.groupStop("TraderMainRestart");
            trader.groupStart("TraderMainRestart");
        }

    }
    trader.log("CHECK.STEP2");
    lastMySellPriceOld = lastMySellPrice;
    lastMyBuyPriceOld = lastMyBuyPrice;

    trader.log("LastMySellPrice: " + lastMySellPrice);
    trader.log("LastMySellPriceOld: " + lastMySellPriceOld);
    trader.log("LastMyBuyPrice: " + lastMyBuyPrice);
    trader.log("LastMyBuyPriceOld: " + lastMyBuyPriceOld);

    trader.groupStop("Test script");
    trader.groupStart("Test script");
    eventLogger(scriptName + ".STOP");
}

function restartEverything() {
    var scriptName = "restartEverything()";
    eventLogger(scriptName + ".START");

    if (raznostInPercentageCondition == "true") {
        trader.log(scriptName + ".STEP");
        var tempDiff = 0;
        if (lastMyBuyPrice < lastPrice) {
            trader.log(scriptName + ".STEP1.1");
            tempDiff = Math.pow((lastMyBuyPrice / lastPrice), -1) - 1;
            trader.log("tempDiff: " + tempDiff);
            trader.log("resetPercentage: " + resetPercentage);
            if (tempDiff > resetPercentage)
            {
                trader.log(scriptName + ".STEP1.2");
                restartScripts = true;
                trader.log("restartScripts: " + restartScripts);
            }
            
        } else {
            trader.log(scriptName + ".STEP2.1");
            tempDiff = Math.pow((lastPrice / lastMyBuyPrice), -1) - 1;
            trader.log("tempDiff: " + tempDiff);
            trader.log("raznostInPercentage: " + raznostInPercentage);
            if (tempDiff > raznostInPercentage)
            {
                trader.log(scriptName + ".STEP2.2");
                restartScripts = true;
                trader.log("restartScripts: " + restartScripts);
            }
        }

    }
    eventLogger(scriptName + ".END");
}