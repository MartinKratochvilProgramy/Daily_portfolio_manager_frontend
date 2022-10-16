import React, { useContext } from 'react'
import Stock from './Stock';
import { CredentialsContext } from '../App';

export default function Stocks({ stocks, setStocks }) {

  const [credentials, ] = useContext(CredentialsContext);

  const deleteStock = (ticker, amount) => {
    // hit the endpoint and write to db
    fetch(`http://localhost:4000/stock_remove`, {
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

  return (
    <div 
      className="flex flex-col md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto"
      id='stocks-output'
      >
        {stocks.map((stock) => {
          return (
              <Stock 
                stock={stock} 
                key={stock.ticker} 
                deleteStock={deleteStock}
                />
          )
        })}
  </div>
  )
}
