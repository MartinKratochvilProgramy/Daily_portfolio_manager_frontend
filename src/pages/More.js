import React from 'react'
import { Link } from 'react-router-dom';

export default function More() {
  return (
    <div className='text-black dark:text-white'>
    <div className='flex flex-col justify-center items-center space-y-16'>
        <h1 className='text-3xl font-semibold mt-8'>
            ADD YOUR <span className='text-blue-600'>STOCKS</span> AND <span className='text-blue-600'>MANAGE</span> YOUR PORTFOLIO
        </h1>
        <p className='max-w-[60%] text-xl'>
            This web app allows you to manage and visualize the daily growth of your portfolio - simply add the stocks you wish to track, specify the ticker and amount and the app will automatically every day 
            update current net worth of your investments. App uses Yahoo Finance API, so in order to add your stocks correctly, refer to <a href="https://finance.yahoo.com/" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline underline-offset-4'>https://finance.yahoo.com/</a> and 
            search for corresponding tickers (eg. 'AAPL' or 'MSFT').
        </p>
        <p className='max-w-[60%] text-xl'>
            Every day the server looks for previous close price for each stock in your portfolio and updates current net-worth.
        </p>
        <p className='max-w-[60%] text-xl'>
            To get a rough idea about how much you invest and what is your discipline when investing, refer to the <a href="/investments" className='text-blue-600 underline underline-offset-4'>Investments </a>
            section, where the amount of money you invested is displayed. 
        </p>
        <p className='max-w-[60%] text-xl'>
            This app is intended for the 'Bogglehead' type investor who likes to invest regularly over longer periods of time.
        </p>
        <div className='flex space-x-3 text-xl text-black dark:text-white font-semibold mt-2 pt-1 mb-0'>
            <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out hover:underline">
                Login
            </Link>
            <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out hover:underline">
                Register
            </Link>
        </div>
        <p className='flex flex-row space-x-2 max-w-[60%] text-xl pt-24 pb-8'>
            <img 
                className=''
                src={require("../img/GitHub-Mark-32px.png")} 
                alt="GitHub_logo"
                />
            <a 
                href="https://github.com/MartinKratochvilProgramy" 
                className='text-blue-600 underline underline-offset-4'
                target="_blank" 
                rel="noopener noreferrer"
                >
                GitHub
                </a>
        </p>
    </div>
</div>
  )
}