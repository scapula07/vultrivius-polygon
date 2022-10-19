import { type } from "os-browserify"
import { useState } from "react";
import sendIcon from "../../assests/icon/arrow-right-up.png"
import receiveIcon from "../../assests/icon/receive.png"
import AddFundsModal from "../../components/modals/add-funds-modal"

export default function Wallet() {

  const [trigger, setTrigger] = useState(true);
  const transactions = [
    {
      type: 'send',
      date: 'dec 20,2022 18:19:38PM',
      amount: "300"
    },
    {
      type: 'receive',
      date: 'dec 20,2022 18:19:38PM',
      amount: "300"
    },
  ]

  const handleShowAddFundsModal = () => setTrigger(true)
  return (
    <section>
      <AddFundsModal {...{ trigger, setTrigger }} />
      <div className='pt-4  text-white flex justify-center'>
        <div className='stake-bg flex w-1/2 items-center rounded-lg flex-col py-8'>
          <h5 className='text-slate-400'>Total Balance</h5>
          <h5 className='text-lg font-semibold'>{"0.0 V3T"}</h5>

          <div className='flex items-center justify-center space-x-6 pt-4'>
            <button onClick={handleShowAddFundsModal} className='btn-color rounded-sm text-black px-2 py-1 text-xs font-semibold'>Add funds</button>
            <button className='btn-color rounded-sm text-black px-2 py-1 text-xs font-semibold'>Send</button>
          </div>

        </div>
      </div>

      {/* transactions */}
      <div className="mt-8">
        <h4 className="capitalize font-medium text-xl leading-[23px]">Transactions</h4>
        <div className="">
          {
            transactions.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-[#353945]">
                <div className="flex items-center space-x-3 py-[19px]">
                  <img src={item.type.toLowerCase() === 'send' ? sendIcon : receiveIcon} alt="" />
                  <div className="">
                    <p className='capitalize text-[#F5F5F5] text-2xl leading-7'>{item.type}</p>
                    <p className='capitalize text-lightdark text-sm leading-4 mt-[6px]'>{item.date}</p>
                  </div>
                </div>
                <div>
                  <p className='capitalize text-[#F5F5F5] text-2xl leading-7'>{item.type.toLowerCase() === 'send' ? '-' : null}{item.amount}ONE</p>
                  <p className='capitalize text-lightdark text-sm leading-4 mt-[6px] flex justify-end'>{item.amount}ONE</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
