import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import {  useNavigate } from 'react-router-dom';
import { handleErrors } from './Login';
const { CredentialsContext, CurrencyContext } = require('../App');
const RegisterForm = require('../components/RegisterForm');
const PickCurrencyForm = require('../components/PickCurrencyForm');
const { serverRoute } = require('../serverRoute');

export function registerInputError(
  username: string,
  password: string
) {
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
  const [error, setError] = useState<boolean | string>(false); 
  const [, setCredentials] = CredentialsContext();
  const [, setCurrency] = CurrencyContext();

  const navigate  = useNavigate();

  const validateUser = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const error = registerInputError(username, password);
    if (error) {
      setError(error);
      return
    };

    fetch(serverRoute + '/validate_username', {
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

  const register = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
