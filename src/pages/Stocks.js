import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { CredentialsContext } from '../App';
import StockInput from '../components/StockInput';
import StocksDisplay from '../components/StocksDisplay';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { handleErrors } from './Login';
import { serverRoute } from '../serverRoute';
import { useLogout } from '../hooks/useLogout';

export default function Stocks() {
  const [stocks, setStocks] = useState([])
  const [credentials, ] = useContext(CredentialsContext);
  const [stocksLoaded, setStocksLoaded] = useState(false);
  const [error, setError] = useState()

  useEffect(() => {

    const cookies = new Cookies();
    const token = cookies.get('token');

    // get stocks on load
    fetch(serverRoute + '/stocks', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${token}`,
        },
      })
      .then(handleErrors)
      .then((response ) => response.json())
      .then((stocks) => {
        for (const stock of stocks) {
          let relativeChanges = 0;
          let amounts = 0;
          stock.avgPercentageChange = 0;

          console.log(stock);
      
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
          console.log(relativeChanges, amounts);
        }
        setStocks(stocks);
        setStocksLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setStocksLoaded(true);
      })
      
    }, [credentials]);
    
    useLogout();

  return (
      <div className='bg-white dark:bg-gray-800 pb-8'>
      <Navbar active={"stocks"}/>
      <StockInput setStocks={setStocks} error={error} setError={setError}/>
      {stocksLoaded ? 
        <StocksDisplay stocks={stocks} setStocks={setStocks} setError={setError}/>
        :
        <div className='flex justify-center items-center min-h-[260px] md:min-h-[450px]'>
          <LoadingSpinner size={70} />
        </div>
      }
    </div>
  )
}
