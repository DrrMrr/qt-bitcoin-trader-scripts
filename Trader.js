/*
+ better debugging with new function an optional output to window or file
+ distributed bids
+ beautified code
+ optimized api requests
+ primary and secondary currency as variable
+ new varibles in settings firstBidPrice, allBidPrice ...
- check if all api requests are optimized and changed to variable
- set variable path to current directory in variables will be in one file
+ currencyPrimaryKeepAmountFixedValue && currencySecondaryKeepAmountFixedValue
- make bids if there are no open bids and last bid was executed
- if more bids are executed in a row, then ask will be at last bid price. How to solve this?
+ new variable - lastTradeStatus - solves trouble when ther are multiple sells in a row
+ minAskValue & maxAskValue
+ added LastMySellPrice change check

*/
var variablePath = "C:\\Users\\Damjan\\Documents\\GitHub\\qt-bitcoin-trader-scripts\\";

///////////////                  log to file or window                     ///////////////////
var logToFile = true;
var logToWindow = true;
var logFile = variablePath + "TraderLogger.txt";

function eventLogger(tempString) {
    if (logToFile)
        trader.fileAppend(logFile, trader.dateTimeString() + ": " + tempString);
    if (logToWindow)
        trader.log(tempString);
}
///////////////////////////////////////////////////////////////////

function logger() {
    trader.fileAppend(fileLoggerFile, fileLogger + " - " + trader.dateTimeString());
}

eventLogger("///////////////////////        START - TRADER       ///////////////////");

////////// SCRIPT 2 /////////////////////////////////////////////
var vverh = 0.7; // in%, for example, if there is 2%, and at the time running a script purchase price will be 100 BTC, then the purchase price 102 restarts the entire cycle //default 0.4
//var orderss = 8; // value in the script 1 
// Below if you do not Charite do not change anything. 
var rest = 100000000000;
var lastCurrencyPrimaryBallanceFile = variablePath + "lastCurrencyPrimaryBallance.txt";
var firstBuyChecked = false;

var lastMyBuyPriceOriginalFile = variablePath + "lastMyBuyPrice.txt";
var lastMyBuyPriceOriginal = parseFloat(trader.fileReadAll(lastMyBuyPriceOriginalFile));

var currencyPrimary = "USD";
var currencySecondary = "BTC";
var lastTradeStatus = "";
var lastTradeStatusFile = variablePath + "lastTradeStatusFile.txt";
var temp = trader.fileReadAll(lastTradeStatusFile).toString().trim();
eventLogger("temp: " + temp);
if (temp.length > 0)
    lastTradeStatus = temp;
else
    lastTradeStatus = "BUY";
eventLogger("lastTradeStatus: " + lastTradeStatus);

/////////////////////////////////////////////////////////////////
////////// SCRIPT 1 /////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// in%,the first step indentation How price first buy order in the table should be less than the purchase of the current at the time of the calculation table.  All other orders will buy more cheaper //default 0.5
var otstupFile = variablePath + "firstBuyStep.txt";
var otstup = parseFloat(trader.fileReadAll(otstupFile));
var otstupOriginal = otstup;
///////////////////////////////////////////////////////////////////
// in%,the first step indentation How price first buy order in the table should be less than the purchase of the current at the time of the calculation table.  All other orders will buy more cheaper //default 0.5
var raznostInPercentageFile = variablePath + "raznostInPercentage.txt";
var raznostInPercentage = parseFloat(trader.fileReadAll(raznostInPercentageFile));

var raznostInPercentageConditionFile = variablePath + "raznostInPercentageCondition.txt";
var raznostInPercentageCondition = trader.fileReadAll(raznostInPercentageConditionFile).toString().trim();
///////////////////////////////////////////////////////////////////
//maxNumberOfBids.txt
var ordersFile = variablePath + "maxNumberOfBids.txt";
var orders = parseFloat(trader.fileReadAll(ordersFile)); // 2 to 20,how many buy-to place orders in the amount of overlap. //default 13
var ordersOriginalValue = orders;
///////////////////////////////////////////////////////////////////
//stepBetweenOrders.txt
var stepBetweenOrdersFile = variablePath + "stepBetweenOrders.txt";
var stepBetweenOrders = parseFloat(trader.fileReadAll(stepBetweenOrdersFile)); // in% overlap stroke rates,calculating the depth of the table buy orders.  For example,in a first step,the price 10BTC percentage of overlap of 20% means that the table will be set in the range // 8-10BTC.  //default 30
///////////////////////////////////////////////////////////////////
//profit.txt
var profitFile = variablePath + "profit.txt";
var profit = parseFloat(trader.fileReadAll(profitFile)); // in%,profit,profit How to lay into each sell order. 
///////////////////////////////////////////////////////////////////
//martinStep.txt
var martinFile = variablePath + "martinStep.txt";
var martin = parseFloat(trader.fileReadAll(martinFile)); // in%,martingale,when calculating each table buy orders following order cheaper by volume greater than the previous to this value.  //default 15
///////////////////////////////////////////////////////////////////
var lastCurrencySecondaryBallanceFile = variablePath + "lastCurrencySecondaryBallance.txt";
var lastCurrencySecondaryBallance = 0;

///////////////////////////////////////////////////////////////////
var profitCurrencyPrimaryAmount = variablePath + "profitCurrencyPrimaryAmount.txt";
var profitCurrencyPrimaryAmount = parseFloat(trader.fileReadAll(profitCurrencyPrimaryAmount));
///////////////////////////////////////////////////////////////////
var profitInPercentageFile = variablePath + "profitCurrencyPrimaryInPercentage.txt";
var profitInPercentage = parseFloat(trader.fileReadAll(profitInPercentageFile));
///////////////////////////////////////////////////////////////////
var profitCurrencyPrimaryAmountCondition = variablePath + "profitCurrencyPrimaryAmountCondition.txt";
var profitCurrencyPrimaryAmountCondition = trader.fileReadAll(profitCurrencyPrimaryAmountCondition).toString().trim();
///////////////////////////////////////////////////////////////////
var feeTakerFile = variablePath + "feeTaker.txt";
var feeTaker = parseFloat(trader.fileReadAll(feeTakerFile));
///////////////////////////////////////////////////////////////////
var feeMakerFile = variablePath + "feeMaker.txt";
var feeMaker = parseFloat(trader.fileReadAll(feeMakerFile));
///////////////////////////////////////////////////////////////////              

var bidPriceFile = variablePath + "bidPrice.txt";
var bidPrice = trader.get("BidPrice");
trader.fileWrite(bidPriceFile, bidPrice);
///////////////////////////////////////////////////////////////////
var resetPriceFile = variablePath + "resetPrice.txt";
var resetPrice = parseFloat(trader.fileReadAll(resetPriceFile));
///////////////////////////////////////////////////////////////////
var resetBidsEnabledFile = variablePath + "resetBidsEnabled.txt";
var resetBidsEnabled = trader.fileReadAll(resetBidsEnabledFile).toString().trim();
///////////////////////////////////////////////////////////////////
var fileLoggerFile = variablePath + "fileLoggerTrader.txt";
///////////////////////////////////////////////////////////////////
var firstBidPriceFile = variablePath + "firstBidPrice.txt";
var firstBidPrice = parseFloat(trader.fileReadAll(firstBidPriceFile));
///////////////////////////////////////////////////////////////////
var firstBidPriceEnabledFile = variablePath + "firstBidPriceEnabled.txt";
var firstBidPriceEnabled = trader.fileReadAll(firstBidPriceEnabledFile).toString().trim();
///////////////////////////////////////////////////////////////////
var allBidsPriceFile = variablePath + "allBidsPrice.txt";
var allBidsPrice = parseFloat(trader.fileReadAll(allBidsPriceFile));
///////////////////////////////////////////////////////////////////
var allBidsPriceEnabledFile = variablePath + "allBidsPriceEnabled.txt";
var allBidsPriceEnabled = trader.fileReadAll(allBidsPriceEnabledFile).toString().trim();
///////////////////////////////////////////////////////////////////
var currencyPrimaryKeepAmountFixedValue = 0;
var currencySecondaryKeepAmountFixedValue = 0.15;
var minBidAmount = 0.004;

