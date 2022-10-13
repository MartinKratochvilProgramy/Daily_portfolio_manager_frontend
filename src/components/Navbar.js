import React, { useContext } from 'react';
import { CredentialsContext } from '../App';
import { useNavigate  } from 'react-router-dom';

export default function Navbar({ active }) {

    const [, setCredentials] = useContext(CredentialsContext);
    
    const navigate = useNavigate();

    function logout() {
        setCredentials(null);
        localStorage.setItem('user', null)
        navigate("/");
    }

    const activeStyles = "block p-2 sm:p-4 text-white bg-blue-700 rounded bg-transparent text-blue-700 dark:text-white";
    const nonActiveStyles = "block p-2 sm:p-4 text-gray-700 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700";

  return (
    <div>
        <nav className="bg-white border-gray-200 px-2 sm:px-4 rounded dark:bg-gray-900">
            <div className="flex justify-end items-center w-auto order-1" id="navbar-search">

                <ul className="flex flex-row justify-end  items-center p-1 rounded-lg border-gray-100 space-x-0 md:space-x-4 mt-0 text-sm font-medium border-0 bg-white dark:bg-gray-900 dark:border-gray-700">
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
                            className="flex flex-row px-5 py-2 text-blue-600 border-solid border-blue-600 border-[1px] bg-white font-medium text-sm leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={logout}
                            >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}
