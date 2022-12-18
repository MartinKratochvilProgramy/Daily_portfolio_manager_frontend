import React from 'react'
import { Link } from 'react-router-dom';

export default function RegisterForm({ validateUser, setUsername, setPassword, error}) {
  return (
        <div>
          <section className="h-screen">
            <div className="px-6 h-full text-gray-800 min-w-[355px]">
              <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
                <div className="w-10/12 xsm:w-5/12 md:w-4/12 mb-12 md:mb-0 h-full">
                  <form onSubmit={validateUser}>
        
                    <h1 className='text-black dark:text-white text-3xl font-semibold mt-2 pt-8 md:pt-16 mb-6'>
                      CREATE A <span className='text-blue-600'>NEW</span> ACCOUNT
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
            
                      <div className="mb-6">
                        <input
                          type="password"
                          onChange={(e) => setPassword(e.target.value)} 
                          className="form-control w-full max-w-xs px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                        <p className="text-m text-black dark:text-white font-semibold mt-2 pt-3 mb-2">
                          Already have an account? <Link 
                                                    to="/" 
                                                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                                                    Login
                                                  </Link>
                        </p>
                        <Link 
                          to="/more" 
                          className="mb-2 block text-blue-600 font-semibold hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">
                          Find out more
                        </Link>
                        <Link 
                          to="/demo" 
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
        </div> 
  )
}
