export interface PurchaseInterface {
    amount: number;
    currentPrice: number;
    date: string;
    relativeChange: number;
    totalAmount: number;
    _id: string;
}

export interface StockInterface {
    amount: number;
    avgPercentageChange: number;
    firstPurchase: string;
    lastPurchase: string;
    prevClose: number;
    purchaseHistory: PurchaseInterface[];
    ticker: string;
}