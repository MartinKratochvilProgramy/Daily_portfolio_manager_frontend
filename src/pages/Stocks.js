import React, { useState, useContext, useEffect } from 'react';
import { CredentialsContext } from '../App';
import StockInput from '../components/StockInput';
import StocksDisplay from '../components/StocksDisplay';
import Navbar from '../components/Navbar';
import { handleErrors } from './Login';

export default function Stocks() {
  const [stocks, setStocks] = useState([])
  const [credentials, ] = useContext(CredentialsContext);

  useEffect(() => {
      // get stocks on load
      fetch(`https://dailyportfoliomanager.herokuapp.com/stocks`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
        })
        .then(handleErrors)
        .then((response ) => response.json())
        .then((stocks) => setStocks(stocks))
        .catch((error) => {
          console.log(error);
        })
  
    }, [credentials]);

  return (
    <div className='bg-white dark:bg-gray-800 pb-8'>
      <Navbar active={"stocks"}/>
      <StockInput setStocks={setStocks}/>
      <StocksDisplay stocks={stocks} setStocks={setStocks}/>
    </div>
  )
}
