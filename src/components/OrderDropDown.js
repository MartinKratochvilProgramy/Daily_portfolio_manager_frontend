import React, { useState, useEffect } from 'react'

export default function OrderDropDown() {

  const [display, setDisplay] = useState(false);

  let displayStyle;
  display ? displayStyle = {display: "block"} : displayStyle = {display: "none"}

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      setDisplay(false);
    });
  
  }, [])


  return (
    <>
    
    <button 
      id="dropdownDefault" 
      onClick={() => setDisplay(!display)}
      data-dropdown-toggle="dropdown" 
      className="relative flex flex-row justify-center items-center px-4 py-1 text-white bg-blue-600 font-medium text-xs leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" 
      type="button">
        Sort
        <svg 
          className="ml-2 w-4 h-4" 
          aria-hidden="true" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 9l-7 7-7-7">
            </path>
        </svg>
    
      <div 
        id="dropdown" 
        className="z-10 absolute mt-2 top-[100%] left-0 w-full bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700"
        style={displayStyle}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
            <li>
              <div href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Oldest</div>
            </li>
            <li>
              <div href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Newest</div>
            </li>
          </ul>
      </div>
    </button>
  </>
  )
}

