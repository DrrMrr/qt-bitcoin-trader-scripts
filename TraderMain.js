var variablePath = "C:\\Users\\Damjan\\Documents\\GitHub\\qt-bitcoin-trader-scripts\\BTCIOT\\";

///////////////		log to file or window		///////////////////
var logToFile = true;
var logToWindow = true;
var logFile = variablePath + "TraderMainLogger.txt";

function eventLogger(tempString) {
    if (logToFile)
        trader.fileAppend(logFile, trader.dateTimeString() + ": " + tempString);
    if (logToWindow)
        trader.log(tempString);
}


var lastTradeStatusFile = variablePath + "lastTradeStatusFile.txt";

eventLogger("///////////////////////        START - TRADER MAIN       ///////////////////");
///////////////////////////////////////////////////////////////////
lastMyBuyPrice();
trader.timer(57, "lastMyBuyPrice()");
///////////////////////////////////////////////////////////////////
var currencyPrimary = "BTC";
var currencySecondary = "IOT";

var scriptName = "";
var lastSaleFile = variablePath + "lastSale.txt";
var lastMySellPriceOld = trader.get("LastMySellPrice");
eventLogger(scriptName + ".lastMySellPrice: " + lastMySellPriceOld);
trader.fileWrite(lastSaleFile, lastMySellPriceOld);

///////////////////////////////////////////////////////////////////
//var lastCurrencySecondaryBallanceFile = variablePath + "lastCurrencySecondaryBallance.txt";
var currencySecondaryBalance = trader.get("Balance", currencySecondary);
eventLogger(scriptName + ".currencySecondaryBalance: " + currencySecondaryBalance);
//trader.fileWrite(lastCurrencySecondaryBallanceFile, currencySecondaryBalance);

///////////////////////////////////////////////////////////////////
var bidPriceFile = variablePath + "bidPrice.txt";
var bidPrice = trader.get("BidPrice");
eventLogger(scriptName + ".bidPrice: " + bidPrice);
trader.fileWrite(bidPriceFile, bidPrice);

var openBidsCount = 0;
var openAsksCount = trader.get("OpenAsksCount");
var openAsksCountOld = openAsksCount;

eventLogger(scriptName + ".Restart Trader");
trader.groupStop("Trader");
trader.groupStart("Trader");

trader.timer(41, "restartEverything()");

function restartEverything() {
    var scriptName = "restartEverything()";
    eventLogger(scriptName + ".START");
    
    openAsksCount = trader.get("OpenAsksCount");
    var lastMySellPrice = trader.get("LastMySellPrice");
    eventLogger(scriptName + ".lastMySellPriceOld: " + lastMySellPrice);
    eventLogger(scriptName + ".lastMySellPrice: " + lastMySellPriceOld);
    eventLogger(scriptName + ".openAsksCount: " + openAsksCount);
    eventLogger(scriptName + ".openAsksCountOld: " + openAsksCountOld);	
	
	if(openAsksCount < openAsksCountOld)
	{		
			eventLogger(scriptName + ".STEP0");
			//restartTraderMainRestart();
	}
	
    if (lastMySellPrice != lastMySellPriceOld) {
        eventLogger(scriptName + ".STEP1");        
        //restartTraderMainRestart();
											  
											   
    } else {
        eventLogger(scriptName + ".STEP2");
        bidPrice = trader.get("BidPrice");
        eventLogger(scriptName + ".bidPrice: " + bidPrice);
        trader.fileWrite(bidPriceFile, bidPrice);

        currencySecondaryBalance = trader.get("Balance", currencySecondary);
        eventLogger(scriptName + ".currencySecondaryBalance: " + currencySecondaryBalance);

        openBidsCount = trader.get("OpenBidsCount");
        openAsksCount = trader.get("OpenAsksCount");
        eventLogger(scriptName + ".openBidsCount: " + openBidsCount);
        eventLogger(scriptName + ".openAsksCount: " + openAsksCount);
        eventLogger(scriptName + ".openAsksCountOld: " + openAsksCountOld);

        
        if ((((openAsksCount < openAsksCountOld) || (openAsksCount == openAsksCountOld && lastMySellPriceOld != 0)) && lastMySellPriceOld != lastMySellPrice)) {
        
            eventLogger(scriptName + ".STEP3");
														  
            lastMySellPriceOld = lastMySellPrice;
            trader.fileWrite(lastSaleFile, lastMySellPriceOld);            
																   
            trader.cancelBids(currencySecondary + currencyPrimary);
            //restartTraderMainRestart();
												   
        }
										 
    }
	openAsksCountOld = openAsksCount;
    eventLogger(scriptName + ".END");
}

function restartTraderMainRestart()
{
	var scriptName = "restartTraderMainRestart()";
    eventLogger(scriptName + ".START");
    eventLogger(scriptName + "./#/#/#/#////////////   RESTART   ////////////////////");
    eventLogger(scriptName + ".SELL.lastTradeStatusFile");
    trader.fileWrite(lastTradeStatusFile, "SELL");
    eventLogger(scriptName + ".STOP.TraderMainRestart");
    trader.groupStop("TraderMainRestart");
    eventLogger(scriptName + ".STOP.Trader");
    trader.groupStop("Trader");
    eventLogger(scriptName + ".START.TraderMainRestart");	
    trader.groupStart("TraderMainRestart");
    eventLogger(scriptName + ".Start.TraderMain");
	trader.groupStop("TraderMain");
	
	eventLogger(scriptName + ".END");
}

function lastMyBuyPrice() {
    var scriptName = "lastMyBuyPrice()";
    eventLogger(scriptName + ".START");
    trader.groupStop("TraderLastBuy");
    trader.groupStart("TraderLastBuy");
    eventLogger(scriptName + ".END");
}