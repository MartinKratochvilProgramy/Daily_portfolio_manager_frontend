import React, { useState, useContext } from "react"
import { CurrencyContext } from '../App';
import { DeleteStockModal } from "./DeleteStockModal";
import { PurchaseInterface } from "../types/stock";
import { StockInterface } from "../types/stock";

interface Props {
  stock: StockInterface;
  deleteStock: (ticker: string, amount: number) => void;
}

export const Stock: React.FC<Props> = ({ stock, deleteStock }) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const { currency } = useContext(CurrencyContext);

  return (
    <>
      <button
        className="bg-white dark:border-none border-blue-600 border-solid border-[1px] rounded px-2 sm:px-6 md:px-8 py-3 my-2 text-black font-medium text-xs sm:text-sm leading-snug uppercase hover:shadow-xl transition duration-150 ease-in-out"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-row items-center">

          <div className="w-full h-full flex items-start">
            <div className="w-[52px] xsm:w-24 md:w-[81px] font-bold text-justify">{stock.ticker}</div>
            <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center">{stock.amount}</div>
            <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center">{stock.prevClose.toFixed(1)} <span className="ml-1 hidden md:inline-block">{currency}</span></div>
            <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center">
              {stock.avgPercentageChange >= 0 ?
                <div className="text-green-600">{"+" + stock.avgPercentageChange + "%"}</div>
                :
                <div className="text-red-600">{stock.avgPercentageChange + "%"}</div>
              }
            </div>
          </div>
          <div onClick={() => { setShowDeleteModal(true) }} id={stock.ticker} className="rounded-full p-1 transition duration-150 hover:bg-red-100 ease-in-out">
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
                <div className="w-[52px] xsm:w-24 md:w-[81px] font-bold text-justify">DATE</div>
                <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center font-bold">AMOUNT</div>
                <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center font-bold">PRICE</div>
                <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center font-bold">CHANGE</div>
              </div>
            </>
            :
            null}
          <div className="">
            {expanded ? stock.purchaseHistory.map((purchase: PurchaseInterface) => {

              const [year, month, day] = purchase.date.split("-");

              return (
                <div key={purchase._id} className="flex flex-row">
                  <div className="w-[52px] xsm:w-24 md:w-[81px] flex justify-start tabular-nums">
                    {day}-{month}-{year.substring(2, 4)}
                  </div>
                  <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center">
                    {purchase.amount}
                  </div>
                  <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center">
                    {purchase.currentPrice}
                  </div>
                  <div className="w-14 xsm:w-[76px] md:w-24 flex justify-center">
                    {purchase.relativeChange >= 0 ?
                      <div className="text-green-600">{"+" + purchase.relativeChange.toFixed(1) + "%"}</div>
                      :
                      <div className="text-red-600">{purchase.relativeChange.toFixed(1) + "%"}</div>
                    }
                  </div>
                </div>
              )
            })
              : null}
          </div>
        </div>
      </button>
      {showDeleteModal ? <DeleteStockModal setShowDeleteModal={setShowDeleteModal} deleteStock={deleteStock} stock={stock} /> : null}
    </>
  )
}
