import React, { useState, useContext } from "react"
import DeleteStockModal from "./DeleteStockModal";
import { CurrencyContext } from '../App';

export default function Stock({ stock, deleteStock }) {

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const [currency, ] = useContext(CurrencyContext);

  function getAvgPercentageReturn() {
    let relativeChanges = 0;
    let amounts = 0;

    // calculate weighted average for gain of each purchase
    for (const purchase of stock.purchaseHistory) {
      const relativeChange = (stock.prevClose / purchase.currentPrice - 1) * 100 * purchase.amount;
      relativeChanges += relativeChange;
      amounts += purchase.amount;
    }

    const avgPercentageChange = (relativeChanges / amounts).toFixed(1);

    return avgPercentageChange;
  }

  const avgPercentageChange = getAvgPercentageReturn();

  return (
      <>
        <button 
          className="bg-white dark:border-none border-blue-600 border-solid border-[1px] rounded px-2 md:px-4 py-3 my-2 text-black font-medium text-xs sm:text-sm leading-snug uppercase hover:shadow-xl focus:outline-none focus:ring-0 active:bg-blue-100 transition duration-150 ease-in-out dark:hover:bg-blue-100"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex flex-row items-center">

            <div className="w-full h-full flex items-start">
              <div className="min-w-[58px] md:min-w-[68px] font-bold text-justify">{stock.ticker}</div>
              <div className="ml-1 md:ml-6 w-2 md:w-10">{stock.amount}</div>
              <div className="ml-1 md:ml-6 w-[48px] md:w-24">{stock.prevClose.toFixed(1)} <span className="hidden md:inline-block">{currency}</span></div>
              <div className="ml-1 md:ml-6">
                {avgPercentageChange >= 0 ? 
                  <div className="text-green-600">{"+" + avgPercentageChange + "%"}</div> 
                : 
                  <div className="text-red-600">{avgPercentageChange + "%"}</div> 
                }
              </div>
            </div>
            <div onClick={() => {setShowDeleteModal(true)}} id={stock.ticker} className="rounded-full p-1 transition duration-150 hover:bg-red-100 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col items-start justify-start space-y-2">
            {expanded ? 
              <>
                <hr className="bg-gray-300 w-full h-[1px] mt-1 border-0" />
                <div className="flex flex-row mt-4">
                  <div className="min-w-[58px] md:min-w-[62px] font-bold text-justify">DATE</div>
                  <div className="ml-1 md:ml-6 w-12 md:w-10 flex justify-center font-bold">AMOUNT</div>
                  <div className="ml-2 md:ml-6 w-12 md:w-24 flex justify-center font-bold">PRICE</div>
                </div> 
              </>
            : 
              null}
            <div className="">
            {expanded ? stock.purchaseHistory.map((purchase) => {
              return (
                <div key={purchase._id} className="flex flex-row">
                    <div className="min-w-[58px] md:min-w-[62px] flex justify-start">
                      {purchase.date}
                    </div>
                    <div className="ml-1 md:ml-4 w-12 md:w-10 flex justify-center">
                      {purchase.amount}
                    </div>
                    <div className="ml-1 md:ml-6 w-[48px] md:w-24 flex justify-center">
                      {purchase.currentPrice}
                    </div>
                  </div>
              )
            }) 
            : null}
            </div>
          </div>
        </button>
        {showDeleteModal ? <DeleteStockModal setShowDeleteModal={setShowDeleteModal} deleteStock={deleteStock} stock={stock}/> : null}
      </>
  )
}
