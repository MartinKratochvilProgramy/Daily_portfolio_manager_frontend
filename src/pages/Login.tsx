import React, { useState, useContext } from 'react';
import Cookies from 'universal-cookie';
import { Link, useNavigate  } from 'react-router-dom';
import { CredentialsContext, ThemeContext, CurrencyContext } from '../App';
const { LoadingSpinner } = require('../components/LoadingSpinner');
const { serverRoute } = require('../serverRoute');

export const handleErrors = async (response: any) => {
  // throws error when response not OK
  if (!response.ok) {
    const {message} = await response.json();
    throw Error(message);
  } else {
    return response;
  }
}

export function loginInputError(
  username: string,
  password: string
  ) {
    if (username === "") return "Missing username";
    if (password === "") return "Missing password";
    return false;
  }
  
export default function Login() {
    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean | string>(false); 
  const [userIsBeingValidated, setUserIsBeingValidated] = useState(false);
  const { setCredentials } = useContext(CredentialsContext);
  const { setTheme } = useContext(ThemeContext);
  const { setCurrency } = useContext(CurrencyContext);
  
  const login = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLAnchorElement>,
    username: string,
    password: string
  ) => {
    e.preventDefault();
    setUserIsBeingValidated(true);

    if (!loginInputError(username, password)) {
      // validate login
      fetch(serverRoute + `/login`, {
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

        const cookies = new Cookies();
        cookies.set('token', json.token, { path: '/', maxAge: 6000 });
        
        setCredentials(username);
        localStorage.setItem('user', JSON.stringify(username))
        
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


        navigate("/stocks");
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
    <>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
            <div className="w-10/12 xsm:w-5/12 md:w-4/12 mb-12 md:mb-0 h-full">
              <form onSubmit={(e) => login(e, username, password)}>
    
                <h1 className='text-black dark:text-white text-3xl font-semibold mt-2 pt-8 md:pt-16 mb-6'>
                  SIMPLE WAY TO <span className='text-blue-600'>MANAGE</span>
                  <br />
                  YOUR <span className='text-blue-600'>INVESTMENTS</span> DAILY
                </h1>

                <div className="flex flex-col justify-center items center xl:w-8/12 lg:w-10/12 md:w-10/12 mb-12 md:mb-0 mx-auto h-full">
                  <div className="mb-6">
                    <input
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control w-full max-w-xs px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Username"
                      autoFocus
                    />
                  </div>
        
                  <div className="mb-4">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)} 
                      className="form-control w-full max-w-xs px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                    />
                  </div>

                  {error && (<span className='mb-2 font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>{error}<br /></span>)}
                  <div className="text-center lg:text-left">
                    <button
                      type="submit"
                      className="inline-block mt-2 relative px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      Login
                      <div className='absolute right-[-50px] top-3'>
                        {(userIsBeingValidated && !error) && <LoadingSpinner size={32} />}  
                      </div>
                    </button>
                    <p className="text-m text-black dark:text-white font-semibold pt-3 mb-1">
                      Don't have an account? <Link 
                                                to="/register" 
                                                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                                                Register
                                              </Link>
                    </p>
                    <Link 
                      to="/more" 
                      className="mb-1 block text-blue-600 font-semibold hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">
                      Find out more
                    </Link>
                    <Link 
                      onClick={(e) => login(e, "demouser", "demouser")}
                      to=""
                      className="block text-blue-600 font-semibold hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">
                      Demo
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
