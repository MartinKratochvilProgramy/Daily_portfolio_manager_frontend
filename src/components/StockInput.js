import React, { useState, useContext } from 'react'
import { CredentialsContext } from '../App';
import { handleErrors } from '../pages/Login';

export default function StockInput({ setStocks }) {
  const [stockTicker, setStockTicker] = useState('');
  const [stockAmount, setStockAmount] = useState(0);
  const [error, setError] = useState(false); 
  const [credentials, ] = useContext(CredentialsContext);
  
  const persist = (newStock) => {
    // hit the endpoint and write to db
    // returns the new stocks array
    fetch(`http://localhost:4000/stock_add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify({
        newStock, 
      })
    })
    .then(handleErrors)
    .then((response ) => response.json())
    .then((returnedStocks) => {setStocks(returnedStocks)})
    .catch((error) => {
      setError(error.message)
    })
  };

  const addStock = (e) => {
    // get stock ticker, amount and send to server
    e.preventDefault();
    setError(false);
    
    if (stockTicker === '') {
      const tickerInput = document.getElementById('ticker-input');
      tickerInput.classList.add('border-red-400')
      tickerInput.classList.remove('border-gray-300')
      return;
    }
    if (stockAmount <= 0) {
      const amountInput = document.getElementById('amount-input');
      amountInput.classList.add('border-red-400')
      amountInput.classList.remove('border-gray-300')
      return;
    }
    const newStock = {ticker: stockTicker, amount: stockAmount};
    persist(newStock);

    setStockTicker('');
    setStockAmount(0);
  }

  const onTickerInputChange = (e) => {
    setError(false);
    e.target.classList.remove('border-red-400');
    e.target.classList.add('border-gray-300');
    setStockTicker(e.target.value);
  }
  
  const onAmountInputChange = (e) => {
    setError(false);
    e.target.classList.remove('border-red-400');
    e.target.classList.add('border-gray-300');
    setStockAmount(e.target.value);
  }

  return (
    <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">
      <form 
        onSubmit={addStock} 
        className="flex flex-col space-y-4 items-center">   
          <label htmlFor ="add-stock" className="sr-only">Add stock</label>
          <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0'>
            ADD NEW <span className='text-blue-600'>STOCK</span>
          </h1>
          <div className="relative flex flex-row w-8/12 md:w-8/12 h-full">
            <label htmlFor ="add-stock" className="sr-only">Ticker input</label>
            <input 
              type="text" 
              id="ticker-input" 
              className="bg-gray-100 border w-full border-gray-300 text-gray-900 text-sm focus:outline-none block pl-4 p-2.5" 
              placeholder="Ticker ('AAPL', 'MSFT', ... )" 
              required="" 
              autoFocus
              onChange={onTickerInputChange} 
              value={stockTicker}
              />
            <label htmlFor ="add-stock" className="sr-only">Amount input</label>
            <input 
              type="number" 
              id="amount-input" 
              className="text-center bg-gray-100 border w-5/12 md:w-6/12 lg:w-4/12 border-gray-300 text-gray-900 text-sm focus:outline-none block pl-4 p-2.5" 
              placeholder="Amount..." 
              required="" 
              onChange={onAmountInputChange} 
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
