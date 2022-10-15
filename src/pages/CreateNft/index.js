import React ,{useState}from 'react'
import FileUpload from './fileUpload'
import { HttpProvider, WSProvider } from '@harmony-js/network'
import { PrivateKey, HarmonyShards, HARMONY_RPC_SHARD_0_URL, HARMONY_RPC_WS,HRC721  } from 'harmony-marketplace-sdk'
import marketPlaceAbi from "../../ContractABI/marketplaceAbi.json"
import { useRecoilValue } from 'recoil'
import "./createnft.css"
import { AccountState,PkState } from '../../recoilstate/globalState'
import Web3 from "web3";
import erc721V3xAbi from "../../ContractABI/v3xcollectionAbi.json"
import Modal from '../../components/Modal'
import {AiOutlineCloseCircle } from "react-icons/ai"

export const marketplace_contract_Address="0xdEa8ed1C1Fc91Fbd4391a55e294C33De6afF702a"



export default function CreateNft() {

    const web3 = new Web3(window.ethereum)
    const privateKey =useRecoilValue(PkState)
    const account=useRecoilValue(AccountState)
    const pk = new PrivateKey(new HttpProvider('https://api.s0.b.hmny.io'), privateKey)

    
    const marketPlaceContract = new web3.eth.Contract(
      marketPlaceAbi,
      marketplace_contract_Address
   )
    const [fileImage, setFileImage] = useState({
      src: "",
      alt: "upload an image",
    });
  const [tokenid,setID]=useState("")
  const [itemName,setName]=useState("")
  const [collectionName,setCName]=useState("")
  const [price,setPrice]=useState("")
  const [contractAddress,setAddress]=useState("")
  const [itemDescription,setDescription]=useState("")
  const [trigger,setTrigger] =useState(false)
  const [supply,setSupply] =useState("")
 
  const listNft=async()=>{

  }

  const mintNftItem =async()=>{

   const NftCollectionContract = new HRC721(marketplace_contract_Address,erc721V3xAbi,pk)
  
   

   }

    console.log(marketPlaceContract,"mmmmmm")
  return (
       <>
        <div className='pt-20 px-28'>
        <h5 className='text-xl font-semibold'>List an NFT</h5>
        <main className='pt-10'>
        <h5 className='text-sm text-slate-400 pb-4'>Upload file</h5>
       <FileUpload fileImage={fileImage} setFileImage={setFileImage}/>
       </main>
       <main className='pt-8'>
          <div className='flex flex-col space-y-2'>
             <label className="text-slate-400">Name*</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Item Name'
                onChange={(e)=>setName(e.target.value)}
             />
          </div>

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">External Link</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Your site'

             />
          </div>

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Item Description*</label>
             <textarea 
               className='input-color py-2 h-32 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Item Name'
                onChange={(e)=>setDescription(e.target.value)}
             />
          </div>
          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Collection Name</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Your collection Name'
                onChange={(e)=>setCName(e.target.value)}
             />
          </div>

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Collection Contract Address</label>
             <main className='input-color flex items-center justify-between px-4 '>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm w-10/12 outline-none' 
                placeholder='Contract address'
                onChange={(e)=>setAddress(e.target.value)}
              />
              {contractAddress.length>1&&
               <button className='text-black btn-color text-xs rounded-md py-1 px-1'
                onClick={()=>setTrigger(true)}
               >Mint item</button>
              }
             </main>
          </div>
          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Token Id</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Token ID'
                onChange={(e)=>setID(e.target.value)}
             />
          </div>

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Buy Now price</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Enter Amount in ONE or VNE'
                onChange={(e)=>setPrice(e.target.value)}
             />
          </div>

          <div className='flex space-x-4 pt-4'>
               <input type="checkbox" className='border'/>
               <label className='text-slate-400 text-sm'> Transfer copyright when purchased?</label>
         </div>

         
       </main>
       <main className='pt-6 pb-20'>
       <button className='btn-color text-black text-sm w-full py-2 rounded-md '>List item</button>
      
       </main>
          
     </div>
        <Modal trigger={trigger} cname="h-56 w-1/5 shadow rounded-lg py-4 px-8" >
         <main className='flex justify-end'>
           <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
         </main>

          <main className='flex items-center pt-4'>
            
             <input className='stake-bg w-full text-xs px-4 py-1 outline-none'
              placeholder='Supply* '
             />
          </main>
          <main className='pt-10'>
           <button className='btn-color text-sm py-1 w-full text-black'
           onClick={mintNftItem}
           >
            Mint
           </button>
          </main>
          

        </Modal>
     </>
  )
}
