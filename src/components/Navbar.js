import React, { useContext } from 'react';
import { CredentialsContext, ThemeContext } from '../App';
import { useNavigate  } from 'react-router-dom';

export default function Navbar({ active }) {

    const [credentials, setCredentials] = useContext(CredentialsContext);
    const [, setTheme] = useContext(ThemeContext);
    
    const navigate = useNavigate();

    function logout() {
        setCredentials(null);
        localStorage.setItem('user', null)
        navigate("/");
    }

    function toggleTheme () {
        if (
            localStorage.getItem('color-theme') === 'light' ||
            (!('color-theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
                setTheme('dark');
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                setTheme('light');
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
    }

    const activeStyles = "block p-2 sm:p-4 text-white bg-blue-700 bg-transparent text-blue-700 bg-transparent";
    const nonActiveStyles = "block p-2 sm:p-4 text-gray-700 hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 hover:text-white text-gray-300 border-gray-700";

  return (
    <nav className="border-gray-200 px-2 sm:px-4 bg-gray-900">
        <div className="flex justify-between items-center w-auto order-1" id="navbar-search">

            <div className='text-white font-medium hidden sm:block'>
                {credentials.username}
                <button
                    className='mx-4 bg-white text-black px-2 py-1 rounded'
                    onClick={toggleTheme}
                >Toggle theme</button>
            </div>

            <ul className="flex flex-row justify-end  items-center p-1-lg border-gray-100 space-x-0 md:space-x-4 mt-0 text-sm font-medium border-0 bg-gray-900">
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
                        className="flex flex-row px-5 py-2 text-blue-600 rounded border-solid border-blue-600 border-[1px] bg-white font-medium text-sm leading-snug uppercase whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