var lastSellPriceGenerated = 0;


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////                   BIDS DISTRIBUTION /////////////////////////////////////
///////////////////////////////////////////////////////////////////              
///////////////////////////////////////////////////////////////////
// file location
var bidsDistributionEnabledFile = variablePath + "bidsDistributionEnabled.txt";
// value - true or false
var bidsDistributionEnabled = trader.fileReadAll(bidsDistributionEnabledFile).toString().trim();

// file location
var bidsDistributionMinExchangeBidFile = variablePath + "bidsDistributionMinExchangeBid.txt";
// value - true or false
var bidsDistributionMinExchangeBid = parseFloat(trader.fileReadAll(bidsDistributionMinExchangeBidFile));


// file location
var bidsDistributionMaxNumberOfBidsFile = variablePath + "bidsDistributionMaxNumberOfBids.txt";
// value - true or false
var bidsDistributionMaxNumberOfBids = trader.fileReadAll(bidsDistributionMaxNumberOfBidsFile);



// file location
var bidsDistributionMaxVolumeSecondCurrencyFile = variablePath + "bidsDistributionMaxVolumeSecondCurrency.txt";
// value - true or false
var bidsDistributionMaxVolumeSecondCurrency = trader.fileReadAll(bidsDistributionMaxVolumeSecondCurrencyFile);

var sumAskIdNumbers = 0;
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

var depo = 98; // in%,from 1 to 98,use of the depot,which part of the BTC(or the second currency in the pair) put into circulation 
var komissiya = 0;
var prceni = 0;
var pric = 0;
var price = 0;
var pricet = 0;
var raznost = 0;
var pperv = 0;
var pvtorvraz = 0;

/////////////////////////////////
var myVolumes = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var myPrices = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var openBids = 0;
openBids = trader.get("OpenBidsCount");
var openAsks = 0
var primaryCurrencyValueOld = 0;

var justStarted = true;
var minValueAfterLastRestart = 100000000000;


var openAsksCountCheck = trader.get("OpenAsksCount");
var openAsksCountCheckOld = openAsksCountCheck;

function openAsksCountCheckFun()
{
    var scriptName = "openAsksCountCheckFun()";
    eventLogger(scriptName + ".START");

    openAsksCountCheck = trader.get("OpenAsksCount");
    eventLogger(scriptName + ".openAsksCountCheck: " + openAsksCountCheck);
    eventLogger(scriptName + ".openAsksCountCheckOld: " + openAsksCountCheckOld);

    if(openAsksCountCheck < openAsksCountCheckOld)
	{
        trader.fileWrite(lastTradeStatusFile, "SELL");
    }
    openAsksCountCheckOld = openAsksCountCheck;
    eventLogger(scriptName + ".END");
}

var openBidsCountCheck = trader.get("OpenBidsCount");
var openBidsCountCheckOld = openBidsCountCheck;

function openBidsCountCheckFun()
{
    var scriptName = "openBidsCountCheckFun()";
    eventLogger(scriptName + ".START");

    openAsksCountCheck = trader.get("OpenAsksCount");
    eventLogger(scriptName + ".openBidsCountCheck: " + openBidsCountCheck);
    eventLogger(scriptName + ".openBidsCountCheckOld: " + openBidsCountCheckOld);

    if(openBidsCountCheck != openBidsCountCheckOld)
	{
        trader.fileWrite(lastTradeStatusFile, "BUY");
    }
    openBidsCountCheckOld = openBidsCountCheck;
    eventLogger(scriptName + ".END");
}

setNewRestartValue();
//makeAsk();
/////////////////////////////////////////////////////////////////
////////// SCRIPT 2 /////////////////////////////////////////////
script2();

function script2() {
    var scriptName = "script2()";
    eventLogger(scriptName + ".START");
    justStarted = true;
    primaryCurrencyValueOld = 0;
    script1();
    //sledcikl();
    trader.timer(90, "restartScript()");
    trader.timer(150, "checkIfFirstBuyWasExecuted()");

    eventLogger(scriptName + ".END");

}




function changeNrOfOrders() {
    var scriptName = "changeNrOfOrders()";
    eventLogger(scriptName + ".START");
    eventLogger(scriptName + ".orders: " + orders);

    var primaryCurrencyValue = 0;
    primaryCurrencyValueOld = trader.fileReadAll(lastCurrencyPrimaryBallanceFile);
    var currencyPrimaryBalance = trader.get("Balance", currencyPrimary);
    primaryCurrencyValue = currencyPrimaryBalance;
    eventLogger(scriptName + ".primaryCurrencyValue: " + primaryCurrencyValue);
    eventLogger(scriptName + ".primaryCurrencyValueOld: " + primaryCurrencyValueOld);

    if (primaryCurrencyValueOld != primaryCurrencyValue && justStarted == false) {
        eventLogger(scriptName + ".STEP1: ");
        primaryCurrencyValue = currencyPrimaryBalance;

        if (primaryCurrencyValueOld < primaryCurrencyValue) {
            eventLogger(scriptName + ".STEP2");
            orders++;
        } else {
            eventLogger(scriptName + ".STEP3");
            orders--;
        }
    } else
        eventLogger(scriptName + ".STEP4");

    primaryCurrencyValueOld = primaryCurrencyValue;

    eventLogger(scriptName + ".primaryCurrencyValue: " + primaryCurrencyValue);
    eventLogger(scriptName + ".currencyPrimaryBalance: " + currencyPrimaryBalance);
    eventLogger(scriptName + ".orders: " + orders);
    eventLogger(scriptName + ".END");
}

function sledcikl() {
    var scriptName = "sledcikl()";
    eventLogger(scriptName + ".START");
    //rest = vverh / 100 + 1;
    //rest = bidPrice * (1+(profit/100));
    eventLogger(scriptName + ".rest: " + rest);
    eventLogger(scriptName + ".START");
}

