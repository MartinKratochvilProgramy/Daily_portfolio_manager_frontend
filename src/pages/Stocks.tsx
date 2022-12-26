import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { CredentialsContext } from '../App';
import { Navbar } from '../components/Navbar';
import { StockInput } from '../components/StockInput';
import { StocksDisplay } from '../components/StocksDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { handleErrors } from './Login';
import { serverRoute } from '../serverRoute';
import { formatStocks } from '../utils/formatStocks';
import { StockInterface } from '../types/stock';

export default function Stocks() {

  const [stocks, setStocks] = useState<StockInterface[]>([]);
  const [stocksLoaded, setStocksLoaded] = useState(false);
  const [error, setError] = useState<string | boolean>(false)
  const { credentials, setCredentials } = useContext(CredentialsContext);

  const navigate = useNavigate();

  useEffect(() => {

    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!token) {
      setCredentials(null);
      localStorage.setItem('user', "null");
      navigate("/");
      return;
    }

    // get stocks on load
    fetch(serverRoute + '/stocks', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}:${token}`,
      },
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((stocks) => {

        formatStocks(stocks);

        setStocks(stocks);
        setStocksLoaded(true);
      })
      .catch((error) => {
        setStocks([]);
        setStocksLoaded(true);
      })

  }, []);


  return (
    <div className='bg-white dark:bg-gray-800 pb-8 min-h-screen'>
      <Navbar active="stocks" />
      <StockInput setStocks={setStocks} error={error} setError={setError} />
      {stocksLoaded ?
        stocks.length > 0 ? <StocksDisplay stocks={stocks} setStocks={setStocks} setError={setError} /> : null
        :
        <div className='flex justify-center items-center min-h-[260px] md:min-h-[450px]'>
          <LoadingSpinner size={70} />
        </div>
      }
    </div>
  )
}
