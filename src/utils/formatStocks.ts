export const formatStocks = (stocks: any) => {
    // adds average percent change to each stock

    for (const stock of stocks) {
        let relativeChanges = 0;
        let amounts = 0;
        stock.avgPercentageChange = 0;

        // calculate weighted average for gain of each purchase
        for (const purchase of stock.purchaseHistory) {
            const relativeChange = (stock.prevClose / purchase.currentPrice - 1) * 100;
            const totalRelativeChange = relativeChange * purchase.amount;
            relativeChanges += totalRelativeChange;
            amounts += purchase.amount;

            // update relative change for each purchase
            purchase.relativeChange = relativeChange;
        }

        stock.avgPercentageChange = (relativeChanges / amounts).toFixed(1);
    }
}