function checkIfFirstBuyWasExecuted() {
    var scriptName = "checkIfFirstBuyWasExecuted()";
    eventLogger(scriptName + ".START");

    openBids = trader.get("OpenBidsCount");
    var lastPrice = trader.get("LastPrice");
    //var lastMyBuyPrice = trader.get("LastMyBuyPrice");
    var lastMyBuyPriceFile = parseFloat(trader.fileReadAll(lastMyBuyPriceOriginalFile));
    var lastMyBuyPrice = trader.get("LastMyBuyPrice");

    eventLogger(scriptName + ".lastMyBuyPrice: " + lastMyBuyPrice);
    eventLogger(scriptName + ".lastMyBuyPriceFile: " + lastMyBuyPriceFile);
    eventLogger(scriptName + ".ordersOriginalValue: " + ordersOriginalValue);
    eventLogger(scriptName + ".openBids: " + openBids);
    eventLogger(scriptName + ".otstupOriginal: " + otstupOriginal);
    eventLogger(scriptName + ".firstBuyChecked: " + firstBuyChecked);
    eventLogger(scriptName + ".lastMyBuyPriceOriginal: " + lastMyBuyPriceOriginal);
    eventLogger(scriptName + ".lastMyBuyPrice: " + lastMyBuyPrice);

    //if (((ordersOriginalValue == openBids || openBids == 0) || (firstBuyChecked == false && ordersOriginalValue != openBids && lastMyBuyPriceOriginal == lastMyBuyPrice)) && otstupOriginal == 0) {
    if ((ordersOriginalValue == openBids || openBids == 0) && otstupOriginal == 0 && (lastPrice - raznost) <= lastMyBuyPrice) {
        eventLogger(scriptName + ".Restart TraderMainRestart");        
        eventLogger(scriptName + "./#/#/#/#////////////   RESTART   ////////////////////");
        restartAll();
    }
    firstBuyChecked = true;
    eventLogger(scriptName + ".END");

}

function setNewRestartValue() {
    var scriptName = "setNewRestartValue()";
    eventLogger(scriptName + ".START");

    var bidPriceTemp = trader.get("BidPrice");
    eventLogger(scriptName + ".bidPriceTemp: " + bidPriceTemp);
    eventLogger(scriptName + ".minValueAfterLastRestart: " + minValueAfterLastRestart);

    //set new minValueAfterLastRestart
    if (bidPriceTemp < minValueAfterLastRestart) {
        eventLogger(scriptName + ".STEP1");
        minValueAfterLastRestart = bidPriceTemp;
        
        
        if (profitCurrencyPrimaryAmountCondition == "true") {
            eventLogger(scriptName + ".STEP2");
            rest = bidPriceTemp + (profitCurrencyPrimaryAmount * resetPrice);
        }
        
        else {
            eventLogger(scriptName + ".STEP3");
            //rest = bidPriceTemp + ((bidPriceTemp / 100 * profitInPercentage) * resetPrice);
            //TODO - calculate exact reset value
            rest = bidPriceTemp + (bidPriceTemp * (resetPrice * 2/ 1000));
        }
        
    }
    eventLogger(scriptName + ".rest: " + rest);
    eventLogger(scriptName + ".END");
}


function strcmp(a, b) {
    var scriptName = "strcmp()";
    eventLogger(scriptName + ".START");

    eventLogger(scriptName + ".a: " + a);
    eventLogger(scriptName + ".b: " + b);

    if (a.toString() < b.toString()) {
        eventLogger(scriptName + ".STEP1");
        return -1;
    }
    if (a.toString() > b.toString()) {
        eventLogger(scriptName + ".STEP2");
        return 1;
    }
    eventLogger(scriptName + ".STEP3");
    eventLogger(scriptName + ".END");
    return 0;
}

function restartScript() {
    var scriptName = "restartScript()";
    eventLogger(scriptName + ".START");

    //if (strcmp(resetBidsEnabled, "true") == 0) {
    //if (strcmp(resetBidsEnabled.trim(), "true") == 0) {
    eventLogger(scriptName + ".resetBidsEnabled: " + resetBidsEnabled);
    if (resetBidsEnabled == "true") // || (canMakeBid() && trader.get("OpenBidsCount") == 0)) 
    {
        eventLogger(scriptName + ".STEP1");
        setNewRestartValue();

        bidPrice = parseFloat(trader.fileReadAll(bidPriceFile));
        eventLogger(scriptName + ".bidPrice: " + bidPrice);
        eventLogger(scriptName + ".rest: " + rest);
        //reset bids in resetPrice condition is reached
        if (bidPrice >= rest) //  || (canMakeBid() && trader.get("OpenBidsCount") == 0)) 
        {
            eventLogger(scriptName + ".STEP2");

            var openAsksCount = trader.get("OpenAsksCount");
            var openBidsCount = trader.get("OpenBidsCount");

            eventLogger(scriptName + ".openAsksCount: " + openAsksCount);
            eventLogger(scriptName + ".openBidsCount: " + openBidsCount);
            eventLogger(scriptName + ".orders: " + orders);

            lastTradeStatus = "SELL";
            eventLogger(scriptName + ".SELL");
            trader.fileWrite(lastTradeStatusFile, "SELL");
            restartAll();
        }
    }
    eventLogger(scriptName + ".STEP3");
    eventLogger(scriptName + ".END");
}

/////////////////////////////////////////////////////////////////
////////// SCRIPT 1 /////////////////////////////////////////////

function script1() {
    var scriptName = "script1()";
    eventLogger(scriptName + ".START");
    // VERZIJA 2
    bidPrice = parseFloat(trader.fileReadAll(bidPriceFile));
    bal = trader.get("Balance", currencyPrimary);
    eventLogger(scriptName + ".bal: " + bal);
    komissiya = trader.get("Fee");
    eventLogger(scriptName + ".komissiya: " + komissiya);
    otstup = otstup / 100;
    otstup = 1 - otstup;
    eventLogger(scriptName + ".otstup: " + otstup);
    depo = depo / 100;
    eventLogger(scriptName + ".depo: " + depo);
    martin = martin / 100 + 1;
    eventLogger(scriptName + ".martin: " + martin);
    komissiya = komissiya * 2;
    komissiya = komissiya / 100 + 1;
    eventLogger(scriptName + ".komissiya: " + komissiya);
    stepBetweenOrders = stepBetweenOrders + otstup;
    eventLogger(scriptName + ".stepBetweenOrders: " + stepBetweenOrders);
    profit = profit / 100 + 1;
    eventLogger(scriptName + ".profit: " + profit);
    prceni = stepBetweenOrders / orders;
    eventLogger(scriptName + ".prceni: " + prceni);
    prceni = 1 - (prceni / 100);
    eventLogger(scriptName + ".prceni: " + prceni);
    // Pervaluteif = 100000 
    //trader.cancelOrders(currencySecondary + currencyPrimary);    
    if(openBids > ordersOriginalValue)
    {
        trader.cancelBids(currencySecondary + currencyPrimary);
    }
    pric = bidPrice * otstup;
    eventLogger(scriptName + ".bidPrice: " + bidPrice);
    eventLogger(scriptName + ".pric: " + pric);
    price = pric;
    pricet = pric * prceni;
    eventLogger(scriptName + ".pricet: " + pricet);
    var lastPrice = trader.get("LastPrice");
    eventLogger(scriptName + ".lastPrice: " + lastPrice);
    if (raznostInPercentageCondition == "true") {
        eventLogger(scriptName + ".STEP1");
        raznost = lastPrice * (raznostInPercentage / 100);
        if (raznost < 1) {
            eventLogger(scriptName + ".raznost < 1");
            raznost = raznost * 100;
        }
    } else {
        eventLogger(scriptName + ".STEP2");
        raznost = pric - pricet;
    }
    eventLogger(scriptName + ".raznost: " + raznost);

    trader.timer(31, "makeBids()");
    trader.timer(10, "checkIfAskCanBeMade()");
    pperv = 0;
    pvtorvraz = 0;
    trader.delay(20, "aaa()");
    trader.timer(80, "restartEverything()");
    var currencyPrimaryBalance = trader.get("Balance", currencyPrimary);
    eventLogger(scriptName + ".currencyPrimaryBalance: " + currencyPrimaryBalance);

    justStarted = false;
    //trader.timer(30, "changeNrOfOrders()");
    eventLogger(scriptName + ".END");
}

