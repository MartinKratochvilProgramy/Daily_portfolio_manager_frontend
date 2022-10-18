import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Login';

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
  const [error, setError] = useState(false); 
  const [, setCredentials] = useContext(CredentialsContext);

  const navigate  = useNavigate();

  // use state vars to make http request
  const register = (e) => {
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
        })
      })
      .then(handleErrors)
      .then(async (res) => {
        const json = await res.json();
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
  };

  return (
    // src: https://tailwind-elements.com/docs/standard/components/login-form/
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800 min-w-[355px]">
          <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 h-full">
              <form onSubmit={register}>
    
                <h1 className='text-3xl text-black dark:text-white font-semibold mt-2 py-8 md:py-16 mb-0'>
                  CREATE A <span className='text-blue-600'>NEW</span>
                  <br />
                  ACCOUNT
                </h1>

                <div className="flex flex-col justify-center items center xl:w-8/12 lg:w-10/12 md:w-10/12 mb-12 md:mb-0 mx-auto h-full">
                  <div className="mb-6">
                    <input
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Username"
                      autoFocus
                    />
                  </div>
        
                  <div className="mb-6">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)} 
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                    />
                  </div>
                  {error && (<span className='font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 mb-4 transition duration-200 ease-in-out'>{error}</span>)}
                  <div className="text-center lg:text-left">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      Register
                    </button>
                    <p className="text-m text-black dark:text-white font-semibold mt-2 pt-1 mb-0">
                      Already have an account? <Link 
                                                to="/" 
                                                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                                                Login
                                              </Link>
                    </p>
                    {/* <p className="text-m text-black dark:text-white font-semibold mt-2 pt-1 mb-0">
                      <Link 
                          to="/more" 
                          className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">
                          Find out more
                        </Link>
                    </p> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
