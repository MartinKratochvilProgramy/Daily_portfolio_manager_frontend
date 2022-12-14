import React, { useState, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { handleErrors } from './Login';
import { CredentialsContext, CurrencyContext } from '../App';
import { RegisterForm } from '../components/RegisterForm';
import { PickCurrencyForm } from '../components/PickCurrencyForm';
import { serverRoute } from '../serverRoute';

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
  const [userCurrency, setUserCurrency] = useState<"USD" | "EUR" | "CZK">("USD");
  const [pickCurrency, setPickCurrency] = useState(false);
  const [userIsBeingValidated, setUserIsBeingValidated] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const { setCredentials } = useContext(CredentialsContext);
  const { setCurrency } = useContext(CurrencyContext);


  const navigate = useNavigate();

  const validateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserIsBeingValidated(true);

    const error = registerInputError(username, password);
    if (error) {
      setError(error);
      setUserIsBeingValidated(false)
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

        setCredentials(username)
        localStorage.setItem('user', JSON.stringify(username))

        const cookies = new Cookies();
        cookies.set('token', json.token, { path: '/', maxAge: 6000 });

        navigate("/stocks"); //deprec history.push()

        setPickCurrency(true);
        setUserIsBeingValidated(false);
      })

    setCurrency(userCurrency);
    localStorage.setItem('currency', userCurrency);
  };

  return (
    // src: https://tailwind-elements.com/docs/standard/components/login-form/
    <>
      {!pickCurrency ?
        <RegisterForm validateUser={validateUser} setUsername={setUsername} setPassword={setPassword} error={error} userIsBeingValidated={userIsBeingValidated} />
        :
        <PickCurrencyForm register={register} setUserCurrency={setUserCurrency} />
      }
    </>
  )
}
