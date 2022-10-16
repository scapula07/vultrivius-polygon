import React,{useState} from 'react'
import { useLocation,useParams} from "react-router-dom";
import avater from "../../assests/male-avater.png"
import viewIcon from  "../../assests/view-icon.png"
import favorite from "../../assests/favorite.png"
import harmony from "../../assests/harmony.png"
import ellipse from "../../assests/Ellipse.png"
import metadata from "../../assests/metadata.png"
import ipfs from "../../assests/ipfs.png"
import NftHistory from './nft-history';
import { HttpProvider} from '@harmony-js/network'
import { PrivateKey,HRC721  } from 'harmony-marketplace-sdk'
import marketPlaceAbi from "../../ContractABI/marketplaceAbi.json"
import { AccountState,PkState } from '../../recoilstate/globalState'
import { useRecoilValue } from 'recoil'

const { Units, Unit ,toWei} = require('@harmony-js/utils');

export const marketplace_contract_Address="0x052846593585a705c40278C0c1D096926d888217"
export const collection_contract_Address="0xd18B5123c38B01935b5cA8F5aBdB3a6C4898bdb5"

export default function Item() {

    
   const privateKey =useRecoilValue(PkState)
   const account=useRecoilValue(AccountState)
   const pk = new PrivateKey(new HttpProvider('https://api.s0.b.hmny.io'), privateKey,2)

   console.log(pk)
 
    const location =useLocation()
    const [locationState,setlocationState] = useState(location.state)
  
  return (
    <div className='pt-24'>
        <div className='flex w-full'>
           <main className='w-1/4 flex justify-center'>
             <img src={locationState.item?.imgUrl} className="h-64 w-3/4" />
           </main>
           <main className='w-3/4 flex flex-col'>
             <div>
              <h5 className='text-xs text-slate-300'>{locationState.item?.title}</h5>
              <h5 className='text-xl font-semibold'>{`${locationState.item?.title} #1`}</h5>
             </div>
             <div className='pt-4 '>
                <h5 className='text-xs text-slate-400'>Created by</h5>
                <main className='flex items-center space-x-6 pt-2'>
                <h5 className='flex items-center space-x-2'> <img src={avater} className="w-4 h-4" /> <span className='text-xs font-light text-slate-400'>{locationState.item?.owner.slice(0,11)+"..."}</span></h5>
                <h5 className='flex items-center space-x-2'> <img src={viewIcon} className="w-4 h-4"/> <span className='text-xs font-light text-slate-400'>{"31 Views"}</span></h5>
                <h5 className='flex items-center space-x-2'> <img src={favorite} className="w-4 h-4"/> <span className='text-xs font-light text-slate-400'>1 Favorite</span></h5>
                </main>
             </div>
             <div className='flex flex-col pt-4'>
                <h5 className='text-xs text-slate-400'>Current price</h5>
                <main className='flex items-center space-x-2'>
                    
                     <h5 className='text-lg flex space-x-1 items-center font-semibold'><img src={harmony} className="w-4 h-4"/> <span>{locationState.item?.price}</span></h5>
                     <h5 className='text-xs text-slate-400'>${locationState.item?.price *0.0023}</h5>
                </main>

             </div>
             <div className='flex space-x-4 pt-8'>
                <button className='btn-color text-black text-xs w-24 py-1'>Buy Now</button>
                <button className='flex items-center w-32 py-1 rounded-full border border-slate-800 justify-center text-xs space-x-1'><img src={ellipse} className="w-2 w-2"/> <span>View AR</span></button>

             </div>
           </main>
        </div>
        

        <div className='flex space-x-4 w-full pt-12 px-8'>
            <div className='w-1/2'>
                 <h5 className='border-b text-xl'>Description</h5>
                 <p className='text-slate-400 text-sm pt-4'>{locationState.item?.description}</p>

                 <main className='pt-4'>
                    <h5 className='text-slate-400 text-xs'>Contract Address: {"0x53634...536"}</h5>
                    <h5 className='text-slate-400 text-xs'>Token standard: ERC721</h5>
                    <h5 className='text-slate-400 text-xs'>Blockchain: Harmony </h5>
                 </main>

                 <main className='py-4'>
                    <h5 className='border-b text-xl'>Details</h5>
                    <main className='pt-4'>
                    <h5 className='flex space-x-2 text-slate-400 items-center text-xs'><img src={metadata} className="w-2 h-2"/> <span>View on Explorer</span></h5>
                    <h5 className='flex space-x-2 text-slate-400 items-center text-xs'><img src={metadata} className="w-2 h-2"/><span>View metadata</span></h5>
                    <h5 className='flex space-x-2  text-slate-400 items-center text-xs'><img src={ipfs } className="w-2 h-2"/><span>View on IPFS</span></h5>
                    </main>
                 </main>
            </div>
            <div className='w-1/2 px-8 '>
              <h5 className='text-sm text-slate-400'>Tags</h5>
              <main className='flex space-x-4 pt-2'>
                <button className='text-xs border border-slate-800 py-1 px-2 text-slate-400 rounded-md'>Architecture</button>
                <button className='text-xs border border-slate-800 py-1 px-2 text-slate-400 rounded-md'>Skyscrapper</button>
                <button className='text-xs border border-slate-800 py-1 px-2 text-slate-400 rounded-md'>Buildings</button>

              </main>
            </div>
        </div>
        <div className='px-8'>
           <NftHistory />
        </div>
         
    </div>
  )
}
