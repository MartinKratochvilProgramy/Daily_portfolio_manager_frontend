import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext, CurrencyContext } from '../App';
import { handleErrors } from './Login';
import RegisterForm from '../components/RegisterForm';
import PickCurrencyForm from '../components/PickCurrencyForm';

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
    setPickCurrency(true);
  }

  
  // use state vars to make http request
  const persist = (e) => {
    e.preventDefault();

    if(!registerInputError(username, password)) {
      fetch(`https://dailyportfoliomanager.herokuapp.com/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, 
          password,
          settings: {
            theme: "light",
            currency: userCurrency
          }
        })
      })
      .then(handleErrors)
      .then(async (res) => {
        const json = await res.json();
        // set user in localStorage
        const username = json.username;
        const password = json.password;
        setCredentials({
          username,
          password
        })
        localStorage.setItem('user', JSON.stringify({
          username,
          password
        }))
        navigate("/stocks"); //deprec history.push()
      })
      .catch((error) => {
        setError(error.message)
      })
    } else {
      setError(registerInputError(username, password));
    }

    setCurrency(userCurrency);
    localStorage.setItem('currency', userCurrency);
  };


    return (
      // src: https://tailwind-elements.com/docs/standard/components/login-form/
      <div>
        {!pickCurrency ? 
          <RegisterForm validateUser={validateUser} setUsername={setUsername} setPassword={setPassword} error={error} />
        : 
          <PickCurrencyForm userSetCurrency={userSetCurrency} persist={persist} />
        }
      </div>
    )
}
