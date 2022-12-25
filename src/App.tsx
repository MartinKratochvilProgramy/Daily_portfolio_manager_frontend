import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Register from './pages/Register';
import Login from './pages/Login';
import Stocks from './pages/Stocks';
import Charts from './pages/Charts';
import Investments from './pages/Investments';
import About from './pages/About';
import More from './pages/More';

interface CredentialsInterface {
  username: string | null,
}

export const CredentialsContext = React.createContext<any>(null);
export const ThemeContext = React.createContext<any>('light');
export const CurrencyContext = React.createContext<any>('USD');

function App() {
  const user: CredentialsInterface = JSON.parse(localStorage.getItem('user') || "null");

  const [credentialsState, setCredentialsState] = useState(user);

  const theme = localStorage.getItem('color-theme') || 'light';
  const [themeState, setThemeState] = useState(theme || 'light');

  const currency = localStorage.getItem('currency') || 'USD';
  const [currencyState, setCurrencyState] = useState(currency);

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
      <CredentialsContext.Provider value={{ credentials: credentialsState, setCredentials: setCredentialsState }}>
        <ThemeContext.Provider value={{ theme: themeState, setTheme: setThemeState }}>
          <CurrencyContext.Provider value={{ currency: currencyState, setCurrency: setCurrencyState }}>
            <Router>
              <Routes>
                <Route path='/' element={user === null ? <Login /> : <Stocks />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/stocks' element={<Stocks />}></Route>
                <Route path='/charts' element={<Charts />}></Route>
                <Route path='/investments' element={<Investments />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/more' element={<More />}></Route>
              </Routes>
            </Router>
          </CurrencyContext.Provider>
        </ThemeContext.Provider>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
