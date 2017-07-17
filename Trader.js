var variablePath = "/home/damien/Desktop/QTBitcointTrader/Variables/";
///////////////////////////////////////////////////////////////////
// in%,the first step indentation How price first buy order in the table should be less than the purchase of the current at the time of the calculation table.  All other orders will buy more cheaper //default 0.5
var otstupFile = variablePath + "FirstBuy.txt";
var otstup = parseFloat(trader.fileReadAll(otstupFile));
///////////////////////////////////////////////////////////////////
//NumberOfOrders.txt
var ordersFile = variablePath + "NumberOfOrders.txt";
var orders = parseFloat(trader.fileReadAll(ordersFile)); // 2 to 20,how many buy-to place orders in the amount of overlap. //default 13
///////////////////////////////////////////////////////////////////
//StepBetweenOrders.txt
var perekrFile = variablePath + "StepBetweenOrders.txt";
var perekr = parseFloat(trader.fileReadAll(perekrFile)); // in% overlap stroke rates,calculating the depth of the table buy orders.  For example,in a first step,the price 10ETH percentage of overlap of 20% means that the table will be set in the range // 8-10ETH.  //default 30
///////////////////////////////////////////////////////////////////
//Profit.txt
var profitFile = variablePath + "Profit.txt";
var profit = parseFloat(trader.fileReadAll(profitFile)); // in%,profit,profit How to lay into each sell order. 
///////////////////////////////////////////////////////////////////
//Margin.txt
var martinFile = variablePath + "Martin.txt";
var martin = parseFloat(trader.fileReadAll(martinFile)); // in%,martingale,when calculating each table buy orders following order cheaper by volume greater than the previous to this value.  //default 15
///////////////////////////////////////////////////////////////////
//lastSale.txt
var lastSaleFile = variablePath + "_logLastSale.txt";
trader.fileWrite(lastSaleFile,0);
var lastSale = parseFloat(trader.fileReadAll(lastSaleFile)); // in%,martingale,when calculating each table buy orders following order cheaper by volume greater than the previous to this value.  //default 15
///////////////////////////////////////////////////////////////////
//lastETHbalance.txt
var lastETHbalanceFile = variablePath + "_logLastETHbalance.txt";
trader.fileWrite(lastETHbalanceFile,0);
var lastETHbalance = parseFloat(trader.fileReadAll(lastETHbalanceFile));
///////////////////////////////////////////////////////////////////
//logBidPrice.txt
var bidPriceFile = variablePath + "_logBidPrice.txt";
var bidPrice = trader.get("BidPrice");
trader.fileWrite(bidPriceFile,bidPrice);
///////////////////////////////////////////////////////////////////

//var perekrDif = 0.25;
//var martinDif = 0.1;

var numberOfBids = 0;
var numberOfAsks = trader.get("OpenAsksCount");
var numberOfAsksOld = numberOfAsks;

lastSale = trader.get("LastMySellPrice");
trader.fileWrite(lastSaleFile,lastSale);

trader.groupStop("TraderValues");
trader.groupStart("TraderValues");
trader.groupStop("Trader");
trader.groupStart("Trader");


trader.timer(23, "restartEverything()");

function restartEverything() {
	
	trader.log("VAL[START: restartEverything()]: ");

	bidPrice = trader.get("BidPrice");
	trader.fileWrite(bidPriceFile,bidPrice);

	trader.fileWrite(lastETHbalanceFile,trader.get("Balance","ETH"));
	numberOfBids = trader.get("OpenBidsCount");
	trader.log("VAL[restartEverything().numberOfBids]: ", numberOfBids);
	trader.log("VAL[restartEverything().orders]: ", orders);
	//check, if new bids have been offered
	//if(numberOfAsks != numberOfAsksOld)
	//{
		trader.log("VAL[restartEverything.KORAK 0");
		//sale has been made
		//prodaja se je zgodila nekje vmes
		if((((numberOfAsks < numberOfAsksOld) || (numberOfAsks == numberOfAsksOld  && lastSale != 0)) &&lastSale != trader.get("LastMySellPrice")) || trader.get("OpenBidsCount") == 0)
		{
			trader.log("VAL[restartEverything.KORAK 1");
			trader.log("VAL[restartEverything.numberOfBids]: ", numberOfBids);
			//numberOfBids++;
			trader.log("VAL[restartEverything.IncreaseNumberOfBids()]: ");
			trader.log("VAL[restartEverything.IncreaseNumberOfBids()]: ", numberOfBids);
			//trader.fileWrite(ordersFile,numberOfBids);
			
			trader.log("VAL[restartEverything.perekr]: ", perekr);
			//perekr += perekrDif;
			trader.fileWrite(perekrFile,perekr);
			
			trader.log("VAL[restartEverything.martin]: ", martin);
			//martin += martinDif;
			trader.fileWrite(martinFile,martin);
			
			trader.log("VAL[restartEverything.otstup]: ", otstup);
			otstup = 0;
			trader.fileWrite(otstupFile,otstup);
			
			lastSale = trader.get("LastMySellPrice");
			trader.fileWrite(lastSaleFile,lastSale);
			
			trader.groupStop("TraderMainRestart");
			trader.groupStart("TraderMainRestart");
		}
	//}	
	
	
	if(numberOfBids != orders && ((orders - numberOfBids) > 1))
	{
		trader.log("VAL[restartEverything.KORAK 2");
		trader.log("VAL[restartEverything.changeNumberOfBids()]: ");
		//trader.fileWrite(ordersFile,numberOfBids);
		
		trader.log("VAL[restartEverything.perekr]: ", perekr);
		//perekr -= perekrDif;
		trader.fileWrite(perekrFile,perekr);
			
		trader.log("VAL[restartEverything.martin]: ", martin);
		//martin -= martinDif;
		trader.fileWrite(martinFile,martin);
		
		//trader.groupStop("Trader");
		//trader.groupStart("Trader");
		orders = numberOfBids;
	}
	
	orders = numberOfBids;
	numberOfAsksOld = numberOfAsks;
	trader.log("VAL[END: restartEverything()]: ");
}
