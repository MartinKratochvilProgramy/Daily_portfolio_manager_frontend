import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { CredentialsContext } from '../App';
import { serverRoute } from '../serverRoute';
import { Stock } from './Stock';
import { OrderDropDown } from './OrderDropDown';
import { formatStocks } from '../utils/formatStocks';
import { StockInterface } from '../types/stock';

interface Props {
  stocks: StockInterface[];
  setStocks: (stocks: StockInterface[]) => void;
  setError: (error: string | boolean) => void;
  sortStocks: (orderBy: string, stocks: StockInterface[]) => void;
}

export const StocksDisplay: React.FC<Props> = ({
  stocks,
  setStocks,
  setError,
  sortStocks
}) => {

  const [searchKey, setSearchKey] = useState("");
  const { credentials, setCredentials } = useContext(CredentialsContext);

  const navigate = useNavigate();

  const deleteStock = (ticker: string, amount: number): void => {

    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!token) {
      setCredentials(null);
      localStorage.setItem('user', "null");
      navigate("/");
      return;
    }

    if (credentials === "demouser") {
      setError("Cannot edit in demo mode");
      return;
    }
    // hit the endpoint and write to db
    fetch(serverRoute + '/stock_remove', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}:${token}`
      },
      body: JSON.stringify({
        ticker,
        amount
      })
    })
      .then((response) => response.json())
      .then((stocks) => {

        formatStocks(stocks);
        setStocks(stocks);
      })
  };

  function handleClick(value: string) {
    const newStocks = [...stocks];
    sortStocks(value, newStocks);
    setStocks(newStocks);
  }

  return (
    <div
      className="flex flex-col md:px-12 px-2 pt-14 w-11/12 md:w-6/12 m-auto"
      id='stocks-output'
    >
      <div className='flex justify-between mb-2'>
        <OrderDropDown values={["NEWEST", "OLDEST", "VALUE HIGH", "VALUE LOW", "CHANGE HIGH", "CHANGE LOW", "A-Z", "Z-A"]} handleClick={handleClick} theme={"dark"} />
        <input
          onChange={(e) => setSearchKey(e.target.value)}
          className='w-[105px] xsm:w-[124px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          type="text"
          placeholder='Search...' />
      </div>
      {stocks.map((stock: StockInterface) => {
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