function canMakeBid() {

    var scriptName = "canMakeBid()";
    eventLogger(scriptName + ".START");

    var makeBid = false;

    lastMyBuyPriceOriginal = parseFloat(trader.fileReadAll(lastMyBuyPriceOriginalFile));
    var lastMyBuyPrice = trader.get("LastMyBuyPrice");
    var lastMySellPrice = trader.get("LastMySellPrice");
    var lastMyBuyPriceOriginalDiffRaznost = lastMyBuyPriceOriginal * (stepBetweenOrders / 100) / 10;
    var lastMyBuyPriceOriginalMinusRaznost = lastMyBuyPriceOriginal - raznost;
    var lastMySellPricePlusRaznost = lastMySellPrice + raznost;
    var lastMyBuyPriceMinusRaznost = lastMyBuyPrice - raznost;
    var lastPrice = trader.get("LastPrice");
    var lastTradeStatus = trader.fileReadAll(lastTradeStatusFile).toString().trim();

    eventLogger(scriptName + ".lastPrice: " + lastPrice);
    eventLogger(scriptName + ".lastMyBuyPriceMinusRaznost: " + lastMyBuyPriceMinusRaznost);
    eventLogger(scriptName + ".lastMyBuyPrice: " + lastMyBuyPrice);
    eventLogger(scriptName + ".lastMyBuyPriceOriginal: " + lastMyBuyPriceOriginal);
    eventLogger(scriptName + ".lastMySellPrice: " + lastMySellPrice);
    eventLogger(scriptName + ".stepBetweenOrders: " + stepBetweenOrders);
    eventLogger(scriptName + ".lastMyBuyPriceOriginalMinusRaznost: " + lastMyBuyPriceOriginalMinusRaznost);
    eventLogger(scriptName + ".lastMySellPricePlusRaznost: " + lastMySellPricePlusRaznost);
    eventLogger(scriptName + ".raznost: " + raznost);

    openBidsCount = trader.get("OpenBidsCount");
    openBidsCountCheckFun();

    //if ((lastMyBuyPrice <= lastMyBuyPriceOriginalMinusRaznost && lastMyBuyPrice <= lastMyBuyPriceOriginal && (openBidsCount == 0))) {
    if (lastMyBuyPrice <= lastMyBuyPriceOriginalMinusRaznost && lastMyBuyPrice <= lastMyBuyPriceOriginal && lastPrice < lastMyBuyPriceMinusRaznost) {
        eventLogger(scriptName + ".STEP1");
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;
    }


    //////////////////////////////////////////////////////////////////////
    var openAsksCount = trader.get("OpenAsksCount");
    // if there are no open asks
    if (openAsksCount == 0) {
        eventLogger(scriptName + ".STEP2");
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;
    }
    //////////////////////////////////////////////////////////////////////
    var lastPrice = trader.get("LastPrice");
    var diffLastMySellPriceLastPrice = Math.abs(lastMySellPrice - lastPrice);
    var diffLastMyBuyPriceLastPrice = Math.abs(lastMyBuyPrice - lastPrice);


    eventLogger(scriptName + ".diffLastMySellPriceLastPrice: " + diffLastMySellPriceLastPrice);
    eventLogger(scriptName + ".diffLastMyBuyPriceLastPrice: " + diffLastMyBuyPriceLastPrice);
    eventLogger(scriptName + ".lastMyBuyPriceOriginalDiffRaznost: " + lastMyBuyPriceOriginalDiffRaznost);
    eventLogger(scriptName + ".openBidsCount: " + openBidsCount);

    var partValueBuy = Math.abs(lastMyBuyPrice - lastPrice) / lastPrice;

    eventLogger(scriptName + ".partValueBuy: " + partValueBuy);

    /*if (raznost > diffLastMySellPriceLastPrice && openBidsCount == 0 && diffLastMySellPriceLastPrice < diffLastMyBuyPriceLastPrice) {
        //if (partValue > raznost && openBidsCount == 0 && diffLastMySellPriceLastPrice < diffLastMyBuyPriceLastPrice) {
        eventLogger(scriptName + ".STEP3");
        eventLogger(scriptName + ".raznost: " + raznost);
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;
    }*/

    //buy if last price is higher then last sell price and there are no open bids
    /*if (openBidsCount == 0 && lastPrice >= lastMySellPrice && lastMySellPrice > lastMyBuyPrice) {
        eventLogger(scriptName + ".STEP4");
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;
    }*/

    if (lastPrice < (lastMyBuyPrice - raznost) && lastPrice < lastMyBuyPrice && openBidsCount == 0) {
        eventLogger(scriptName + ".STEP5");
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;
    }
    var partValueSell = Math.abs(lastMySellPrice - lastPrice) / lastPrice;

    eventLogger(scriptName + ".partValueSell: " + partValueSell);
    eventLogger(scriptName + ".lastPrice - lastMySellPrice: " + (lastPrice - lastMySellPrice));
    eventLogger(scriptName + ".lastMyBuyPrice - lastPrice: " + (lastMyBuyPrice - lastPrice));

    //raznost = lastPrice * (raznostInPercentage / 100);

    if (openBidsCount == 0 && lastPrice < lastMyBuyPrice && (lastMyBuyPrice - lastPrice) >= raznost)
    //if(openBids == 0 && lastMySellPrice > lastPrice && partValueSell > (lastPrice - lastMySellPrice) && lastMyBuyPrice > lastPrice && partValueSell > raznost)
    {
        eventLogger(scriptName + ".STEP6");
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;
    }

    eventLogger(scriptName + ".lastTradeStatus: " + lastTradeStatus);

    if (lastTradeStatus == "SELL") {
        eventLogger(scriptName + ".STEP7");
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;
    }


    if (openBidsCount == 0 && resetBidsEnabled != "true" && lastPrice < lastMyBuyPriceMinusRaznost) {
        eventLogger(scriptName + ".STEP8");
        makeBid = true;
        //script1();
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;

    }

    if (openBidsCount == ordersOriginalValue && lastPrice < lastMySellPrice && (lastMySellPrice - lastPrice) < raznost) {
        eventLogger(scriptName + ".STEP9");
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;

    }

    if (openAsksCount == 0 && openBidsCount == 0) {
        eventLogger(scriptName + ".STEP10");
        makeBid = true;
        eventLogger(scriptName + ".makeBid: " + makeBid);
        return makeBid;
    }

    eventLogger(scriptName + ".makeBid: " + makeBid);
    eventLogger(scriptName + ".END");
    return makeBid;
}

// sum all id's from 1 to n  -- if n = 5 then sum is equal 1+2+3+4+5 = 15
function getSumAskIdNumbers() {
    var scriptName = "getSumAskIdNumbers()";
    eventLogger(scriptName + ".START");
    var temp = 0;
    for (var i = 1; i <= bidsDistributionMaxNumberOfBids; i++)
        temp += i;
    eventLogger(scriptName + ".START");
    return temp;
}

