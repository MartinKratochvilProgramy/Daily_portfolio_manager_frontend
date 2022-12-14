import React, { useState, useContext, useEffect } from 'react'
import Stock from './Stock';
import { CredentialsContext } from '../App';
import { serverRoute } from '../serverRoute';
import OrderDropDown from './OrderDropDown';

export default function Stocks({ stocks, setStocks, setError }) {

  const [credentials, ] = useContext(CredentialsContext);
  const [searchKey, setSearchKey] = useState("");

  const sortStocks = (value) => {
    const newStocks = [...stocks];

    if (value === "A-Z") {
      newStocks.sort((a, b) => a.ticker.localeCompare(b.ticker))
      setStocks(newStocks);
    } else if (value === "Z-A") {
      newStocks.sort((a, b) => b.ticker.localeCompare(a.ticker))
      setStocks(newStocks);
    } else if (value === "Newest") {
      newStocks.sort(function(a,b){return new Date(b.lastPurchase) - new Date(a.lastPurchase)});
      setStocks(newStocks);
    } else if (value === "Oldest") {
      newStocks.sort(function(a,b){return new Date(a.firstPurchase) - new Date(b.firstPurchase)});
      setStocks(newStocks);
    }
  }

  useEffect(() => {
    sortStocks("Newest");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  const deleteStock = (ticker, amount) => {
    if (credentials.username === "demouser") {
      setError("Cannot edit in demo mode");
      return;
    }
    // hit the endpoint and write to db
    fetch(serverRoute + '/stock_remove', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify({
        ticker,
        amount 
      })
    })
    .then((response ) => response.json())
    .then((stocks) => setStocks(stocks))
  };

  if (stocks.length === 0) {
    return;
  }

  return (
    <div 
      className="flex flex-col md:px-12 px-2 pt-14 lg:w-6/12 md:w-8/12 w-10/12 m-auto"
      id='stocks-output'
      >
        <div className='flex justify-between mb-2'>
          <OrderDropDown sortStocks={sortStocks} />
          <input 
            onChange={(e) => {setSearchKey(e.target.value)}}
            className='w-4/12 sm:w-3/12 lg:w-2/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            type="text" 
            placeholder='Search...' />
        </div>
        {stocks.map((stock) => {
          if (stock.ticker.includes(searchKey.toUpperCase())) {
            return (
                <Stock 
                  stock={stock} 
                  key={stock.ticker} 
                  deleteStock={deleteStock}
                  />
            )
          } 
          return null;
        })}
  </div>
  )
}
