import React, { useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { CredentialsContext, ThemeContext, CurrencyContext } from '../App';
import LoadingSpinner from '../components/LoadingSpinner';

export const handleErrors = async (response) => {
  // throws error when response not OK
  if (!response.ok) {
    const {message} = await response.json();
    throw Error(message);
  } else {
    return response;
  }
}

export function loginInputError(username, password) {
  if (username === "") return "Missing username";
  if (password === "") return "Missing password";
  return false;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); 
  const [userIsBeingValidated, setUserIsBeingValidated] = useState(false);
  const [, setCredentials] = useContext(CredentialsContext);
  const [, setTheme] = useContext(ThemeContext);
  const [, setCurrency] = useContext(CurrencyContext);

  
  const login = (e) => {
    e.preventDefault();
    setUserIsBeingValidated(true);

    if (!loginInputError(username, password)) {
      // validate login
      fetch(`https://dailyportfoliomanager.herokuapp.com/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      .then(handleErrors)
      .then(async (res) => {
        const json = await res.json();
        // set user in localStorage
        const username = json.username;
        const password = json.password;
        setCredentials({
          username,
          password,
        });
        localStorage.setItem('user', JSON.stringify({
          username,
          password
        }))
        
        // handle theme settings on load -> set global variable and save in localStorage
        if (json.settings.theme === 'dark') {
          setTheme('dark');
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

        // handle currency settings on load -> set global variable and save in localStorage
        setCurrency(json.settings.currency);
        localStorage.setItem('currency', json.settings.currency);

        navigate("/stocks") //deprec history.push()
      })
      .catch((error) => {
        setUserIsBeingValidated(false);
        setError(error.message)
      })
    } else {
      setError(loginInputError(username, password));
    }
  };
  
  const navigate  = useNavigate();

  return (
    // src: https://tailwind-elements.com/docs/standard/components/login-form/
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 h-full">
              <form onSubmit={login}>
    
                <h1 className='text-black dark:text-white text-3xl font-semibold mt-2 py-8 md:py-16 mb-0'>
                  SIMPLE WAY TO <span className='text-blue-600'>MANAGE</span>
                  <br />
                  YOUR <span className='text-blue-600'>INVESTMENTS</span> DAILY
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

                  {error && (<span className='font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>{error}<br /></span>)}
                  <div className="flex flex-col items-center pt-3">
                    <button
                      type="submit"
                      className="inline-block relative px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      Login
                      <div className='absolute right-[-50px] top-3'>
                        {(userIsBeingValidated && !error) && <LoadingSpinner size={6} />}  
                      </div>
                    </button>
                    <p className="text-m text-black dark:text-white font-semibold mt-2 pt-1 mb-0">
                      Don't have an account? <Link 
                                                to="/register" 
                                                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                                                Register
                                              </Link>
                    </p>
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
