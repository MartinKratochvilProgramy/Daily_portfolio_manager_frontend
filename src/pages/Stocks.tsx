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

  const sortStocks = (value: string) => {
    const newStocks = [...stocks];

    if (value === "A-Z") {
      newStocks.sort((a, b) => a.ticker.localeCompare(b.ticker))
      setStocks(newStocks);
    } else if (value === "Z-A") {
      newStocks.sort((a, b) => b.ticker.localeCompare(a.ticker))
      setStocks(newStocks);
    } else if (value === "NEWEST") {
      newStocks.sort(function (a, b) { return new Date(b.lastPurchase).getTime() - new Date(a.lastPurchase).getTime() });
      setStocks(newStocks);
    } else if (value === "OLDEST") {
      newStocks.sort(function (a, b) { return new Date(a.firstPurchase).getTime() - new Date(b.firstPurchase).getTime() });
      setStocks(newStocks);
    } else if (value === "VALUE HIGH") {
      newStocks.sort(function (a, b) { return b.prevClose * b.amount - a.prevClose * a.amount });
      setStocks(newStocks);
    } else if (value === "VALUE LOW") {
      newStocks.sort(function (a, b) { return a.prevClose * a.amount - b.prevClose * b.amount });
      setStocks(newStocks);
    } else if (value === "CHANGE HIGH") {
      newStocks.sort(function (a, b) { return b.avgPercentageChange - a.avgPercentageChange });
      setStocks(newStocks);
    } else if (value === "CHANGE LOW") {
      newStocks.sort(function (a, b) { return a.avgPercentageChange - b.avgPercentageChange });
      setStocks(newStocks);
    }
  }

  useEffect(() => {
    sortStocks("NEWEST");
  }, []);

  return (
    <div className='bg-white dark:bg-gray-800 pb-8 min-h-screen'>
      <Navbar active="stocks" />
      <StockInput 
        setStocks={setStocks} 
        error={error} 
        setError={setError} 
        sortStocks={sortStocks}
      />
      {stocksLoaded ?
        stocks.length > 0 ? <StocksDisplay stocks={stocks} setStocks={setStocks} setError={setError} sortStocks={sortStocks} /> : null
        :
        <div className='flex justify-center items-center min-h-[260px] md:min-h-[450px]'>
          <LoadingSpinner size={70} />
        </div>
      }
    </div>
  )
}
