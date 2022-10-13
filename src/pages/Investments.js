import React, { useContext, useState, useEffect } from 'react';
import { CredentialsContext } from '../App';
import Plot from 'react-plotly.js';
import Navbar from '../components/Navbar';
import { handleErrors } from './Login';

export default function Investments() {

    const [credentials, ] = useContext(CredentialsContext);
    const [investmentsHistory, setInvestmentsHistory] = useState([]);
  
    useEffect(() => {
      // get net worth history on load
      fetch(`http://localhost:4000/investments_history`, {
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
                    color: 'black'
                  }
                }
          },
          yaxis: {
              title: {
                  text: 'Total invested [$]',
                  font: {
                    size: 18,
                    color: 'black'
                  }
                }
          },
          margin: {
              l: 100,
              r: 20,
              b: 60,
              t: 20,
              pad: 5
            }, title: false
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
    <div>
        <Navbar active={"investments"}/>
        <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0'>
            YOUR HISTORICAL <span className='text-blue-600'>INVESTMENTS</span>
        </h1>
        <Plot
            data={investmentsData}
            layout={investmentsLayout}
            useResizeHandler
            className="w-[80%] h-[80%]"
        />
    
    </div>
  )
}