//if there can be set 10 max number of bids/asks and min first bid is 0.01, then firt bid will be 
function getDistributedBid(bidNumber) {
    var scriptName = "getDistributedBid()";
    eventLogger(scriptName + ".START");
    eventLogger(scriptName + ".bidNumber: " + bidNumber);

    var bidValue = 0;
    var openAsksNumber = trader.get("OpenAsksCount");
    eventLogger(scriptName + ".openAsksNumber: " + openAsksNumber);
    // bidsDistributionFirstBid
    // bidsDistributionMaxNumberOfBids
    // bidsDistributionMaxVolumeSecondCurrency

    if (sumAskIdNumbers == 0) {
        eventLogger(scriptName + ".STEP1");
        sumAskIdNumbers = getSumAskIdNumbers();
        eventLogger(scriptName + ".sumAskIdNumbers: " + sumAskIdNumbers);
    }

    var bidPart = 0;
    eventLogger(scriptName + ".sumAskIdNumbers: " + sumAskIdNumbers);
    eventLogger(scriptName + ".bidsDistributionMaxVolumeSecondCurrency: " + bidsDistributionMaxVolumeSecondCurrency);
    eventLogger(scriptName + ".bidsDistributionMaxNumberOfBids: " + bidsDistributionMaxNumberOfBids);
    eventLogger(scriptName + ".bidsDistributionMinExchangeBid: " + bidsDistributionMinExchangeBid);

    if (sumAskIdNumbers > 0 && bidsDistributionMaxVolumeSecondCurrency > 0 && bidsDistributionMaxNumberOfBids > 0) {
        eventLogger(scriptName + ".STEP2");
        bidPart = bidsDistributionMaxVolumeSecondCurrency / sumAskIdNumbers;
        eventLogger(scriptName + ".bidPart: " + bidPart);
        var tempValue1 = (openAsksNumber + bidNumber) * bidPart;
        var tempValue2 = (openAsksNumber + bidNumber) / sumAskIdNumbers;
        bidValue = bidsDistributionMinExchangeBid + tempValue1 - tempValue2;

        eventLogger(scriptName + ".tempValue1: " + tempValue1);
        eventLogger(scriptName + ".tempValue2: " + tempValue2);
        eventLogger(scriptName + ".bidValue: " + bidValue);

    }

    eventLogger(scriptName + ".END");
    return bidValue;
}

function makeBids() {
    var scriptName = "makeBids()";
    eventLogger(scriptName + ".START");

    var currencyPrimaryBalance = trader.get("Balance", currencyPrimary);
    var currencySecondaryBalance = trader.get("Balance", currencySecondary);

    eventLogger(scriptName + ".currencyPrimaryKeepAmountFixedValue: " + currencyPrimaryKeepAmountFixedValue);
    eventLogger(scriptName + ".currencyPrimaryBalance: " + currencyPrimaryBalance);
    eventLogger(scriptName + ".currencySecondaryKeepAmountFixedValue: " + currencySecondaryKeepAmountFixedValue);
    eventLogger(scriptName + ".currencySecondaryBalance: " + currencySecondaryBalance);

    //TODO - currencySecondaryKeepAmountFixedValue & currencyPrimaryKeepAmountFixedValue make tolerance 1%
    if (currencyPrimaryBalance >= (currencyPrimaryKeepAmountFixedValue * 0.99) || currencySecondaryBalance > (currencySecondaryKeepAmountFixedValue * 0.99)) {
        if (canMakeBid()) {
            eventLogger(scriptName + ".STEP1");
            var openBidsCount = trader.get("OpenBidsCount");

            if (ordersOriginalValue == openBidsCount) {
                eventLogger(scriptName + "./#/#/#/#////////////   RESTART   ////////////////////");
                restartAll();
            }
            //cancel previous bids
            if (openBidsCount != 0) {
                eventLogger(scriptName + "./#/#/#/#////////////   CANCEL BIDS   ////////////////////");
                trader.cancelBids(currencySecondary + currencyPrimary);
            }


            var all = currencyPrimaryBalance * depo;
            eventLogger(scriptName + ".depo: " + depo);
            eventLogger(scriptName + ".all: " + all);

            var yyy = 0;
            eventLogger(scriptName + ".STEP2");
            for (var i = 0; i < orders;) {
                yyy = yyy + Math.pow(martin, i);
                eventLogger(scriptName + ".|||||||||||||||||||||||||||||||||||||||||||");
                eventLogger(scriptName + ".i: " + i);
                eventLogger(scriptName + ".martin: " + martin);
                eventLogger(scriptName + ".Math.pow(martin, i): " + Math.pow(martin, i));
                eventLogger(scriptName + ".yyy: " + yyy);
                i = i + 1;
            }

            eventLogger(scriptName + ".STEP3");
            var amount = all / yyy;
            var firstBidPriceDiff = 0;
            eventLogger(scriptName + ".amount: " + amount);
            eventLogger(scriptName + ".firstBidPriceDiff: " + firstBidPriceDiff);
            eventLogger(scriptName + ".orders: " + orders);
            eventLogger(scriptName + ".STEP4");

            for (var i = 0; i < orders;) {
                eventLogger(scriptName + ".-------------------------------------------");
                eventLogger(scriptName + ".i: " + i);
                eventLogger(scriptName + ".allBidsPriceEnabled: " + allBidsPriceEnabled);
                eventLogger(scriptName + ".allBidsPrice: " + allBidsPrice);
                eventLogger(scriptName + ".amount: " + amount);

                if (allBidsPriceEnabled == "true") {
                    eventLogger(scriptName + ".STEP5");
                    amount = allBidsPrice;
                } else if (i == 0 && firstBidPriceEnabled == "true") {
                    eventLogger(scriptName + ".STEP6");
                    if (firstBidPrice < amount) {
                        eventLogger(scriptName + ".STEP7");
                        firstBidPriceDiff = amount - firstBidPrice;
                        amount = firstBidPrice;
                    }
                }

                if (bidsDistributionEnabled == "true") {
                    eventLogger(scriptName + ".STEP8");
                    eventLogger(scriptName + ".i: " + i);
                    var bidTemp = getDistributedBid(i);
                    if (bidTemp != 0) {
                        eventLogger(scriptName + ".STEP9");
                        eventLogger(scriptName + ".bidTemp: " + bidTemp);
                        amount = bidTemp;

                    }
                }
                eventLogger(scriptName + ".amount: " + amount);
                eventLogger(scriptName + ".price: " + price);

                if ((allBidsPriceEnabled == "true") || (i == 1 && firstBidPriceEnabled == "true") || (bidsDistributionEnabled == "true")) {
                    eventLogger(scriptName + ".STEP10");
                    trader.buy(currencySecondary + currencyPrimary, amount, price);
                } else {
                    eventLogger(scriptName + ".STEP11");
                    trader.buy(currencySecondary + currencyPrimary, amount / price, price);
                }

                eventLogger(scriptName + ".STEP12");
                //myVolumes[i] = amount;
                //myPrices[i] = price;
                price = price - raznost;

                amount = amount * martin;
                eventLogger(scriptName + ".amount: " + amount);
                eventLogger(scriptName + ".price: " + price);

                i = i + 1;
            }
        }
    }
    eventLogger(scriptName + ".END");
}

