import React, { useContext, useState, useEffect } from 'react';
import { CredentialsContext, ThemeContext } from '../App';
import Plot from 'react-plotly.js';
import Navbar from '../components/Navbar';
import { handleErrors } from './Login';
import { chartThemeLight, chartThemeDark } from './themes/lineChartThemes.js';

export default function Investments() {
  const [chartTheme, setChartTheme] = useState({});
  const [investmentsHistory, setInvestmentsHistory] = useState([]);
  const [credentials, ] = useContext(CredentialsContext);
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
    fetch(`https://dailyportfoliomanager.herokuapp.com/investments_history`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
        })
        .then(handleErrors)
        .then((response ) => response.json())
        .then((investments) => {
          setInvestmentsHistory(investments)
        })
        .catch((error) => {
        console.log( error);
    })

  }, [credentials]);

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
                  text: 'Total invested [$]',
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
        <Plot
            data={investmentsData}
            layout={investmentsLayout}
            useResizeHandler
            className="w-[100%] h-[100%] sm:w-[80%] sm:h-[80%]"
        />
    
    </div>
  )
}
