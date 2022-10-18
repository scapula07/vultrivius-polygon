import React from 'react'

export default function Wallet() {
  return (
    <div className='pt-4 text-white flex justify-center'>
        <div className='stake-bg flex w-1/2 items-center rounded-lg h-32 flex-col'>
            <h5 className='text-slate-400'>Total Balance</h5>
            <h5 className='text-lg font-semibold'>{"0.0 V3T"}</h5>

            <div className='flex items-center justify-center space-x-6 pt-4'>
                <button className='btn-color rounded-sm text-black px-2 py-1 text-xs font-semibold'>Add funds</button>
                <button className='btn-color rounded-sm text-black px-2 py-1 text-xs font-semibold'>Send</button>
            </div>

        </div>
    </div>
  )
}