function checkIfAskCanBeMade() {
    var scriptName = "checkIfAskCanBeMade()";
    eventLogger(scriptName + ".START");

    eventLogger(scriptName + ".Read secondary balance");
    var currencySecondaryBalance = trader.get("Balance", currencySecondary);
    eventLogger(scriptName + ".Read last secondary balance from file");
    lastCurrencySecondaryBallance = parseFloat(trader.fileReadAll(lastCurrencySecondaryBallanceFile));
    eventLogger(scriptName + ".currencySecondaryBalance: " + currencySecondaryBalance);
    eventLogger(scriptName + ".lastCurrencySecondaryBallance: " + lastCurrencySecondaryBallance);
    eventLogger(scriptName + ".currencySecondaryKeepAmountFixedValue: " + currencySecondaryKeepAmountFixedValue);

    //TODO - currencySecondaryKeepAmountFixedValue - not o.k.!!!!
    if (lastCurrencySecondaryBallance > 0.001 || currencySecondaryBalance > 0.001) {
        eventLogger(scriptName + ".STEP1");
        makeAsk();
    }

    eventLogger(scriptName + ".STEP2");
    eventLogger(scriptName + ".END");
}

function cancelAsks() {
    var scriptName = "cancelAsks()";
    eventLogger(scriptName + ".START");

    trader.cancelAsks();
    eventLogger(scriptName + ".END");

}

function resetArrays() {
    var scriptName = "resetArrays()";
    eventLogger(scriptName + ".START");

    for (var i = 0; i < 20; i++) {
        myPrices[i] = "";
        myVolumes[i] = "";
    }
    eventLogger(scriptName + ".END");

}

