import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from "react";
import { Register, Login, Stocks, Charts, Investments, About } from './pages';

export const CredentialsContext = React.createContext();

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const credentialsState = useState(user);

  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Routes>
            <Route exact path='/' element={user === null ? <Login  /> : <Charts />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/stocks' element={<Stocks />}></Route>
            <Route exact path='/charts' element={<Charts />}></Route>
            <Route exact path='/investments' element={<Investments />}></Route>
            <Route exact path='/about' element={<About />}></Route>
          </Routes> 
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
