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

trader.timer(300, "restartEverything()");

function restartEverything() {
    var scriptName = "restartEverything()";
    eventLogger(scriptName + ".START");

    eventLogger(scriptName + ".STEP 0");
    lastMySellPrice = trader.get("LastMySellPrice");
    lastMyBuyPrice = trader.get("LastMyBuyPrice");
    lastPrice = trader.get("LastPrice");
    eventLogger(scriptName + ".LastMySellPrice: " + lastMySellPrice);
    eventLogger(scriptName + ".LastMySellPriceOld: " + lastMySellPriceOld);
    eventLogger(scriptName + ".LastMyBuyPrice: " + lastMyBuyPrice);
    eventLogger(scriptName + ".LastMyBuyPriceOld: " + lastMyBuyPriceOld);
    buyAbsDiff = Math.abs(lastMyBuyPrice - lastPrice);
    checkBuyAbsDiff();

    if (lastMySellPrice == lastMySellPriceOld && lastMyBuyPrice == lastMyBuyPriceOld) {
        eventLogger(scriptName + ".resetBidsEnabled: " + resetBidsEnabled);
        if (resetBidsEnabled == "true") {
            eventLogger(scriptName + ".STEP 1");
            eventLogger(scriptName + ".restartScripts: " + restartScripts);
            if (restartScripts == true) {
                eventLogger(scriptName + ".STEP 2");
                eventLogger(scriptName + "./#/#/#/#////////////   RESTART   ////////////////////");
                trader.groupStop("TraderMainRestart");
                trader.groupStop("TraderMain");
                trader.groupStop("Trader");
                trader.groupStart("TraderMainRestart");
            }
        } else {
            eventLogger(scriptName + ".STEP 3");
            eventLogger(scriptName + "./#/#/#/#////////////   RESTART   ////////////////////");
            trader.groupStop("TraderMainRestart");
            trader.groupStop("TraderMain");
            trader.groupStop("Trader");
            trader.groupStart("TraderMainRestart");
        }

    }
    lastMySellPriceOld = lastMySellPrice;
    lastMyBuyPriceOld = lastMyBuyPrice;

    eventLogger(scriptName + ".LastMySellPrice: " + lastMySellPrice);
    eventLogger(scriptName + ".LastMySellPriceOld: " + lastMySellPriceOld);
    eventLogger(scriptName + ".LastMyBuyPrice: " + lastMyBuyPrice);
    eventLogger(scriptName + ".LastMyBuyPriceOld: " + lastMyBuyPriceOld);
    
    eventLogger(scriptName + ".STOP");
}

function checkBuyAbsDiff() {
    var scriptName = "checkBuyAbsDiff()";
    eventLogger(scriptName + ".START");
    eventLogger(scriptName + ".lastMyBuyPrice: " + lastMyBuyPrice);
    eventLogger(scriptName + ".lastPrice: " + lastPrice);

    if (raznostInPercentageCondition == "true") {
        eventLogger(scriptName + ".STEP 0");
        var tempDiff = 0;
        var tempValue = 0;
        if (lastMyBuyPrice < lastPrice) {
            eventLogger(scriptName + ".STEP1.1");
            tempValue = lastMyBuyPrice / lastPrice;
            eventLogger(scriptName + ".tempValue: " + tempValue);
            tempDiff = Math.pow(tempValue, -1) - 1;
            eventLogger(scriptName + ".tempDiff: " + tempDiff);
            eventLogger(scriptName + ".resetPercentage: " + resetPercentage);
            if (tempDiff > resetPercentage) {
                eventLogger(scriptName + ".STEP1.2");
                restartScripts = true;
                eventLogger(scriptName + ".restartScripts: " + restartScripts);
            }

        } else {
            eventLogger(scriptName + ".STEP2.1");
            tempValue = lastPrice / lastMyBuyPrice;
            eventLogger(scriptName + ".tempValue: " + tempValue);
            tempDiff = Math.pow(tempValue, -1) - 1;
            eventLogger(scriptName + ".tempDiff: " + tempDiff);
            eventLogger(scriptName + ".raznostInPercentage: " + raznostInPercentage);
            if (tempDiff > raznostInPercentage) {
                eventLogger(scriptName + ".STEP2.2");
                restartScripts = true;
                eventLogger(scriptName + ".restartScripts: " + restartScripts);
            }
        }

    }
    eventLogger(scriptName + ".END");
}