function makeAsk() {

    var scriptName = "makeAsk()";
    eventLogger(scriptName + ".START ///////////////////////////////////////////");
    var makeSell = false;

    //TODO - make control to hold, when amount bigger then set in bidsDistributionMaxVolumeSecondCurrency or in similiar variable
    if (currencySecondaryKeepAmountFixedValue > 0) {
        eventLogger(scriptName + ".STEP 0.1");
        //lastCurrencySecondaryBallance = parseFloat(trader.fileReadAll(lastCurrencySecondaryBallanceFile));
        //if (lastCurrencySecondaryBallance == 0)
        //    lastCurrencySecondaryBallance = trader.get("Balance", currencySecondary);
        lastCurrencySecondaryBallance = trader.get("Balance", currencySecondary);

        eventLogger(scriptName + ".lastCurrencySecondaryBallance: " + lastCurrencySecondaryBallance);
        var tempValue = lastCurrencySecondaryBallance - currencySecondaryKeepAmountFixedValue;

        eventLogger(scriptName + ".tempValue: " + tempValue);
        if (tempValue > 0) {
            eventLogger(scriptName + ".STEP 0.2");
            lastCurrencySecondaryBallance = tempValue;
            makeSell = true;
        }

        ////////////////////////////////////////////////////////////////////////////////
        var tempValue3 = 0;
        tempValue3 = lastCurrencySecondaryBallance - minBidAmount * (1 - feeMaker);
        eventLogger(scriptName + ".tempValue3: " + tempValue3);
        if (tempValue3 < 0) {
            eventLogger(scriptName + ".STEP 0.3");
            makeSell = false;
        }
        ////////////////////////////////////////////////////////////////////////////////

    } else {
        eventLogger(scriptName + ".STEP 0.3");
        makeSell = true;
    }

    eventLogger(scriptName + ".makeSell == true && currencySecondaryKeepAmountFixedValue > (lastCurrencySecondaryBallance - minBidAmount))");
    eventLogger(scriptName + ".currencySecondaryKeepAmountFixedValue: " + currencySecondaryKeepAmountFixedValue);
    eventLogger(scriptName + ".lastCurrencySecondaryBallance: " + lastCurrencySecondaryBallance);
    eventLogger(scriptName + ".minBidAmount: " + minBidAmount);
    eventLogger(scriptName + ".currencySecondaryKeepAmountFixedValue > (lastCurrencySecondaryBallance - minBidAmount))" + currencySecondaryKeepAmountFixedValue > (lastCurrencySecondaryBallance - minBidAmount));
    if (makeSell == true && currencySecondaryKeepAmountFixedValue == 0 || ((currencySecondaryKeepAmountFixedValue > (lastCurrencySecondaryBallance - minBidAmount) && currencySecondaryKeepAmountFixedValue != 0))) {
        var lastPrice = trader.get("LastPrice");
        var lastBuyPrice = trader.get("LastMyBuyPrice");
        var buyFee = lastBuyPrice / 1000 * (feeMaker * 1000);
        var absValue = Math.abs(lastBuyPrice - lastPrice);

        eventLogger(scriptName + ".lastBuyPrice: " + lastBuyPrice);
        eventLogger(scriptName + ".buyFee: " + buyFee);
        eventLogger(scriptName + ".absValue: " + absValue);
        eventLogger(scriptName + ".lastCurrencySecondaryBallance: " + lastCurrencySecondaryBallance);
        eventLogger(scriptName + ".profitCurrencyPrimaryAmountCondition: " + profitCurrencyPrimaryAmountCondition);
        eventLogger(scriptName + ".profitCurrencyPrimaryAmount: " + profitCurrencyPrimaryAmount);
        eventLogger(scriptName + ".feeTaker: " + feeTaker);
        eventLogger(scriptName + ".feeMaker: " + feeMaker);


        /////////////////////////////////////////////////////////////////////

        var rightPrice = 0;

        if (absValue < 2) {
            eventLogger(scriptName + ".absValue < 2");
            rightPrice = lastBuyPrice;
        } else {
            eventLogger(scriptName + ".absValue >= 2");
            rightPrice = lastPrice;
        }
        eventLogger(scriptName + ".rightPrice: " + rightPrice);

        var openAsksCount = trader.get("OpenAsksCount");
        var minAskValue = 0.001; // 0.01 <=> 1%
        var maxAskValue = 0.002;
        var tempValue = (maxAskValue / minAskValue) - 1;
        var sellValueProfitInPercentage = 0;
        if (bidsDistributionEnabled == true)
            sellValueProfitInPercentage = minAskValue + openAsksCount * tempValue / (bidsDistributionMaxNumberOfBids * 1000);
        else {
            if (profitCurrencyPrimaryAmountCondition == "true") {} else {
                sellValueProfitInPercentage = profitInPercentage;
            }
        }

        eventLogger(scriptName + ".minAskValue: " + minAskValue);
        eventLogger(scriptName + ".maxAskValue: " + maxAskValue);
        eventLogger(scriptName + ".tempValue: " + tempValue);
        eventLogger(scriptName + ".sellValue: " + sellValueProfitInPercentage);


        ///////////////////////////////////            
        // 0.05 ETH
        // 0,075 lastBuyPrice
        var lastCurrencySecondaryBallanceBeforeBuy = lastCurrencySecondaryBallance / ((1 - feeMaker) * 1000) * 1000;
        eventLogger(scriptName + ".lastCurrencySecondaryBallanceBeforeBuy: " + lastCurrencySecondaryBallanceBeforeBuy);

        // 0,00375000 BTC            
        var lastCurrencyPrimaryBallanceBeforeBuy = lastCurrencySecondaryBallanceBeforeBuy * rightPrice
        eventLogger(scriptName + ".lastCurrencyPrimaryBallanceBeforeBuy: " + lastCurrencyPrimaryBallanceBeforeBuy);

        // 0,00000375 BTC
        var primaryBalanceProfitValue = 0;
        if (profitCurrencyPrimaryAmountCondition == "true")
            primaryBalanceProfitValue = profitCurrencyPrimaryAmount;
        else
            primaryBalanceProfitValue = lastCurrencyPrimaryBallanceBeforeBuy * sellValueProfitInPercentage;
        eventLogger(scriptName + ".primaryBalanceProfitValue: " + primaryBalanceProfitValue);

        // 0,00000375 BTC
        var primaryBalanceBuyFeeValue = 0;


        primaryBalanceBuyFeeValue = lastCurrencyPrimaryBallanceBeforeBuy * feeMaker;
        eventLogger(scriptName + ".primaryBalanceBuyFeeValue: " + primaryBalanceBuyFeeValue);

        // 0,00375375 BTC
        var currencyPrimaryTargetedBallanceWithNoSellFee = lastCurrencyPrimaryBallanceBeforeBuy + primaryBalanceProfitValue;
        eventLogger(scriptName + ".currencyPrimaryTargetedBallanceWithNoSellFee: " + currencyPrimaryTargetedBallanceWithNoSellFee);

        // =(C26/((1-C18)*1000))*1000
        // 0,00375751 BTC
        var currencyPrimaryTargetedBallance = currencyPrimaryTargetedBallanceWithNoSellFee / ((1 - feeTaker) * 1000) * 1000;
        eventLogger(scriptName + ".currencyPrimaryTargetedBallance: " + currencyPrimaryTargetedBallance);

        // 0,07522538
        var sellPrice = currencyPrimaryTargetedBallance / lastCurrencySecondaryBallance;
        eventLogger(scriptName + ".sellPrice: " + sellPrice);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////       

        var lastMySellPriceFile = variablePath + "lastMySellPrice.txt";
        trader.fileWrite(lastMySellPriceFile, sellPrice);

        if (raznostInPercentageCondition == "true") {
            rest = lastBuyPrice + (sellPrice - lastBuyPrice) * resetPrice;
        }

        var checkNumberOfBids = 0;
        eventLogger(scriptName + ".allBidsPriceEnabled: " + allBidsPriceEnabled);
        eventLogger(scriptName + ".profitInPercentage: " + profitInPercentage);
        eventLogger(scriptName + ".lastCurrencySecondaryBallance: " + lastCurrencySecondaryBallance);
        if (allBidsPriceEnabled == "true" && (profitInPercentage > 0 || profitCurrencyPrimaryAmount > 0) && lastCurrencySecondaryBallance > allBidsPrice) {
            eventLogger(scriptName + ".DISTRIBUTE SELLS");
            eventLogger(scriptName + ".lastCurrencySecondaryBallance: " + lastCurrencySecondaryBallance);
            eventLogger(scriptName + ".allBidsPrice: " + allBidsPrice);
            checkNumberOfBids = lastCurrencySecondaryBallance / allBidsPrice;
            eventLogger(scriptName + ".checkNumberOfBids: " + checkNumberOfBids);
            checkNumberOfBids = Math.round(checkNumberOfBids);
            eventLogger(scriptName + ".checkNumberOfBids: " + checkNumberOfBids);
            if (checkNumberOfBids > 1) {
                var sellBuyDifference = sellPrice - lastBuyPrice;
                eventLogger(scriptName + ".sellBuyDifference: sellBuyDifference = sellPrice - lastBuyPrice");
                eventLogger(scriptName + ".sellBuyDifference: " + sellBuyDifference + " = " + sellPrice + " - " + lastBuyPrice);
                eventLogger(scriptName + ".sellBuyDifference: " + sellBuyDifference);
                eventLogger(scriptName + ".raznostInPercentage: " + raznostInPercentage);
                var tempValue1 = 0;
                var tempValue4 = 0;
                tempValue4 = lastBuyPrice;
                
                eventLogger(scriptName + ". tempValue4 = tempValue4 + tempValue4 * (raznostInPercentage /100) * checkNumberOfBids * (1 * 1.05)");
                eventLogger(scriptName + ". tempValue4 = " + tempValue4 + " + " + tempValue4  + " * (" + raznostInPercentage + " /100) * " + checkNumberOfBids  + " * (1 * 1.05)");
                if (profitInPercentage > 0) {
                    //tempValue1 = sellBuyDifference * profitInPercentage * (checkNumberOfBids * (1 + raznostInPercentage));
                    //eventLogger(scriptName + ".raznostInPercentage: tempValue1 = sellBuyDifference * profitInPercentage * (checkNumberOfBids * (1 + raznostInPercentage));");
                    //eventLogger(scriptName + ".raznostInPercentage: " + tempValue1 + " = " + sellBuyDifference + " * " + profitInPercentage + " * (" + checkNumberOfBids + " * (1 + " + raznostInPercentage + "));");
                    
                    
                    tempValue4 = tempValue4 + tempValue4 * (raznostInPercentage / 100) * checkNumberOfBids * (1 * 1.05);

                } else {
                    //tempValue1 = sellBuyDifference + profitCurrencyPrimaryAmount * (checkNumberOfBids * (1 + raznostInPercentage));
                    //eventLogger(scriptName + ".raznostInPercentage: tempValue1 = sellBuyDifference + profitCurrencyPrimaryAmount * (checkNumberOfBids * (1 + raznostInPercentage));");
                    //eventLogger(scriptName + ".raznostInPercentage: " + tempValue1 + " = " + sellBuyDifference + " + " + profitCurrencyPrimaryAmount + " * (" + checkNumberOfBids + " * (1 + " + raznostInPercentage + "));");

                    tempValue4 = tempValue4 + tempValue4 * (raznostInPercentage / 100) * checkNumberOfBids * (1 * 1.05);
                }
                eventLogger(scriptName + ".tempValue1: " + tempValue1);
                var tempValue2 = tempValue1 * (checkNumberOfBids / 10);
                eventLogger(scriptName + ".tempValue2: " + tempValue2);
                //if (profitInPercentage > 0) 
                //    sellPrice = lastBuyPrice + tempValue1 + tempValue2;
                //else 
                sellPrice = tempValue4;
                if (lastSellPriceGenerated == sellPrice) {
                    eventLogger(scriptName + ".lastSellPriceGenerated == sellPrice");
                    eventLogger(scriptName + ".lastSellPriceGenerated: " + lastSellPriceGenerated);
                    eventLogger(scriptName + ".sellPrice: " + sellPrice);
                    restartAll();
                }
                    
                eventLogger(scriptName + ".sellPrice: " + sellPrice);
                if (currencySecondaryKeepAmountFixedValue > 0) {
                    eventLogger(scriptName + ".STEP 2.1");
                    if (lastCurrencySecondaryBallance - allBidsPrice < currencySecondaryKeepAmountFixedValue) {
                        eventLogger(scriptName + ".STEP 2.2");
                        var calc = allBidsPrice * (1 - (feeTaker));
                        eventLogger(scriptName + ".calc: " + calc);
                        if(checkSellAmount(calc, sellPrice))
                            trader.sell(currencySecondary + currencyPrimary, calc, sellPrice);
                    } else {
                        eventLogger(scriptName + ".STEP 2.3");
                        if(checkSellAmount(allBidsPrice, sellPrice))
                            trader.sell(currencySecondary + currencyPrimary, allBidsPrice, sellPrice);
                    }
                } else
                {
                    if(checkSellAmount(allBidsPrice, sellPrice))
                        trader.sell(currencySecondary + currencyPrimary, allBidsPrice, sellPrice);
                }
            }
        }
        if (checkNumberOfBids <= 1) {
            if (currencySecondaryKeepAmountFixedValue > 0) {
                eventLogger(scriptName + ".STEP 3.1");
                if (lastCurrencySecondaryBallance - lastCurrencySecondaryBallance < currencySecondaryKeepAmountFixedValue) {
                    eventLogger(scriptName + ".STEP 3.2");
                    var calc = lastCurrencySecondaryBallance * (1 - (feeTaker));
                    eventLogger(scriptName + ".calc: " + calc);
                    if(checkSellAmount(calc, sellPrice))
                        trader.sell(currencySecondary + currencyPrimary, calc, sellPrice);
                } else {
                    eventLogger(scriptName + ".STEP 3.3");
                    if(checkSellAmount(lastCurrencySecondaryBallance, sellPrice))                        
                        trader.sell(currencySecondary + currencyPrimary, lastCurrencySecondaryBallance, sellPrice);
                }
            } else {
                eventLogger(scriptName + ".STEP 3.4");
                if(checkSellAmount(lastCurrencySecondaryBallance, sellPrice))       
                    trader.sell(currencySecondary + currencyPrimary, lastCurrencySecondaryBallance, sellPrice);
            }
        }

        lastCurrencySecondaryBallanceFileWriter(0);
        restartAll();
    }
    //TODO - check variable lastCurrencySecondaryBallanceFile

    eventLogger(scriptName + ".END");
}

