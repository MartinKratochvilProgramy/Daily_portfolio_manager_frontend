import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { CredentialsContext } from '../App';
import StockInput from '../components/StockInput';
import StocksDisplay from '../components/StocksDisplay';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { handleErrors } from './Login';
import { serverRoute } from '../serverRoute';
import formatStocks from '../utils/formatStocks';

export default function Stocks() {
  const [stocks, setStocks] = useState([])
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [stocksLoaded, setStocksLoaded] = useState(false);
  const [error, setError] = useState()

  const navigate = useNavigate();

  useEffect(() => {

    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!token) {
      setCredentials(null);
      localStorage.setItem('user', null);
      navigate("/");
      return;
    }

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
        formatStocks(stocks);

        setStocks(stocks);
        setStocksLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setStocksLoaded(true);
      })
      
    }, [credentials, setCredentials, navigate]);
    

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
