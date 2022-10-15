import React, { useState, useContext, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Navbar from '../components/Navbar';
import { CredentialsContext, ThemeContext } from '../App';
import { handleErrors } from './Login';
import { chartThemeLight, chartThemeDark } from './themes/lineChartThemes.js';

export default function Charts() {
    const [chartTheme, setChartTheme] = useState({});
    const [stocks, setStocks] = useState([]);
    const [stocksHistory, setStocksHistory] = useState([]);
    const [relativeChangeHistory, setRelativeChangeHistory] = useState([]);
    const [currentNetWorth, setCurrentNetWorth] = useState(null);
    const [credentials,] = useContext(CredentialsContext);
    const [theme,] = useContext(ThemeContext);

    useEffect(() => {
        if (theme === 'light' || theme === "") {
            document.documentElement.classList.add('light');
            setChartTheme(chartThemeLight);
        } else {
            document.documentElement.classList.add('dark');
            setChartTheme(chartThemeDark);
        }
    }, [theme]);
   
    useEffect(() => {
        // get net worth history on load
        fetch(`https://dailyportfoliomanager.herokuapp.com/stocks_history`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${credentials.username}:${credentials.password}`,
            },
            })
            .then(handleErrors)
            .then((response ) => response.json())
            .then((stocks) => {
                setStocksHistory(stocks)
                setCurrentNetWorth(stocks[stocks.length - 1].netWorth)
            })
            .catch((error) => {
            console.log( error);
        })
    
        // get stocks on load
        fetch(`https://dailyportfoliomanager.herokuapp.com/stocks`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${credentials.username}:${credentials.password}`,
            },
            })
            .then(handleErrors)
            .then((response ) => response.json())
            .then((stocks) => setStocks(stocks))
                .catch((error) => {
                console.log(error);
            })
    
        // get relative change on load
        fetch(`https://dailyportfoliomanager.herokuapp.com/relative_change`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${credentials.username}:${credentials.password}`,
            },
            })
            .then(handleErrors)
            .then((response ) => response.json())
            .then((stocks) => setRelativeChangeHistory(stocks))
                .catch((error) => {
                console.log(error);
            })

    }, [credentials]);

    function initHistoryChart() {
        const historyLayout =  {
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
                    text: 'Net worth [$]',
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
            title: false,
            autosize: true,
            plot_bgcolor: chartTheme.plot_bgcolor,
            paper_bgcolor: chartTheme.paper_bgcolor
        } ;
        const netWorthHistory_x = [];
        const netWorthHistory_y = [];
        stocksHistory.forEach(stock => {
            netWorthHistory_x.push(stock.date)
            netWorthHistory_y.push(stock.netWorth)
        });
    
        const historyData = [
            {
                x: netWorthHistory_x,
                y: netWorthHistory_y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'rgb(37, 99, 235)'},
            },
        ]
        return {historyData, historyLayout}
    }

    function initRelativeChangeChart() {
        const relativeChangeLayout =  {
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
                    text: 'Relative change [%]',
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
            title: false,
            autosize: true,
            plot_bgcolor: chartTheme.plot_bgcolor,
            paper_bgcolor: chartTheme.paper_bgcolor
        } ;
        const relativeChange_x = [];
        const relativeChange_y = [];
        relativeChangeHistory.forEach(time => {
            relativeChange_y.push(time.relativeChange)
            relativeChange_x.push(time.date)
        });
    
        const relativeChangeData = [
            {
                x: relativeChange_x,
                y: relativeChange_y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: '#13a829'},
            },
        ]
        return {relativeChangeData, relativeChangeLayout}
    }

    function initPieChart() {
        const pieLayout =  {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t: 20,
                pad: 5
              }, 
              title: false,
              plot_bgcolor: chartTheme.plot_bgcolor,
              paper_bgcolor: chartTheme.paper_bgcolor,
              font: {
                color: chartTheme.color
              }
        } ;
        const stockTickers = [];
        const stockFractions = [];
        let total = 0;
        stocks.forEach(stock => {
            stockTickers.push(stock.ticker)
            total += stock.prevClose * stock.amount
        });
        stocks.forEach(stock => {
            stockFractions.push(stock.prevClose * stock.amount / total)
        });
    
        const pieData = [
            {
                values: stockFractions,
                labels: stockTickers,
                type: 'pie',
                mode: 'lines+markers',
                marker: {color: '#1C64F2'},
            },
        ]
        return {pieData, pieLayout}
    }

    const {historyData, historyLayout} = initHistoryChart();        
    const {relativeChangeData, relativeChangeLayout} = initRelativeChangeChart();        
    const {pieData, pieLayout} = initPieChart();  
    
  return (
    <div className='bg-white dark:bg-gray-800'>
      <Navbar active={"charts"}/>
        <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
            NET <span className='text-blue-600'>WORTH</span> HISTORY
        </h1>
        <div className='font-semibold text-black dark:text-white'>
            Total: <span className='text-blue-600'>{currentNetWorth}</span> $
        </div>
        <Plot
            data={historyData}
            layout={historyLayout}
            useResizeHandler
            className="w-[100%] h-[100%] sm:w-[80%] sm:h-[80%]"
        />
        <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
            RELATIVE <span className='text-blue-600'>CHANGE</span> HISTORY
        </h1>
        <div className='font-semibold text-black dark:text-white'>
            How much in % has your portfolio changed since it's inception
        </div>
        <Plot
            data={relativeChangeData}
            layout={relativeChangeLayout}
            useResizeHandler
            className="w-[100%] h-[100%] sm:w-[80%] sm:h-[80%]"
        />
        <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
            ALL <span className='text-blue-600'>STOCKS</span>
        </h1>
        <Plot
            data={pieData}
            layout={pieLayout}
            useResizeHandler
            className="w-[100%] h-[100%] sm:w-[80%] sm:h-[80%]"
        />
    </div>
  )
}