function checkSellAmount(sellAmount, sellPrice)
{
    var scriptName = "checkSellAmount()";
    eventLogger(scriptName + ".START");
    eventLogger(scriptName + ".sellAmount: " + sellAmount);
    eventLogger(scriptName + ".sellPrice: " + sellPrice);
    eventLogger(scriptName + ".minBidAmount: " + minBidAmount);
    if(sellAmount > minBidAmount)
    {
        lastSellPriceGenerated = sellPrice;
        trader.fileWrite(lastTradeStatusFile, "BUY");
        return true;
    }
    return false;
}

function restartAll() {

    var scriptName = "restartAll()";
    eventLogger(scriptName + ".START");
    eventLogger(scriptName + "./#/#/#/#////////////   RESTART   ////////////////////");
    eventLogger(scriptName + ".Restart Trader & TraderMain & TraderMainRestart");
    openAsksCountCheckFun();
    trader.groupStop("TraderMain");
    trader.groupStop("Trader");
    trader.groupStop("TraderMainRestart");
    trader.groupStart("TraderMainRestart");

    eventLogger(scriptName + ".END");
}

function lastCurrencySecondaryBallanceFileWriter(writeValue) {
    var scriptName = "lastCurrencySecondaryBallanceFileWriter()";
    eventLogger(scriptName + ".START");

    eventLogger(scriptName + ".writeValue: " + writeValue);
    trader.fileWrite(lastCurrencySecondaryBallanceFile, writeValue);

    eventLogger(scriptName + ".END");
}


function restartEverything() {

    var scriptName = "restartEverything()";
    eventLogger(scriptName + ".START");

    var openBidsCount = trader.get("OpenBidsCount");
    lastCurrencySecondaryBallance = parseFloat(trader.fileReadAll(lastCurrencySecondaryBallanceFile));
    eventLogger(scriptName + ".orders: " + orders);
    eventLogger(scriptName + ".openBidsCount: " + openBidsCount);
    eventLogger(scriptName + ".lastCurrencySecondaryBallance: " + lastCurrencySecondaryBallance);

    if (openBidsCount != orders) {
        eventLogger(scriptName + ".STEP1");
        var openAsksCount = trader.get("OpenAsksCount");
        eventLogger(scriptName + ".openAsksCount: " + openAsksCount);
        if (openAsksCount < 1) {
            eventLogger(scriptName + ".STEP2");
            var currencySecondaryBalance = trader.get("Balance", currencySecondary);
            eventLogger(scriptName + ".currencySecondaryBalance: " + currencySecondaryBalance);
            if (lastCurrencySecondaryBallance < 0.000001) {
                eventLogger(scriptName + ".STEP3");                
                eventLogger(scriptName + "./#/#/#/#////////////   RESTART   ////////////////////");
                restartAll();
            }
        }
    }
    eventLogger(scriptName + ".END");
}

/*function sellAfterBuy() {
    //////////////////////////////
    fileLogger = "sellAfterBuy().start";
    logger();
    //////////////////////////////
    var lastSell = trader.get("LastMySellPrice");
    for (var count = 0; count < myPrices.length; count++) {
        if (lastSell == myPrices[count]) {
            trader.sell(currencySecondary + currencyPrimary, myVolumes[count], myPrices[count] * (1 + (profit / 100) + trader.get("Fee")));
            trader.on("LastMySellPrice").changed() {
                orders++;
                resetArrays();
                martin++;
                script2();
            }
        }
    }
    //////////////////////////////
    fileLogger = "sellAfterBuy().stop";
    logger();
    //////////////////////////////
}*/

/*function aaa() {
                var scriptName = "aaa()";
                eventLogger(scriptName + ".START");

    trader.log("VAL[END: aaa()]: ");
    lastCurrencySecondaryBallance = parseFloat(trader.fileReadAll(lastCurrencySecondaryBallanceFile));
    trader.on("OpenBidsCount").changed() {
        trader.log("VAL[aaa().trader.get(Balance, ETH)]: ", trader.get("Balance", currencySecondary));
        if (lastCurrencySecondaryBallance > 0.000001) {
            trader.log("VAL[aaa().trader.get(Balance, ETH)]: ", trader.get("Balance", currencySecondary));
            trader.log("VAL[aaa().pperv]: ", pperv);
            trader.log("VAL[aaa().pperv * 0.9999]: ", pperv * 0.9999);
            if (trader.get("Balance", currencySecondary) < pperv * 0.9999) {
                trader.log("VAL[aaa().trader.get(OpenAsksCount)]: ", trader.get("OpenAsksCount"));
                if (trader.get("OpenAsksCount") == 1) {
                    trader.log("VAL[aaa()]: ");
                    if (pperv != 0) {
                        ppervraz = pperv - trader.get("Balance", currencySecondary);
                        trader.log("VAL[aaa().ppervraz]: ", ppervraz);
                        // Pvtorvraz = ppervraz * trader.get("LastMySellPrice") 
                    }
                }
            }
        }
        
    }
    trader.log("VAL[END: aaa()]: ");
    //////////////////////////////
    fileLogger = "aaa().stop";
    logger();
    //////////////////////////////
}
*/



trader.on("LastMyBuyPrice").changed() {
    var scriptName = "trader.on(LastMyBuyPrice.changed())";
    eventLogger(scriptName + ".START");

    //trader.fileWrite(lastTradeStatusFile, "BUY");
    lastTradeStatus = "BUY";
    eventLogger(scriptName + ".BUY");
    trader.fileWrite(lastTradeStatusFile, "BUY");

    checkIfAskCanBeMade();

    //eventLogger(scriptName + ".Restart TraderMainRestart");
    //trader.cancelBids(currencySecondary + currencyPrimary);
    //trader.groupStop("TraderMainRestart");
    //trader.groupStart("TraderMainRestart");

    eventLogger(scriptName + ".END");
}

trader.on("LastMySellPrice").changed() {
    var scriptName = "trader.on(LastMySellPrice.changed())";
    eventLogger(scriptName + ".START");

    trader.fileWrite(lastTradeStatusFile, "SELL");
    lastTradeStatus = "SELL";
    eventLogger(scriptName + ".SELL");

    eventLogger(scriptName + ".END");
}