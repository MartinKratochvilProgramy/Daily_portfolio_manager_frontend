import React, { useState, useContext, useEffect } from 'react';
import { CredentialsContext } from '../App';
import StockInput from '../components/StockInput';
import StocksDisplay from '../components/StocksDisplay';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { handleErrors } from './Login';
import { serverRoute } from '../serverRoute';

export default function Stocks() {
  const [stocks, setStocks] = useState([])
  const [credentials, ] = useContext(CredentialsContext);
  const [stocksLoaded, setStocksLoaded] = useState(false);
  const [error, setError] = useState()

  useEffect(() => {
      // get stocks on load
      fetch(serverRoute + '/stocks', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
        })
        .then(handleErrors)
        .then((response ) => response.json())
        .then((stocks) => {
          setStocks(stocks);
          setStocksLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        })
  
    }, [credentials]);

  return (
    <div className='bg-white dark:bg-gray-800 pb-8'>
      <Navbar active={"stocks"}/>
      <StockInput setStocks={setStocks} error={error} setError={setError}/>
      {stocksLoaded ? 
        <StocksDisplay stocks={stocks} setStocks={setStocks} setError={setError}/>
        :
        <div className='flex justify-center items-center min-h-[260px] md:min-h-[450px]'>
            <LoadingSpinner size={16} />
        </div>
      }
    </div>
  )
}
