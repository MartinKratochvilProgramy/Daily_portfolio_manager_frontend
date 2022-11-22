import React, { useState, useContext, useEffect } from 'react';
import { CredentialsContext } from '../App';
import StockInput from '../components/StockInput';
import StocksDisplay from '../components/StocksDisplay';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { demoStocks } from '../demo/demoStocks';

export default function DemoStocks() {
  const [stocks, setStocks] = useState(demoStocks);
  const [stocksLoaded, ] = useState(true);
  const [, setCredentials] = useContext(CredentialsContext);
  
  setCredentials({username: "demouser", password: "demouser"})
  localStorage.setItem('user', JSON.stringify({
    username: "demouser",
    password: "$2b$10$cgrf7pkSFOKBAfsCa9aFe.IjK/CiCx5NrrjUb.uoO/fJJBOG/Hi2i"
  }))
  
  
  return (
    <div className='bg-white dark:bg-gray-800 pb-8'>
      <Navbar active={"stocks"}/>
      <StockInput setStocks={setStocks}/>
      {stocksLoaded ? 
        <StocksDisplay stocks={stocks} setStocks={setStocks}/>
        :
        <div className='flex justify-center items-center min-h-[260px] md:min-h-[450px]'>
            <LoadingSpinner size={16} />
        </div>
      }
    </div>
  )
}
