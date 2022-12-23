import React, { useContext, useState, useEffect } from 'react';
import { CredentialsContext, ThemeContext, CurrencyContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import {Navbar} from '../components/Navbar';
import { handleErrors } from './Login';
import { chartThemeLight, chartThemeDark } from './themes/lineChartThemes.js';
import { serverRoute } from '../serverRoute';
import Cookies from 'universal-cookie';
const { LoadingSpinner } = require('../components/LoadingSpinner');

export default function Investments() {
  const [chartTheme, setChartTheme] = useState({});
  const [investmentsHistory, setInvestmentsHistory] = useState([]);
  const [investmentsLoaded, setInvestmentsLoaded] = useState(false);
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [theme,] = useContext(ThemeContext);
  const [currency,] = useContext(CurrencyContext);

  const navigate = useNavigate();

  useEffect(() => {
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
      localStorage.setItem('user', null);
      navigate("/");
      return;
    }

    // get net worth history on load
    fetch(serverRoute + `/investments_history`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${token}`,
        },
        })
        .then(handleErrors)
        .then((response ) => response.json())
        .then((investments) => {
          setInvestmentsHistory(investments)
          setInvestmentsLoaded(true);
        })
        .catch((error) => {
            console.log( error);
        })

  }, [credentials, setCredentials, navigate]);

  function initInvestmentsChart() {
    const investmentsLayout =  {
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
                text: `Total invested [${currency}]`,
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
            b: 100,
            t: 20,
            pad: 5
          }, 
        title: false,
        plot_bgcolor: chartTheme.plot_bgcolor,
        paper_bgcolor: chartTheme.paper_bgcolor
    } ;
    const totalInvestedAmounts = [];
    const changesHistory = [];
    investmentsHistory.forEach(investments => {
        totalInvestedAmounts.push(investments.total)
        changesHistory.push(investments.date)
    });

    const investmentsData = [
        {
            x: changesHistory,
            y: totalInvestedAmounts,
            type: 'bar',
            mode: 'lines+markers',
            marker: {color: '#1C64F2'},
        },
    ]
    return {investmentsData, investmentsLayout}
  }

  const {investmentsData, investmentsLayout} = initInvestmentsChart(); 

  return (
    <div className='bg-white dark:bg-gray-800'>
        <Navbar active={"investments"}/>
        <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
            YOUR HISTORICAL <span className='text-blue-600'>INVESTMENTS</span>
        </h1>
        <div className='flex justify-center items-center min-h-[260px] md:min-h-[450px]'>
          {investmentsLoaded ? 
            <Plot
                data={investmentsData}
                layout={investmentsLayout}
                useResizeHandler
                className="w-[100%] sm:w-[80%] h-[360px] md:h-full"
            />
            :
            <LoadingSpinner size={70} />
          }
        </div>
    </div>
  )
}
