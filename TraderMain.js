var variablePath = "C:\\Users\\Damjan\\Documents\\GitHub\\qt-bitcoin-trader-scripts\\";

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
var currencyPrimary = "USD";
var currencySecondary = "ETH";

// in%,the first step indentation How price first buy order in the table should be less than the purchase of the current at the time of the calculation table.  All other orders will buy more cheaper //default 0.5
var otstupFile = variablePath + "firstBuyStep.txt";
var otstup = parseFloat(trader.fileReadAll(otstupFile));
var scriptName = "";
eventLogger(scriptName + ".otstup: " + otstup);
///////////////////////////////////////////////////////////////////
//maxNumberOfBids.txt
var ordersFile = variablePath + "maxNumberOfBids.txt";
var orders = parseFloat(trader.fileReadAll(ordersFile)); // 2 to 20,how many buy-to place orders in the amount of overlap. //default 13
eventLogger(scriptName + ".orders: " + orders);
///////////////////////////////////////////////////////////////////
//StepBetweenOrders.txt
var perekrFile = variablePath + "StepBetweenOrders.txt";
var perekr = parseFloat(trader.fileReadAll(perekrFile)); // in% overlap stroke rates,calculating the depth of the table buy orders.  For example,in a first step,the price 10ETH percentage of overlap of 20% means that the table will be set in the range // 8-10ETH.  //default 30
eventLogger(scriptName + ".perekr: " + perekr);
///////////////////////////////////////////////////////////////////
//Profit.txt
var profitFile = variablePath + "Profit.txt";
var profit = parseFloat(trader.fileReadAll(profitFile)); // in%,profit,profit How to lay into each sell order. 
eventLogger(scriptName + ".profit: " + profit);
///////////////////////////////////////////////////////////////////
//Margin.txt
var martinFile = variablePath + "martinStep.txt";
var martin = parseFloat(trader.fileReadAll(martinFile)); // in%,martingale,when calculating each table buy orders following order cheaper by volume greater than the previous to this value.  //default 15
eventLogger(scriptName + ".martin: " + martin);
///////////////////////////////////////////////////////////////////

var lastSaleFile = variablePath + "lastSale.txt";
var lastMySellPriceOld = trader.get("LastMySellPrice");
eventLogger(scriptName + ".lastMySellPrice: " + lastMySellPriceOld);
trader.fileWrite(lastSaleFile, lastMySellPriceOld);

///////////////////////////////////////////////////////////////////
var lastCurrencySecondaryBallanceFile = variablePath + "lastCurrencySecondaryBallance.txt";
var currencySecondaryBalance = trader.get("Balance", currencySecondary);
eventLogger(scriptName + ".currencySecondaryBalance: " + currencySecondaryBalance);
trader.fileWrite(lastCurrencySecondaryBallanceFile, currencySecondaryBalance);

///////////////////////////////////////////////////////////////////
var bidPriceFile = variablePath + "bidPrice.txt";
var bidPrice = trader.get("BidPrice");
eventLogger(scriptName + ".bidPrice: " + bidPrice);
trader.fileWrite(bidPriceFile, bidPrice);


var perekrDif = 0.25;
var martinDif = 0.1;
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
			restartTraderMainRestart();
	}
	
    if (lastMySellPrice != lastMySellPriceOld) {
        eventLogger(scriptName + ".STEP1");        
        restartTraderMainRestart();
											  
											   
    } else {
        eventLogger(scriptName + ".STEP2");
        bidPrice = trader.get("BidPrice");
        eventLogger(scriptName + ".bidPrice: " + bidPrice);
        trader.fileWrite(bidPriceFile, bidPrice);

        currencySecondaryBalance = trader.get("Balance", currencySecondary);
        eventLogger(scriptName + ".currencySecondaryBalance: " + currencySecondaryBalance);
        trader.fileWrite(lastCurrencySecondaryBallanceFile, currencySecondaryBalance);

        openBidsCount = trader.get("OpenBidsCount");
        openAsksCount = trader.get("OpenAsksCount");
        eventLogger(scriptName + ".openBidsCount: " + openBidsCount);
        eventLogger(scriptName + ".openAsksCount: " + openAsksCount);
        eventLogger(scriptName + ".openAsksCountOld: " + openAsksCountOld);

        
        if ((((openAsksCount < openAsksCountOld) || (openAsksCount == openAsksCountOld && lastMySellPriceOld != 0)) && lastMySellPriceOld != lastMySellPrice)) {
        //if (((openAsksCount < openAsksCountOld) || (openAsksCount == openAsksCountOld && lastMySellPriceOld != 0)) && openAsksCount < openAsksCountOld) {
            eventLogger(scriptName + ".STEP3");

            //perekr += perekrDif;
            //trader.fileWrite(perekrFile,perekr);

            //martin += martinDif;
            //trader.fileWrite(martinFile,martin);

            //trader.log("VAL[restartEverything.otstup]: ", otstup);
            //otstup = 0;
            //trader.fileWrite(otstupFile,otstup);
            
														  
            lastMySellPriceOld = lastMySellPrice;
            trader.fileWrite(lastSaleFile, lastMySellPriceOld);            
																   
            trader.cancelBids(currencySecondary + currencyPrimary);
            restartTraderMainRestart();
												   
        }


        /*if(openBidsCount != orders && ((orders - openBidsCount) > 1))
        {
        	eventLogger(scriptName + ".STEP4");
		
        	//trader.log("VAL[restartEverything.perekr]: ", perekr);
        	//perekr -= perekrDif;
        	//trader.fileWrite(perekrFile,perekr);
        	
        	//trader.log("VAL[restartEverything.martin]: ", martin);
        	//martin -= martinDif;
        	//trader.fileWrite(martinFile,martin);
		
        	//trader.groupStop("Trader");
        	//trader.groupStart("Trader");
        	orders = openBidsCount;
        }
        */

        //orders = openBidsCount;        
										 
    }
	openAsksCountOld = openAsksCount;
    eventLogger(scriptName + ".END");
}

function restartTraderMainRestart()
{
	var scriptName = "restartTraderMainRestart()";
    eventLogger(scriptName + ".START");
	
	trader.fileWrite(lastTradeStatusFile, "SELL");
	trader.groupStop("TraderMainRestart");
	trader.groupStop("Trader");	
    trader.groupStart("TraderMainRestart");
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