import React from 'react'
import {FaEthereum} from "react-icons/fa"
import harmony from "../../assests/harmony.png"
export default function Bridge() {
  return (
    <div className='pt-32 px-24'>
        <div>
            <main className='stake-bg py-6 rounded-lg px-4 shadow-lg'>
                <h5 className='text-xl font-light'>1.Transfer From</h5>
                <div className='px-8'>
                    <h5 className='text-md font-semibold'>Source</h5>

                    <select name="cars" id="cars" className='text-lg  mt-2 text-slate-200 w-full outline-none text-center bg-black py-3 px-8 rounded-lg'>
                        <option value="one" className='outline-none'>
                            Harmony
                        </option>
                        <option value="v3t" className='outline-none flex'>
                           Ethereum
                        </option>
                  </select> 

                </div>

                <main className='pt-8 px-8'>
                    <button className='btn-color w-full text-black rounded-md font-semibold py-2 '>Retrieve Assets</button>
                </main>
            </main>

           <main className='stake-bg py-6 rounded-lg px-4 shadow-lg mt-6'>
                <h5 className='text-xl font-light'>2.Select NFT to transfer </h5>
                
                 

                
            </main> 


            <main className='stake-bg py-6 rounded-lg px-4 shadow-lg  mt-6'>
                <h5 className='text-xl font-light'>3.Transfer to</h5>
                <div className='px-8'>
                    <h5 className='text-md font-semibold'>Destination</h5>

                    <select name="cars" id="cars" className='text-lg  mt-2 text-slate-200 w-full outline-none text-center bg-black py-3 px-8 rounded-lg'>
                        <option value="one" className='outline-none'>
                            Harmony
                        </option>
                        <option value="v3t" className='outline-none flex'>
                           Ethereum
                        </option>
                  </select> 

                </div>

              

               
            </main> 

            <main className='stake-bg py-6 rounded-lg px-4 shadow-lg mt-6'>
                <h5 className='text-lg'>4.Review Transfer details and confirm</h5>
                <div className='h-14'>
                  

                </div>

                <main className='pt-8'>
                    <button className='btn-color w-full text-black rounded-md font-semibold py-2'>Transfer</button>
                </main>
            </main> 
        </div>
    </div>
  )  
}
