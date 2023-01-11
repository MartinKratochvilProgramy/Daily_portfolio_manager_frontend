export default function getPricesInCurrency(dates: string[], prices: number[], purchaseDates: string[]): number[] {
    
    // add 0 to one-letter numbers
    // TODO: this could be separated into a function?
    const purchaseDatesList = [];
    for (const date of purchaseDates) {
        let [year, month, day] = date.split("-");
        if (month.length === 1) month = "0" + month;
        if (day.length === 1) day = "0" + day;
        
        purchaseDatesList.push(year + "-" + month + "-" + day);
    }
    
    const res = [];

    for (let i = 0; i < dates.length; i++) {
        
        if (dates[i] === purchaseDatesList[0]) {
            purchaseDatesList.shift();
            res.push(prices[i]);
        }

        if (purchaseDatesList.length === 0) return res;
    }

    return res;
}