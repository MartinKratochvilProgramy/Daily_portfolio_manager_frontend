import React from 'react';

interface Props {
  setUserCurrency: (currency: "USD" | "EUR" | "CZK") => void;
  register: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PickCurrencyForm: React.FC<Props> = ({ setUserCurrency, register }) => {

  function handleChange(val: string): void {
    if (val === "USD" || val === "EUR" || val === "CZK") {
      setUserCurrency(val);
    }
  }

  return (
    <form onSubmit={(e) => register(e)}>
      <div className='flex justify-center flex-col items-center'>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">
          <h1 className='text-black text-3xl font-semibold mt-2 py-8 md:py-16 mb-0'>
            PICK YOUR <span className='text-blue-600'>PREFERED</span>
            <br />
            CURRENCY<span className='text-blue-600'></span>
          </h1>
        </label>

        <select
          onChange={(event) => handleChange(event.target.value)}
          id="currency"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm max-w-[250px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
          <option defaultValue="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CZK">CZK</option>
        </select>

        <button
          type='submit'
          className="inline-block px-7 py-3 my-8 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Done
        </button>
      </div>
    </form>

  )
}
