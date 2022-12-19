import React, { useState, useContext } from 'react';
import Cookies from 'universal-cookie';
import {  useNavigate } from 'react-router-dom';
import { CredentialsContext, CurrencyContext } from '../App';
import { handleErrors } from './Login';
import RegisterForm from '../components/RegisterForm';
import PickCurrencyForm from '../components/PickCurrencyForm';
import { serverRoute } from '../serverRoute';

export function registerInputError(username, password) {
  if (username === "") return "Missing username";
  if (password === "") return "Missing password";
  if (username.length < 3) return "Username should be longer than 3 characters";
  if (password.length < 6) return "Password should be longer than 6 characters";
  return false;
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userCurrency, userSetCurrency] = useState("USD");
  const [pickCurrency, setPickCurrency] = useState(false);
  const [error, setError] = useState(false); 
  const [, setCredentials] = useContext(CredentialsContext);
  const [, setCurrency] = useContext(CurrencyContext);

  const navigate  = useNavigate();

  const validateUser = (e) => {
    e.preventDefault();

    const error = registerInputError(username, password);
    if (error) {
      setError(error);
      return
    };

    fetch(serverRoute + '/validate_user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      })
    })
      .then(handleErrors)
      .then(() => {
        setPickCurrency(true);
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  const register = (e) => {
    // send username, password to server to create new user
    e.preventDefault();

    fetch(serverRoute + `/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, 
        password,
        settings: {
          theme: "light",     // light theme by default
          currency: userCurrency
        }
      })
    })
    .then(async (res) => {
      const json = await res.json();
      // set user in localStorage
      const username = json.username;
      setCredentials({
        username,
      })
      localStorage.setItem('user', JSON.stringify({
        username,
      }))

      const cookies = new Cookies();
      cookies.set('token', json.token, { path: '/', maxAge: 6000 });

      navigate("/stocks"); //deprec history.push()

      setPickCurrency(true);
    })

    setCurrency(userCurrency);
    localStorage.setItem('currency', userCurrency);
  };


    return (
      // src: https://tailwind-elements.com/docs/standard/components/login-form/
      <div>
        {!pickCurrency ? 
          <RegisterForm validateUser={validateUser} setUsername={setUsername} setPassword={setPassword} error={error} />
        : 
          <PickCurrencyForm register={register} userSetCurrency={userSetCurrency} />
        }
      </div>
    )
}
