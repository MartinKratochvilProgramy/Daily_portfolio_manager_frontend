import { Link } from 'react-router-dom';
import stocks from '../img/stocks.png';
import net_worth from '../img/net_worth.png';
import relative_change from '../img/relative_change.png';
import pie from '../img/pie.png';
import investment_history from '../img/investment_history.png';
import githubLight from '../img/GitHub-Mark-32px.png';

export default function More() {
    return (
        <div className='text-black dark:text-white'>
            <div className='flex flex-col justify-center items-center space-y-16'>
                <h1 className='max-w-[80%] text-3xl font-semibold mt-8'>
                    ADD YOUR <span className='text-blue-600'>STOCKS</span> AND <span className='text-blue-600'>MANAGE</span> YOUR PORTFOLIO
                </h1>
                <p className='max-w-[80%] md:max-w-[60%] text-xl'>
                    This web app allows you to manage and visualize the daily growth of your portfolio - simply add the stocks you wish to track, specify ticker and amount and the app will
                    update current net worth of your investments every day. App uses Yahoo Finance API, so in order to add your stocks correctly, refer to <a href="https://finance.yahoo.com/" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline underline-offset-4'>https://finance.yahoo.com/</a> and
                    search for corresponding tickers (eg. 'AAPL' or 'MSFT'). When creating the account, you can choose from three currencies in which to display financial data: USD, EUR or CZK - currency
                    conversion rates are fetched from the Yahoo API.
                </p>
                <img src={stocks} alt="stock input example"></img>

                <p className='max-w-[80%] md:max-w-[60%] text-xl'>
                    Because the amounts of each stock in your portfolio may change, every day the server looks for previous close price for each stock in your portfolio and updates current net-worth.
                    Total net worth and relative change is displayed.
                </p>
                <img className='w-10/12' src={net_worth} alt="time-series of total net worth"></img>
                <img className='w-10/12' src={relative_change} alt="time-series of relative % change"></img>

                <p className='max-w-[80%] md:max-w-[60%] text-xl'>
                    To manage your risk more easily, pie chart of % valuation of each stock is displayed.
                </p>
                <img className='mr-4 md:mr-0' src={pie} alt="pie chart of all users stocks"></img>

                <p className='max-w-[80%] md:max-w-[60%] text-xl'>
                    To get a rough idea about how much you invest and what is your discipline when investing, the Investments section displays total invested amount where the amount each day you bought a new stock.
                </p>
                <img className='w-10/12' src={investment_history} alt="time-series of amount invested in portfolio"></img>

                <p className='max-w-[80%] md:max-w-[60%] text-xl'>
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
                <p className='flex flex-row space-x-2 max-w-[80%] md:max-w-[60%] text-xl pt-24 pb-8'>
                    <img
                        className=''
                        src={githubLight}
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
