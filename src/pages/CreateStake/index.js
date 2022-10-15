import React from 'react'
import Web3 from "web3";
import stakingAbi from "../../ContractABI/v3xcollectionAbi.json"

import {AiOutlineCloseCircle } from "react-icons/ai"

export const staking_contract_Address ="0x096B2b17fefce70eB138d96bfF4529032534fC3b"

export default function CreateStake() {
  const web3 = new Web3(window.ethereum)
  const stakingContract = new web3.eth.Contract(
    stakingAbi,
    staking_contract_Address
 )
    
  return (
    <>
    <div className='pt-20 px-52'>
        <h5 className='text-xl font-semibold'>Create Pool</h5>
       <main className='pt-10'>
           <div className='flex flex-col space-y-2'>
             <label className="text-slate-400">Pool ID*</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm ' 
                placeholder='Item Name'
             />
           </div>
           <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">End Date*</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm ' 
                placeholder='DD/MM/YYY'
             />
           </div>

           <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Enter amount to stake*</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm ' 
                placeholder='Item Name'
             />
           </div>

           <div className='flex space-x-4 pt-4'>
               <input type="checkbox" className='border'/>
               <label className='text-slate-400 text-sm'> Transfer copyright when purchased?</label>
         </div>

         
       </main>
       <main className='pt-6 pb-20'>
       <button className='btn-color text-black text-sm w-full py-2 rounded-md '>Create pool</button>
      
       </main>
          
    </div>
     
    
    </>
  )
}
