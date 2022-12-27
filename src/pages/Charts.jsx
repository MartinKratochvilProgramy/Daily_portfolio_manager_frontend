import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { Navbar } from '../components/Navbar';
import { CredentialsContext, ThemeContext, CurrencyContext } from '../App';
import { handleErrors } from './Login';
import { chartThemeLight } from './themes/chartThemeLight.js';
import { chartThemeDark } from './themes/chartThemeDark.js';
import { serverRoute } from '../serverRoute';
import Cookies from 'universal-cookie';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function Charts() {
    const [stocks, setStocks] = useState([]);
    const [stocksHistory, setStocksHistory] = useState([]);
    const [stocksLoaded, setStocksLoaded] = useState(false);
    const [chartTheme, setChartTheme] = useState(chartThemeLight);
    const [currentNetWorth, setCurrentNetWorth] = useState(0);
    const [relativeChangeHistory, setRelativeChangeHistory] = useState([]);
    const [currentRelativeChange, setCurrentRelativeChange] = useState(0);
    const { credentials, setCredentials } = useContext(CredentialsContext);
    const { theme } = useContext(ThemeContext);
    const { currency } = useContext(CurrencyContext);

    const navigate = useNavigate();

    useEffect(() => {
        // set chart theme on load
        if (theme === 'light' || theme === "") {
            setChartTheme(chartThemeLight);
        } else {
            setChartTheme(chartThemeDark);
        }
    }, [theme]);

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get('token');

        if (!token) {
            setCredentials(null);
            localStorage.setItem('user', "null");
            navigate("/");
            return;
        }

        // get net worth history on load
        fetch(serverRoute + '/stocks_history', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${credentials}:${token}`,
            },
        })
            .then(handleErrors)
            .then((response) => response.json())
            .then((history) => {
                setStocksHistory(history);

                setCurrentNetWorth(history[history.length - 1].netWorth);
            })
            .catch((error) => {
                console.log(error);
                setStocksLoaded(true);
            })

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
                setStocks(stocks)
            })
            .catch((error) => {
                console.log(error);
                setStocksLoaded(true);
            })

        // get relative change on load
        fetch(serverRoute + '/relative_change', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${credentials}:${token}`,
            },
        })
            .then(handleErrors)
            .then((response) => response.json())
            .then((relativeChange) => {
                relativeChange.forEach(
                    (item) => item.relativeChange = parseFloat(((item.relativeChange - 1) * 100).toFixed(2))
                )
                setRelativeChangeHistory(relativeChange);

                setCurrentRelativeChange(relativeChange[relativeChange.length - 1].relativeChange);
                setStocksLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setStocksLoaded(true);
            })

    }, [credentials, setCredentials, navigate]);

    function initHistoryChart() {
        const historyLayout = {
            xaxis: {
                title: {
                    text: 'Time',
                    font: {
                        size: 18,
                        color: chartTheme.color
                    }
                },
                color: chartTheme.color,
                tickcolor: chartTheme.tickcolor,
                gridcolor: chartTheme.gridcolor
            },
            yaxis: {
                title: {
                    text: 'Net worth [${currency}]',
                    font: {
                        size: 18,
                        color: chartTheme.color
                    }
                },
                color: chartTheme.color,
                tickcolor: chartTheme.tickcolor,
                gridcolor: chartTheme.gridcolor
            },
            margin: {
                l: 100,
                r: 20,
                b: 80,
                t: 20,
                pad: 5
            },
            autosize: true,
            plot_bgcolor: chartTheme.plot_bgcolor,
            paper_bgcolor: chartTheme.paper_bgcolor
        };
        const netWorthHistory_x = [];
        const netWorthHistory_y = [];

        stocksHistory.forEach((stock) => {
            netWorthHistory_x.push(stock.date)
            netWorthHistory_y.push(stock.netWorth)
        });

        const historyData = [
            {
                x: netWorthHistory_x,
                y: netWorthHistory_y,
                mode: 'lines',
                line: {
                    shape: 'spline',
                    color: 'rgb(37, 99, 235)',
                },
                name: 'Total net-worth history'
            },
        ]
        return { historyData, historyLayout }
    }

    function initRelativeChangeChart() {
        const relativeChangeLayout = {
            xaxis: {
                title: {
                    text: 'Time',
                    font: {
                        size: 18,
                        color: chartTheme.color
                    }
                },
                color: chartTheme.color,
                tickcolor: chartTheme.tickcolor,
                gridcolor: chartTheme.gridcolor
            },
            yaxis: {
                title: {
                    text: 'Relative change [${currency}]',
                    font: {
                        size: 18,
                        color: chartTheme.color
                    }
                },
                color: chartTheme.color,
                tickcolor: chartTheme.tickcolor,
                gridcolor: chartTheme.gridcolor
            },
            margin: {
                l: 100,
                r: 20,
                b: 80,
                t: 20,
                pad: 5
            },
            autosize: true,
            plot_bgcolor: chartTheme.plot_bgcolor,
            paper_bgcolor: chartTheme.paper_bgcolor
        };
        const relativeChange_x = [];
        const relativeChange_y = [];
        relativeChangeHistory.forEach((time) => {
            relativeChange_y.push(time.relativeChange)
            relativeChange_x.push(time.date)
        });

        const relativeChangeData = [
            {
                x: relativeChange_x,
                y: relativeChange_y,
                line: {
                    shape: 'spline',
                    color: '#13a829',
                },
                mode: 'lines',
                name: 'Relative change history'
                // type: 'scatter',
                // mode: 'lines+markers',
                // marker: { color: '#13a829' },
            },
        ]
        return { relativeChangeData, relativeChangeLayout }
    }

    function initPieChart() {
        const pieLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t: 20,
                pad: 5
            },
            plot_bgcolor: chartTheme.plot_bgcolor,
            paper_bgcolor: chartTheme.paper_bgcolor,
            font: {
                color: chartTheme.color
            }
        };
        const stockTickers = [];
        const stockFractions = [];
        stocks.forEach((stock) => {
            stockTickers.push(stock.ticker)
        });
        stocks.forEach((stock) => {
            stockFractions.push(stock.prevClose * stock.amount)
        });

        const pieData = [
            {
                values: stockFractions,
                labels: stockTickers,
                type: "pie",
                name: "Pie chart"
            },
        ]
        return { pieData, pieLayout }
    }

    function numberWithSpaces(x) {
        // returns number as string with spaces between thousands
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    const { historyData, historyLayout } = initHistoryChart();
    const { relativeChangeData, relativeChangeLayout } = initRelativeChangeChart();
    const { pieData, pieLayout } = initPieChart();

    return (
        <div className='bg-white dark:bg-gray-800 min-h-screen'>
            <Navbar active={"charts"} />
            <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
                NET <span className='text-blue-600'>WORTH</span> HISTORY
            </h1>
            <div className='font-semibold text-black dark:text-white text-xs xsm:text-lg'>
                Total: <span className='text-blue-600'>{numberWithSpaces(currentNetWorth)}</span> {currency}
            </div>
            <div className='flex justify-center items-center min-h-[260px] md:min-h-[450px]'>
                {stocksLoaded ?
                    <Plot
                        data={historyData}
                        layout={historyLayout}
                        useResizeHandler
                        className="w-[100%] sm:w-[80%] h-[260px] md:h-full"
                    />
                    :
                    <LoadingSpinner size={70} />
                }
            </div>
            <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
                RELATIVE <span className='text-blue-600'>CHANGE</span> HISTORY
            </h1>
            <div className='font-semibold text-black dark:text-white text-xs xsm:text-lg'>
                Since its creation, your portfolio is {currentRelativeChange >= 0 ? 'UP' : 'DOWN'} <span className='text-blue-600'>{currentRelativeChange} %</span>
            </div>
            <div className='flex justify-center items-center min-h-[260px] md:min-h-[450px]'>
                {stocksLoaded ?
                    <Plot
                        data={relativeChangeData}
                        layout={relativeChangeLayout}
                        useResizeHandler
                        className="w-[100%] sm:w-[80%] h-[260px] md:h-full"
                    />
                    :
                    <LoadingSpinner size={70} />
                }
            </div>
            <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
                ALL <span className='text-blue-600'>STOCKS</span>
            </h1>
            <div className='font-semibold text-black dark:text-white text-xs xsm:text-lg'>
                Pie chart of all the stocks in your portfolio
            </div>
            <div className='flex justify-center items-center pl-0 md:pl-20 min-h-[260px] md:min-h-[450px]'>
                {stocksLoaded ?
                    <Plot
                        data={pieData}
                        layout={pieLayout}
                        useResizeHandler
                        className="w-[100%] sm:w-[75%] h-[260px] md:h-auto"
                    />
                    :
                    <LoadingSpinner size={70} />
                }
            </div>
        </div>
    )
}
