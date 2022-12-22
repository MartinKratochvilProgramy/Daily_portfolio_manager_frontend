import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
const { Register, Login, Stocks, Charts, Investments, About, More } = require('./pages');

interface CredentialsInterface {
  username?: string,
  password?: string
}

export const CredentialsContext = React.createContext<CredentialsInterface | null>(null);
export const ThemeContext = React.createContext<string>('light');
export const CurrencyContext = React.createContext<string>('USD');

function App() {
  const user: string = JSON.parse(localStorage.getItem('user') || "{}");
  const [credentialsState] = useState<CredentialsInterface>({username: user});

  const theme: string = localStorage.getItem('color-theme') || '{}';
  const [themeState] = useState(theme || 'light');

  const currency = localStorage.getItem('currency') || 'USD';
  const [currencyState] = useState(currency);

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
