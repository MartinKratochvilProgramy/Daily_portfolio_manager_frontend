import React, { useState } from 'react'

interface Props {
  sortStocks: (value: string) => void;
}

export const OrderDropDown: React.FC<Props> = ({ sortStocks }) => {

  const [display, setDisplay] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Newest")

  let displayStyle;
  display ? displayStyle = { display: "block" } : displayStyle = { display: "none" }

  function handleClick(value: string) {
    sortStocks(value);
    setDropdownValue(value);
  }

  return (
    <>
      <button
        id="dropdownDefault"
        onClick={() => setDisplay(!display)}
        data-dropdown-toggle="dropdown"
        className="relative flex flex-row min-w-[105px] xsm:min-w-[124px] justify-center items-center py-1 text-white bg-blue-600 font-medium text-[12px] xsm:text-xs leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <li>
              <div
                onClick={() => handleClick("Newest")}
                className="border-b block py-2 hover:bg-gray-100">
                Newest
              </div>
            </li>
            <li>
              <div
                onClick={() => handleClick("Oldest")}
                className="border-b block py-2 hover:bg-gray-100">
                Oldest
              </div>
            </li>
            <li>
              <div
                onClick={() => handleClick("Value high")}
                className="border-b block py-2 hover:bg-gray-100">
                Value high
              </div>
            </li>
            <li>
              <div
                onClick={() => handleClick("Value low")}
                className="border-b block py-2 hover:bg-gray-100">
                Value low
              </div>
            </li>
            <li>
              <div
                onClick={() => handleClick("Change high")}
                className="border-b block py-2 hover:bg-gray-100">
                Change high
              </div>
            </li>
            <li>
              <div
                onClick={() => handleClick("Change low")}
                className="border-b block py-2 hover:bg-gray-100">
                Change low
              </div>
            </li>
            <li>
              <div
                onClick={() => handleClick("A-Z")}
                className="border-b block py-2 hover:bg-gray-100">
                A-Z
              </div>
            </li>
            <li>
              <div
                onClick={() => handleClick("Z-A")}
                className="block py-2 hover:bg-gray-100">
                Z-A
              </div>
            </li>
          </ul>
        </div>
      </button>
    </>
  )
}

