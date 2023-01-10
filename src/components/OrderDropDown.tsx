import React, { useState } from 'react'

interface Props {
  values: string[];
  handleClick: (value: string) => void;
  theme: "light" | "dark";
}

export const OrderDropDown: React.FC<Props> = ({ values, handleClick, theme }) => {

  const [display, setDisplay] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(values[0])

  
  function handleDropdownClick (e: React.MouseEvent) {
    if (!display) {
      document.addEventListener('click', () => setDisplay(false));
      e.stopPropagation();
    } else {
      document.removeEventListener('click', () => setDisplay(false));
      e.stopPropagation();
    }
    setDisplay(!display);
  }
  
  function handleMenuClick (value: string) {
    handleClick(value);
    setDropdownValue(value);
  }
  
  const displayStyle = display ? { display: "block" } : { display: "none" };
  const themeStyles = theme === "light" ? "text-black bg-white bg-gray-100" : "text-white bg-blue-600 hover:bg-blue-700 hover:text-white focus:bg-blue-700 active:bg-blue-800";

  var longestValue = [...values].sort(
    function (a, b) {
        return b.length - a.length;
    }
  )[0];

  const minW = longestValue.length > 5 ? 120 : 60;

  return (
    <>
      <button
        id="dropdownDefault"
        onClick={(e) => handleDropdownClick(e)}
        data-dropdown-toggle="dropdown"
        className={`relative flex flex-row w-[${minW}px] justify-center items-center py-1 font-medium text-[12px] xsm:text-xs leading-snug rounded whitespace-nowrap shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${themeStyles}`}
        type="button">
        {dropdownValue}
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
          className="z-10 absolute mt-2 top-[100%] left-0 w-full bg-white rounded-[3px] divide-y divide-gray-100 shadow-2xl"
          style={displayStyle}
        >
          <ul className="text-[12px] xsm:text-xs text-gray-700" aria-labelledby="dropdownDefault">
            {values.map((value: string) => {
              return (
                <li key={value}>
                  <div
                    onClick={() => handleMenuClick(value)}
                    className="border-b block py-2 hover:bg-gray-100">
                    {value}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </button>
    </>
  )
}

