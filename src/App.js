import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Register, Login, Stocks, Charts, Investments, About, More } from './pages';

export const CredentialsContext = React.createContext();
export const ThemeContext = React.createContext();
export const CurrencyContext = React.createContext();

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const credentialsState = useState(user);
  
  const theme = localStorage.getItem('color-theme');
  const themeState = useState(theme || 'light');
  
  const currency = localStorage.getItem('currency');
  const currencyState = useState(currency);

  useEffect(() => {
      if (theme === 'light' || theme === null) {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  )
      
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <ThemeContext.Provider value={themeState}>
          <CurrencyContext.Provider value={currencyState}>
            <Router>
              <Routes>
                <Route exact path='/' element={user === null ? <Login /> : <Stocks />}></Route>
                <Route exact path='/register' element={<Register />}></Route>
                <Route exact path='/stocks' element={<Stocks />}></Route>
                <Route exact path='/charts' element={<Charts />}></Route>
                <Route exact path='/investments' element={<Investments />}></Route>
                <Route exact path='/about' element={<About />}></Route>
                <Route exact path='/more' element={<More />}></Route>
              </Routes> 
            </Router>
          </CurrencyContext.Provider>  
        </ThemeContext.Provider>  
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
