import React ,{useState} from 'react'
import {FaEthereum} from "react-icons/fa"
import harmony from "../../assests/harmony.png"

import erc721V3xAbi from "../../ContractABI/v3xcollectionAbi.json"
import Web3Modal from 'web3modal'
import Web3 from 'web3'
// import axios from 'axios';
import { useRecoilValue } from 'recoil'
import { AccountState,PkState } from '../../recoilstate/globalState'
import { harmonyChain,ethTest } from './ChainChange';
import { ethNFT, ethCustody, ethrpc, harBridgeNFT, harCustody, harrpc} from './configuration';
import detectEthereumProvider from '@metamask/detect-provider';

export const collection_contract_Address="0xd18B5123c38B01935b5cA8F5aBdB3a6C4898bdb5"

export default function Bridge() {
    const privateKey =useRecoilValue(PkState)
    const account=useRecoilValue(AccountState)
    const [sourceNft, getSourceNft] = useState([]);
    const [sourceCustody, getSourceCustody] = useState([]);
    const [selected, setSelected] = useState("Set Network");
    const [chain,setChain]=useState("")

    var web3 = null;
    async function sourceChain() {
       
        if (chain == "harmony") {
            harmonyChain();
            var sNft =  harBridgeNFT
            var sCustody = harCustody
      
        }
       
        else {
          ethTest();
          var sNft = ethNFT
          var sCustody = ethCustody
        }
       
        getSourceNft(sNft);
        getSourceCustody(sCustody);
      
      }

      async function setSource(){
        const web3Modal = new Web3Modal();
        var provider = await web3Modal.connect();
        web3 = new Web3(provider);

        var eth = "0x5";
        var harmony = "1666700000";
        const connected = await detectEthereumProvider();
      }
    
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
                    <button className='btn-color w-full text-black rounded-md font-semibold py-2 '
                   
                    >Retrieve Assets</button>
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
