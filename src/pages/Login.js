import React, { useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { CredentialsContext } from '../App';

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
  const [, setCredentials] = useContext(CredentialsContext);

  
  const login = (e) => {
    e.preventDefault();

    if (!loginInputError(username, password)) {
      fetch(`http://localhost:4000/login`, {
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
        navigate("/stocks") //deprec history.push()
      })
      .catch((error) => {
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
    
                <h1 className='text-3xl font-semibold mt-2 py-8 md:py-16 mb-0'>
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
                  <div className="text-center lg:text-left">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      Login
                    </button>
                    <p className="text-m font-semibold mt-2 pt-1 mb-0">
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
