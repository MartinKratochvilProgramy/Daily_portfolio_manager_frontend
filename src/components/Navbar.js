import React, { useContext } from 'react';
import { CredentialsContext, ThemeContext } from '../App';
import { useNavigate  } from 'react-router-dom';
import { serverRoute } from '../serverRoute';

export default function Navbar({ active }) {
    
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const [, setTheme] = useContext(ThemeContext);

    const navigate = useNavigate();

    console.log(credentials.username);
    
    if (credentials.username === null) {
        console.log("empty");
    };

    function logout() {
        setCredentials(null);
        localStorage.setItem('user', null);
        // set light theme on logout
        localStorage.setItem('color-theme', 'light');
        document.documentElement.classList.remove('dark');
        navigate("/");
    }

    function persistTheme(theme) {
        fetch(serverRoute + '/set_theme', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Basic ${credentials.username}:${credentials.password}`
            },
            body: JSON.stringify({
              theme, 
            })
          })
    }

    function toggleTheme () {
        if (
            localStorage.getItem('color-theme') === 'light' ||
            localStorage.getItem('color-theme') === null ||
            (!('color-theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
                setTheme('dark');
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
                persistTheme('dark');
            } else {
                setTheme('light');
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
                persistTheme('light');
            }
    }

    const activeStyles = "block p-1 sm:p-4 text-white bg-blue-700 bg-transparent text-blue-400 bg-transparent";
    const nonActiveStyles = "block p-1 sm:p-4 text-gray-700 hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 hover:text-white text-gray-300 border-gray-700";

  return (
    <nav className="border-gray-200 px-0 sm:px-4 bg-gray-900">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center w-auto order-1" id="navbar-search">

            <div className='flex w-full sm:w-auto py-1 px-2 justify-start items-center text-white space-x-4'>
                <div className='pb-[2px]'>
                    {credentials.username}
                </div>
                <div className="bg-gray-900 dark:text-gray-100"
                    onClick={toggleTheme}>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm text-gray-300 dark:text-gray-500">Light</span>
                            <label className="flex items-center h-5 p-1 duration-300 ease-in-out bg-gray-400 rounded-full cursor-pointer w-9 dark:bg-gray-600">
                                <div
                                    className="w-4 h-4 duration-300 ease-in-out transform bg-white rounded-full shadow-md toggle-dot dark:translate-x-3">
                                </div>
                            </label>
                        <span className="text-sm text-gray-500 dark:text-gray-300">Dark</span>
                        <input id="toggle" type="checkbox" className="hidden" />
                    </div>
                </div>
            </div>

            <ul className="flex flex-row justify-around items-center w-full sm:w-auto p-0 sm:p-1 border-gray-100 space-x-0 md:space-x-4 mt-0 text-sm font-medium border-0 bg-gray-900">
                <li>
                    <a href="/stocks" className={active === "stocks" ? activeStyles : nonActiveStyles}>
                        Stocks
                    </a>
                </li>
                <li>
                    <a href="charts" className={active === "charts" ? activeStyles : nonActiveStyles}>
                        Charts
                    </a>
                </li>
                <li>
                    <a href="investments" className={active === "investments" ? activeStyles : nonActiveStyles}>
                        Investments
                    </a>
                </li>
                <li>
                    <a href="about" className={active === "about" ? activeStyles : nonActiveStyles}>
                        About
                    </a>
                </li>
                <li>
                    <button
                        type="submit"
                        className="flex flex-row px-2 md:px-5 py-1 md:py-2 my-2 mr-1 text-blue-600 rounded border-solid border-blue-600 border-[1px] bg-white font-medium text-sm leading-snug uppercase whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={logout}
                        >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </nav>
  )
}
