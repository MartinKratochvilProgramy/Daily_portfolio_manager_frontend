import React, { useState, useContext } from 'react'
import { CredentialsContext } from '../App';
import { handleErrors } from '../pages/Login';
import Cookies from 'universal-cookie';
import { formatStocks } from '../utils/formatStocks';
import { serverRoute } from '../serverRoute';
import { StockInterface } from '../types/stock';
import { sortStocks } from '../pages/Stocks';

interface Props {
  setStocks: (stocks: StockInterface[]) => void;
  error: string | boolean;
  setError: (error: string | boolean) => void;
  setOrderDropdownValue: (orderDropdownValue: string) => void;
  setStocksLoaded: (stocksLoaded: boolean) => void;
}

interface Stock {
  ticker: string;
  amount: number;
}

export const StockInput: React.FC<Props> = ({
  setStocks,
  error,
  setError,
  setOrderDropdownValue,
  setStocksLoaded
}) => {
  const [stockTicker, setStockTicker] = useState('');
  const [stockAmount, setStockAmount] = useState(0);
  const { credentials, } = useContext(CredentialsContext);

  const persist = (newStock: Stock) => {

    const cookies = new Cookies();
    const token = cookies.get('token');

    if (credentials === "demouser") {
      setError("Cannot edit in demo mode")
      return;
    }

    setStocksLoaded(false);

    // hit the endpoint and write to db
    // returns the new stocks array
    fetch(serverRoute + '/stock_add', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}:${token}`
      },
      body: JSON.stringify({
        newStock,
      })
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((returnedStocks) => {
        formatStocks(returnedStocks);

        setOrderDropdownValue("NEWEST");
        sortStocks("NEWEST", returnedStocks);

        setStocks(returnedStocks)
        setStocksLoaded(true);
      })
      .catch((error) => {
        setError(error.message)
      })
  };

  const addStock = (e: React.FormEvent<HTMLFormElement>) => {
    // get stock ticker, amount and send to server
    e.preventDefault();
    setError(false);

    if (stockTicker === '') {
      const tickerInput = document.getElementById('ticker-input');
      if (tickerInput === null) return;
      tickerInput.classList.add('border-red-400')
      tickerInput.classList.remove('border-gray-300')
      return;
    }
    if (stockAmount <= 0) {
      const amountInput = document.getElementById('amount-input');
      if (amountInput === null) return;
      amountInput.classList.add('border-red-400')
      amountInput.classList.remove('border-gray-300')
      return;
    }
    const newStock = { ticker: stockTicker, amount: stockAmount };
    persist(newStock);

    setStockTicker('');
    setStockAmount(0);
  }

  const onTickerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    e.target.classList.remove('border-red-400');
    e.target.classList.add('border-gray-300');
    setStockTicker(e.target.value);
  }

  const onAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    e.target.classList.remove('border-red-400');
    e.target.classList.add('border-gray-300');
    setStockAmount(parseInt(e.target.value));
  }

  return (
    <div className="md:px-12 px-2 pt-14 md:pt-1 w-10/12 md:w-6/12 m-auto">
      <form
        onSubmit={(e) => addStock(e)}
        className="flex flex-col space-y-4 items-center">
        <label htmlFor="add-stock" className="sr-only">Add stock</label>
        <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
          ADD NEW <span className='text-blue-600'>STOCK</span>
        </h1>
        <div className="relative flex flex-row w-8/12 md:w-8/12 h-full">
          <label htmlFor="ticker" className="sr-only">Ticker input</label>
          <input
            type="text"
            id="ticker-input"
            className="bg-gray-100 border w-full border-gray-300 text-gray-900 text-sm focus:outline-none block pl-4 p-2.5"
            placeholder="Ticker ('AAPL', 'MSFT', ... )"
            onChange={onTickerInputChange}
            value={stockTicker}
          />
          <label htmlFor="amount" className="sr-only">Amount input</label>
          <input
            type="number"
            id="amount-input"
            className="text-center bg-gray-100 border w-5/12 md:w-3/12 border-gray-300 text-gray-900 text-sm focus:outline-none block pl-4 p-2.5"
            placeholder="Amount..."
            onChange={(e) => onAmountInputChange(e)}
            value={stockAmount}
          />
        </div>
        <button
          type="submit"
          className="flex flex-row px-7 py-3 text-white bg-blue-600 font-medium text-sm leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Add stock
        </button>
      </form>
      {error && (<span className='font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>{error}<br /></span>)}
    </div>
  )
}
