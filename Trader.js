	var variablePath = "/home/damien/Desktop/QTBitcoinTrader/Variables/";
	////////// SCRIPT 2 /////////////////////////////////////////////
	var vverh = 0.7; // in%, for example, if there is 2%, and at the time running a script purchase price will be 100 BTC, then the purchase price 102 restarts the entire cycle //default 0.4
	//var orderss = 8; // value in the script 1 
	// Below if you do not Charite do not change anything. 
	var rest = 100000000000;
	var filePath = variablePath + "_logLastBTCbalance.txt";

	/////////////////////////////////////////////////////////////////
	////////// SCRIPT 1 /////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////
	// in%,the first step indentation How price first buy order in the table should be less than the purchase of the current at the time of the calculation table.  All other orders will buy more cheaper //default 0.5
	var otstupFile = variablePath + "firstBuy.txt";
	var otstup = parseFloat(trader.fileReadAll(otstupFile));
	var otstupOriginal = otstup;
	///////////////////////////////////////////////////////////////////
	//NumberOfOrders.txt
	var ordersFile = variablePath + "numberOfOrders.txt";
	var orders = parseFloat(trader.fileReadAll(ordersFile)); // 2 to 20,how many buy-to place orders in the amount of overlap. //default 13
	var ordersOriginalValue = orders;
	///////////////////////////////////////////////////////////////////
	//StepBetweenOrders.txt
	var perekrFile = variablePath + "stepBetweenOrders.txt";
	var perekr = parseFloat(trader.fileReadAll(perekrFile)); // in% overlap stroke rates,calculating the depth of the table buy orders.  For example,in a first step,the price 10BTC percentage of overlap of 20% means that the table will be set in the range // 8-10BTC.  //default 30
	///////////////////////////////////////////////////////////////////
	//Profit.txt
	var profitFile = variablePath + "profit.txt";
	var profit = parseFloat(trader.fileReadAll(profitFile)); // in%,profit,profit How to lay into each sell order. 
	///////////////////////////////////////////////////////////////////
	//Margin.txt
	var martinFile = variablePath + "martin.txt";
	var martin = parseFloat(trader.fileReadAll(martinFile)); // in%,martingale,when calculating each table buy orders following order cheaper by volume greater than the previous to this value.  //default 15
	///////////////////////////////////////////////////////////////////
	var lastETHbalanceFile = variablePath + "_logLastETHbalance.txt";
	var lastETHbalance = 0;
	///////////////////////////////////////////////////////////////////
	var profitInDollarsFile = variablePath + "profitInDollars.txt";
	var profitInDollars = parseFloat(trader.fileReadAll(profitInDollarsFile));
	///////////////////////////////////////////////////////////////////
	var profitInPercentageFile = variablePath + "profitInPercentage.txt";
	var profitInPercentage = parseFloat(trader.fileReadAll(profitInPercentageFile));
	///////////////////////////////////////////////////////////////////
	var profitInDollarsFileConditioan = variablePath + "profitInDollarsConditioan.txt";
	var profitInDollarsConditioan = parseFloat(trader.fileReadAll(profitInDollarsFileConditioan));
	///////////////////////////////////////////////////////////////////

	var bidPriceFile = variablePath + "_logBidPrice.txt";
	var bidPrice = trader.get("BidPrice");
	trader.fileWrite(bidPriceFile,bidPrice);
	///////////////////////////////////////////////////////////////////
	var resetPriceFile = variablePath + "resetPrice.txt";
	var resetPrice = parseFloat(trader.fileReadAll(resetPriceFile));
	///////////////////////////////////////////////////////////////////
	var fileLoggerFile = variablePath + "_logfileLoggerTrader.txt";
	///////////////////////////////////////////////////////////////////




	function logger() {
		trader.fileAppend(fileLoggerFile,fileLogger + " - " +trader.dateTimeString());
	}

	fileLogger = "Start - Trader";
	logger();

	var depo = 98; // in%,from 1 to 98,use of the depot,which part of the BTC(or the second currency in the pair) put into circulation 
	var komissiya = 0;
	var prceni = 0;
	var pric = 0;
	var price = 0;
	var cena = 0;
	var pricet = 0;
	var raznost = 0;
	var amstart = 0;
	var pperv = 0;
	var ppervraz = 0;
	var pvtorvraz = 0;

	/////////////////////////////////
	var myVolumes = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	var myPrices = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	var openBids = 0;
	var openAsks = 0
	var valueBTCold = 0;
	var justStarted = true;
	var OpenAsksCountAtStart = 3; //how many OpenAsks when starting the program
	var minValueAfterLastRestart = 100000000000;

	setNewRestartValue();
	
	/////////////////////////////////////////////////////////////////
	////////// SCRIPT 2 /////////////////////////////////////////////
	script2();

	function script2() {
		//////////////////////////////
		fileLogger = "script2().start";
		logger();
		//////////////////////////////
		trader.log("VAL[////////////////////////////////////////////////////////////]: ");
		trader.log("VAL[//////////////////////  START  /////////////////////////////]: ");
		trader.log("VAL[////////////////////////////////////////////////////////////]: ");
		justStarted = true;
		valueBTCold = 0;
		trader.log("VAL[START: script2()]: ");
		script1();
		sledcikl();
		trader.timer(23, "rrr()");
		//trader.timer(90, "checkIfFirstBuyWasExecuted()");		
		trader.log("VAL[END: script2()]: ");
		//////////////////////////////
		fileLogger = "script2().stop";
		logger();
		//////////////////////////////
		
	}

	


	function changeNrOfOrders()
	{
		//////////////////////////////
		fileLogger = "changeNrOfOrders().start";
		logger();
		//////////////////////////////
		trader.log("VAL[START: changeNrOfOrders()]: ");
		trader.log("VAL[changeNrOfOrders().orders]: ", orders);
		var valueBTC = 0;
		var valueETH = 0;
		//////////////////////////////
		fileLogger = "1";
		logger();
		//////////////////////////////
		//trader.log("VAL[changeNrOfOrders.trader.fileReadAll(filePath)]: ", trader.fileReadAll(filePath));
		valueBTCold = trader.fileReadAll(filePath);
		valueBTC = trader.get("Balance","BTC");
		trader.log("VAL[changeNrOfOrders.valueBTC]: ", valueBTC);
		trader.log("VAL[changeNrOfOrders.valueBTCold]: ", valueBTCold);
		//////////////////////////////
		fileLogger = "2";
		logger();
		//////////////////////////////
		
		if(valueBTCold != valueBTC && justStarted == false)
		{	 
		//////////////////////////////
		fileLogger = "3";
		logger();
		//////////////////////////////
			trader.log("VAL[changeNrOfOrders.valueBTCold != valueBTC]: ", "valueBTCold != valueBTC");
			valueBTC = trader.get("Balance","BTC");
			trader.log("VAL[changeNrOfOrders().valueBTC]: ", valueBTC);
				 
			if(valueBTCold < valueBTC)
			{
				orders++;
				trader.log("VAL[changeNrOfOrders.valueBTCold < valueBTC]: ", "orders++");
			}
			else
			{
				orders--;
				trader.log("VAL[changeNrOfOrders.valueBTCold < valueBTC]: ", "orders--");
			}
		 }		
		 else
			 trader.log("VAL[changeNrOfOrders.valueBTCold == valueBTC]: ", "valueBTCold == valueBTC");
			
		//////////////////////////////
		fileLogger = "4";
		logger();
		//////////////////////////////
		 valueBTCold = valueBTC;
		 trader.fileWrite(filePath,trader.get("Balance","BTC"));
		 trader.log("VAL[changeNrOfOrders.changeNrOfOrders().orders]: ", orders);
		 trader.log("VAL[END: changeNrOfOrders.changeNrOfOrders()]: ");
		 
		 //////////////////////////////
		fileLogger = "changeNrOfOrders().stop";
		logger();
		//////////////////////////////
	}

	function sledcikl() {
		//////////////////////////////
		fileLogger = "sledcikl().start";
		logger();
		//////////////////////////////
		//bidPrice = parseFloat(trader.fileReadAll(bidPriceFile));
		trader.log("VAL[START: sledcikl()]: ");
		//rest = vverh / 100 + 1;
		//rest = bidPrice * (1+(profit/100));
		trader.log("restatr pri", rest);
		trader.log("VAL[END: sledcikl()]: ");
		//////////////////////////////
		fileLogger = "sledcikl().stop";
		logger();
		//////////////////////////////
	}

	function checkIfFirstBuyWasExecuted() {
		trader.log("VAL[checkIfFirstBuyWasExecuted()]: ");
		var openBids = trader.get("OpenBidsCount");
		trader.log("VAL[checkIfFirstBuyWasExecuted().ordersOriginalValue]: ",ordersOriginalValue);
		trader.log("VAL[checkIfFirstBuyWasExecuted().openBids]: ",openBids);
		trader.log("VAL[checkIfFirstBuyWasExecuted().otstupOriginal]: ",otstupOriginal);
		if(ordersOriginalValue == openBids && otstupOriginal == 0)
		{
			trader.groupStop("TraderMainRestart");
			trader.groupStart("TraderMainRestart");
		}
		
		
	}

	function setNewRestartValue() {
		//////////////////////////////
		fileLogger = "setNewRestartValue().start";
		logger();
		//////////////////////////////
		var temp = trader.get("BidPrice");
		trader.log("VAL[setNewRestartValue().temp]: ", temp);
		trader.log("VAL[setNewRestartValue().temp]: ", minValueAfterLastRestart);

		//set new minValueAfterLastRestart
		if(temp < minValueAfterLastRestart)
		{
			minValueAfterLastRestart = temp;

			if(profitInDollarsConditioan == "true")
			{
				rest = temp + (profitInDollars * resetPrice);
			}
			else
			{
				rest = temp + ((temp / 100 * profitInPercentage) * resetPrice);
			}
		}
		trader.log("VAL[setNewRestartValue().rest]: ", rest);
		//////////////////////////////
		fileLogger = "setNewRestartValue().stop";
		logger();
		//////////////////////////////
	}

	function rrr() {        
		//////////////////////////////
		fileLogger = "rrr().start";
		logger();
		//////////////////////////////

		setNewRestartValue();
		
		
		bidPrice = parseFloat(trader.fileReadAll(bidPriceFile));
		trader.log("VAL[START: rrr()]: ");
		trader.log("VAL[rrr().bidPrice]: ", bidPrice);
		trader.log("VAL[rrr().rest]: ", rest);


		//MILJENO JE, DA SE SICER RESETIRAJO PONUDBE, KO CENA PORASTE
		if (bidPrice >= rest) {

			trader.log("VAL[rrr().get(OpenAsksCount)]: ", trader.get("OpenAsksCount"));

			//if (trader.get("OpenAsksCount") < 1) {
				trader.log("VAL[END: rrr().restart]: ");
				trader.log("VAL[rrr().trader.get(OpenBidsCount)]: ", trader.get("OpenBidsCount"));
				trader.log("VAL[rrr().orders]: ", orders);

				//   if(trader.get("OpenBidsCount") == orders) {
				//       trader.log("VAL[rrr().trader.get(OpenBidsCount) == orders");
				trader.groupStop("Trader");
				trader.groupStart("Trader");

				script1();
				sledcikl();
				//    }
			//}
		}
		trader.log("VAL[END: rrr()]: ");
		//////////////////////////////
		fileLogger = "rrr().stop";
		logger();
		//////////////////////////////
	}

	/////////////////////////////////////////////////////////////////
	////////// SCRIPT 1 /////////////////////////////////////////////

	function script1() {
		//////////////////////////////
		fileLogger = "script1().start";
		logger();
		//////////////////////////////
		// VERZIJA 2
		bidPrice = parseFloat(trader.fileReadAll(bidPriceFile));
		trader.log("VAL[START: script1()]: ");
		bal = trader.get("Balance", "BTC");
		trader.log("VAL[bal]: ", bal);
		komissiya = trader.get("Fee");
		trader.log("VAL[komissiya]: ", komissiya);
		otstup = otstup / 100;
		otstup = 1 - otstup;
		trader.log("VAL[otstup]: ", otstup);
		depo = depo / 100;
		trader.log("VAL[depo]: ", depo);
		martin = martin / 100 + 1;
		trader.log("VAL[martin]: ", martin);
		komissiya = komissiya * 2;
		komissiya = komissiya / 100 + 1;
		trader.log("VAL[komissiya]: ", komissiya);
		perekr = perekr + otstup;
		trader.log("VAL[perekr]: ", perekr);
		profit = profit / 100 + 1;
		trader.log("VAL[profit]: ", profit);
		prceni = perekr / orders;
		trader.log("VAL[prceni]: ", prceni);
		prceni = 1 - (prceni / 100);
		trader.log("VAL[prceni]: ", prceni);
		// Pervaluteif = 100000 
		//trader.cancelOrders("ETHBTC");
		trader.cancelBids("ETHBTC");
		pric = bidPrice * otstup;
		trader.log("VAL[ bidPrice]: ", bidPrice);
		trader.log("VAL[otstup]: ", otstup);
		trader.log("VAL[pric]: ", pric);
		price = pric;
		cena = pric;
		pricet = pric * prceni;
		trader.log("VAL[pricet]: ", pricet);
		raznost = pric - pricet;
		trader.log("VAL[raznost]: ", raznost);
		amstart = 0;
		trader.delay(13, "koa()");
		trader.timer(8, "hbvr()");
		pperv = 0;
		ppervraz = 0;
		pvtorvraz = 0;
		trader.delay(20, "aaa()");
		trader.timer(23, "hjk()");
		trader.log("VAL[END: script1()]: ");
		//////////////////////////////////
		trader.fileWrite(filePath,trader.get("Balance","BTC"));
		justStarted = false;
		trader.timer(23, "changeNrOfOrders()");
		//////////////////////////////
		fileLogger = "script1().stop";
		logger();
		//////////////////////////////
	}

	function koa() {
		//////////////////////////////
		fileLogger = "koa().start";
		logger();
		//////////////////////////////
		trader.log("VAL[START: koa()]: ");
		var all = trader.get("Balance", "BTC") * depo;
		trader.log("VAL[koa().trader.get(Balance,BTC)]: ", trader.get("Balance", "BTC"));
		trader.log("VAL[koa().depo]: ", depo);
		trader.log("VAL[koa().all]: ", all);

		var yyy = 0;

		for (var i = 0; i < orders - openAsks;) {
			yyy = yyy + Math.pow(martin, i);
			trader.log("VAL[koa().i]: ", i);
			trader.log("VAL[koa().martin]: ", martin);
			trader.log("VAL[koa().Math.pow(martin,i) ]: ", Math.pow(martin, i));
			trader.log("VAL[koa().yyy]: ", yyy);
			i = i + 1;
		}
		trader.log("2");
		var amount = all / yyy;
		amstart = amount;
		trader.log("3");
		for (var i = 0; i < orders - openAsks;) {
			trader.buy("ETHBTC", amount / price, price);
			myVolumes[i] = amount;
			myPrices[i] = price;
			price = price - raznost;
			amount = amount * martin;
			i = i + 1;
		}
		
		orders = orders - openAsks;	
		trader.fileWrite(filePath,trader.get("Balance","BTC"));
		trader.log("VAL[END: koa()]: ");
		//////////////////////////////
		fileLogger = "koa().stop";
		logger();
		//////////////////////////////
	}

	function hbvr() {
		//////////////////////////////
		fileLogger = "hbvr().start";
		logger();
		//////////////////////////////
		trader.log("VAL[START: hbvr()]: ");
		trader.log("VAL[hbvr().trader.get(Balance, ETH)]: ", trader.get("Balance", "ETH"));
		lastETHbalance = parseFloat(trader.fileReadAll(lastETHbalanceFile));
		if (lastETHbalance > 0.000001) {
			trader.log("VAL[hbvr().trader.get(OpenAsksCount)]: ", trader.get("OpenAsksCount"));
			//if (trader.get("OpenAsksCount") < 1) {
				trader.delay(5, "venakid()");
			//}		
			
			trader.on("OpenBidsCount").changed() {
				//sellAfterBuy();
			}		
		}
		trader.log("VAL[hbvr().get(OpenAsksCount)]: ", trader.get("OpenAsksCount"));
		trader.log("VAL[END: hbvr()]: ");
		//////////////////////////////
		fileLogger = "hbvr().stop";
		logger();
		//////////////////////////////
		
	}

	function aac() {
		//////////////////////////////
		fileLogger = "aac().start";
		logger();
		//////////////////////////////
		trader.cancelAsks();
		//////////////////////////////
		fileLogger = "aac().stop";
		logger();
		//////////////////////////////
	}

	function sellAfterBuy() {
		//////////////////////////////
		fileLogger = "sellAfterBuy().start";
		logger();
		//////////////////////////////
		var lastSell = trader.get("LastMySellPrice");
		for (var count = 0; count < myPrices.length; count++) {
			if (lastSell == myPrices[count]) {
				trader.sell("ETHBTC", myVolumes[count], myPrices[count] * (1 + (profit / 100) + trader.get("Fee")));
				trader.on("LastMySellPrice").changed()
				{
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
	}

	function resetArrays()
	{
		//////////////////////////////
		fileLogger = "resetArrays().start";
		logger();
		//////////////////////////////
		for(var i = 0; i<20; i++)
		{
			myPrices[i] = "";
			myVolumes[i] = "";
		}
		//////////////////////////////
		fileLogger = "resetArrays().stop";
		logger();
		//////////////////////////////
			
	}


	function venakid() {
		//////////////////////////////
		fileLogger = "venakid().start";
		logger();
		//////////////////////////////
		trader.log("VAL[START: venakid()]: ");
		lastETHbalance = parseFloat(trader.fileReadAll(lastETHbalanceFile));
		trader.log("VAL[END: venakid().(trader.get(LastPrice)/100)]: ",(trader.get("LastPrice")/100));
		trader.log("VAL[END: venakid().profit()]: ", profit);
		trader.log("VAL[END: venakid().(trader.get(LastPrice)/100)]: ",(trader.get("LastPrice")/100));
		trader.log("VAL[END: venakid().(100+profit-1)]: ",(100+profit-1));
		if(profitInDollarsConditioan == "true")
		{
			trader.log("VAL[END: venakid().profitInDollars]: ",profitInDollars);
			trader.log("VAL[END: venakid().((trader.get(LastPrice)/100)*profit)+ profitInDollars]: ",((trader.get("LastPrice")*profit)+ profitInDollars));
		}
		else
		{
			trader.log("VAL[END: venakid().profitInPercentage]: ",profitInPercentage);
			trader.log("VAL[END: venakid().((trader.get(LastPrice)/100)*profit)+ profitInDollars]: ",((trader.get("LastPrice")*profit)+ profitInDollars));
		}
		var feeMaker = 0.1;
		var feeTaker = 0.1;
		
		var lastBuyPrice = trader.get("LastMyBuyPrice");
		var buyFee = lastBuyPrice / 1000 * (feeTaker * 10);
		var absValue = Math.abs(lastBuyPrice - trader.get("LastPrice"));

		if(profitInDollarsConditioan == "true")	
		{
			if(absValue < 2)
			{		
				trader.sell("ETHBTC", lastETHbalance, (lastBuyPrice + buyFee + profitInDollars) / ((1000-10*feeTaker)) * 1000);
				trader.log("VAL[END: venakid().SELL1]: ", (lastBuyPrice + buyFee + profitInDollars) / ((1000-10*feeTaker)) * 1000);
			}
			else
			{
				trader.sell("ETHBTC", lastETHbalance, (trader.get("LastPrice") + buyFee + profitInDollars) / ((1000-10*feeTaker)) * 1000);
				trader.log("VAL[END: venakid().SELL2]: ", (trader.get("LastPrice") + buyFee + profitInDollars) / ((1000-10*feeTaker)) * 1000);
			}
		}
		else
		{
			if(absValue < 2)
			{		
				trader.sell("ETHBTC", lastETHbalance, (lastBuyPrice + buyFee + lastBuyPrice / 100 * profitInPercentage) / ((1000-10*feeTaker)) * 1000);
				trader.log("VAL[END: venakid().SELL1]: ", (lastBuyPrice + buyFee + lastBuyPrice / 100 * profitInPercentage) / ((1000-10*feeTaker)) * 1000);
			}
			else
			{
				trader.sell("ETHBTC", lastETHbalance, (trader.get("LastPrice") + buyFee + lastBuyPrice / 100 * profitInPercentage) / ((1000-10*feeTaker)) * 1000);
				trader.log("VAL[END: venakid().SELL2]: ", (trader.get("LastPrice") + buyFee + lastBuyPrice / 100 * profitInPercentage) / ((1000-10*feeTaker)) * 1000);
			}
		}
		trader.fileWrite(lastETHbalanceFile,0);
		trader.log("VAL[END: venakid()]: ");
		//////////////////////////////
		fileLogger = "venakid().stop";
		logger();
		//////////////////////////////
	}

	function aaa() {
		//////////////////////////////
		fileLogger = "aaa().start";
		logger();
		//////////////////////////////
		trader.log("VAL[END: aaa()]: ");
		lastETHbalance = parseFloat(trader.fileReadAll(lastETHbalanceFile));
		trader.on("OpenBidsCount").changed() {
			trader.log("VAL[aaa().trader.get(Balance, ETH)]: ", trader.get("Balance", "ETH"));
			if (lastETHbalance > 0.000001) {
				trader.log("VAL[aaa().trader.get(Balance, ETH)]: ", trader.get("Balance", "ETH"));
				trader.log("VAL[aaa().pperv]: ", pperv);
				trader.log("VAL[aaa().pperv * 0.9999]: ", pperv * 0.9999);
				if (trader.get("Balance", "ETH") < pperv * 0.9999) {
					trader.log("VAL[aaa().trader.get(OpenAsksCount)]: ", trader.get("OpenAsksCount"));
					if (trader.get("OpenAsksCount") == 1) {
						trader.log("VAL[aaa()]: ");
						if (pperv != 0) {
							ppervraz = pperv - trader.get("Balance", "ETH");
							trader.log("VAL[aaa().ppervraz]: ", ppervraz);
							// Pvtorvraz = ppervraz * trader.get("LastMySellPrice") 
						}
					}
				}
			}
			//trader.delay(3, "aac()");
		}
		trader.log("VAL[END: aaa()]: ");
		//////////////////////////////
		fileLogger = "aaa().stop";
		logger();
		//////////////////////////////
	}

	function hjk() {
		//////////////////////////////
		fileLogger = "hjk().start";
		logger();
		//////////////////////////////
		trader.log("VAL[START: hjk()]: ");
		trader.log("VAL[hjk().orders]: ", orders);
		trader.log("VAL[hjk().trader.get(OpenBidsCount)]: ", trader.get("OpenBidsCount"));
		lastETHbalance = parseFloat(trader.fileReadAll(lastETHbalanceFile));
		if (trader.get("OpenBidsCount") != orders) {
			trader.log("VAL[hjk().trader.get(OpenAsksCount)]: ", trader.get("OpenAsksCount"));
			if (trader.get("OpenAsksCount") < 1) {
				trader.log("VAL[hjk().trader.get(Balance, ETH)]: ", trader.get("Balance", "ETH"));
				if (lastETHbalance < 0.000001) {
					trader.log("trader.get(OpenBidsCount)", trader.get("OpenBidsCount"));
					trader.log("orders", orders);
					trader.log("trader.get(OpenAsksCount)", trader.get("OpenAsksCount"));
					trader.log("trader.get(Balance,ETH)", trader.get("Balance", "ETH"));
					//script2();
					trader.groupStop("TraderMainRestart");
					trader.groupStart("TraderMainRestart");
				}
			}
		}
		trader.log("VAL[END: hjk()]: ");
		//////////////////////////////
		fileLogger = "hjk().stop";
		logger();
		//////////////////////////////
	}
