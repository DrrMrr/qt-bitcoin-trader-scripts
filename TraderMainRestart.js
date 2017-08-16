lastMyBuyPrice();
trader.groupStop("TraderMain");
trader.groupStart("TraderMain");
trader.timer(30, "lastMyBuyPrice()");

function lastMyBuyPrice() {
	trader.groupStop("TraderLastBuy");
	trader.groupStart("TraderLastBuy");
}