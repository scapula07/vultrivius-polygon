import React ,{useState} from 'react'
import {FaEthereum} from "react-icons/fa"
import harmony from "../../assests/harmony.png"
import toast, { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers';
import erc721V3xAbi from "../../ContractABI/v3xcollectionAbi.json"
import BridgeABI from "../../ContractABI/BridgeMintNft.json"
import CustodyABI from "../../ContractABI/bridgeCustodialAbi.json"
import Web3Modal from 'web3modal'
import Web3 from 'web3'
// import axios from 'axios';
import { useRecoilValue } from 'recoil'
import { AccountState,PkState } from '../../recoilstate/globalState'
import { harmonyChain,ethTest } from './ChainChange';
import { ethNFT, ethCustody, ethrpc, harBridgeNFT, harCustody, harrpc,harNFT, bridgeWallet } from './configuration';
import detectEthereumProvider from '@metamask/detect-provider';

export const collection_contract_Address="0xd18B5123c38B01935b5cA8F5aBdB3a6C4898bdb5"

export default function Bridge() {
    const privateKey =useRecoilValue(PkState)
    const account=useRecoilValue(AccountState)
    const [sourceNft, getSourceNft] = useState([]);
    const [sourceCustody, getSourceCustody] = useState([]);
    const [selected, setSelected] = useState("Set Network");
    const [chain,setChain]=useState("")
   
  const [id, getId] = useState(0);
  const [customPay, useToken] = React.useState(true);
  const [nfts, setNfts] = useState([]);
    const [sourceRpc, getSourceRpc] = useState([]);
  const [confirmLink, getConfirmLink] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const [erc20Contract, getErc20] = useState([]);
  const [destselected, setDestSelected] = React.useState(new Set(["Set Destination"]));
  const destChain = React.useMemo(() => Array.from(destselected).join(", ").replaceAll("_", " "),[selected])
  
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

        if (connected.chainId == eth) {
            var sNft = ethNFT
            var sCustody = ethCustody
            var sRpc = ethrpc
            // var erc20 = goeErc20
          }
          else {
            var sNft =  harBridgeNFT
            var sCustody = harCustody
            var sRpc = harrpc
            // var erc20 = mumErc20
          }
          const providerEther = new ethers.providers.JsonRpcProvider(sRpc)
          const wallet = new ethers.Wallet(privateKey , providerEther );
          const contract = new ethers.Contract(sNft, erc721V3xAbi , wallet);
          const itemArray = [];
          await contract.walletOfOwner(account).then((value => {
            value.forEach(async(id) => {
                let token = parseInt(id, 16)             
                  const rawUri = contract.tokenURI(token)
                  const Uri = Promise.resolve(rawUri)
                  const getUri = Uri.then(value => {
                    let str = value
                    let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
                    let metadata = fetch(cleanUri).catch(function (error) {
                      console.log(error.toJSON());
                    });
                    return metadata;
                  })
                  getUri.then(value => {
                    let rawImg = value.data.image
                    var name = value.data.name
                    var desc = value.data.description
                    let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
                      let meta = {
                        name: name,
                        img: image,
                        tokenId: token,
                        wallet: account,
                        desc
                      }
                      itemArray.push(meta)
                    })
                  })
                  }))

                  await new Promise(r => setTimeout(r, 2000));
                  console.log("Wallet Refreshed : " + sRpc)
                  getSourceNft(sNft);
                  getSourceCustody(sCustody);
                  getSourceRpc(sRpc);
                  setNfts(itemArray);
      }

      async function initTransfer() {

        if ("eth"== destChain) {
            var dCustody = ethCustody;
            var dRpc = ethrpc;
            var dNFT = ethNFT;
        } else  {
            var dCustody = harCustody;
            var dRpc = harrpc;
           
            var dNFT = harNFT;
          }

          const tokenId = id;
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
          const signer = provider.getSigner();
          const userWallet = await signer.getAddress();
          const ethprovider = new ethers.providers.JsonRpcProvider(dRpc);
          var wallet = new ethers.Wallet(privateKey, ethprovider);
          const sNFTCol = new ethers.Contract(sourceNft, erc721V3xAbi, signer);
        //   const tokenContract = new ethers.Contract(erc20Contract, Erc20ABI, signer);
          const ethNFTCustody = new ethers.Contract(dCustody, CustodyABI, wallet);
          const dNFTCont = new ethers.Contract(dNFT, BridgeABI, wallet);
          handler();
          await new Promise((r) => setTimeout(r, 1000));
          toast('Initializing Transfer...')
          let confirmHolder = await sNFTCol.ownerOf(tokenId);
          let bridgeHolder = await dNFTCont.ownerOf(tokenId).catch(async (error)=> {
            console.log('Bridge NFT not present, Standby...');
            console.log('Bridge NFT Mint at Destination Processing');
          });

          await dNFTCont.ownerOf(tokenId).catch(async (error) => {
            if (error) {
                const rawTxn = await dNFTCont.populateTransaction.bridgeMint(
                  bridgeWallet,
                  tokenId);
                let signedTxn = await wallet.sendTransaction(rawTxn);
                await signedTxn.wait();
                console.log("Bridge NFT Minted at Destination!")
                const nftBridgeApprove = await dNFTCont.approve(dCustody, tokenId);
                await nftBridgeApprove.wait();
                console.log('Transferring NFT to Destination Bridge Custody');
                let gas = { gasLimit: 3000000 };
                const retaindNFT = await ethNFTCustody.retainNew(tokenId, gas);
                await retaindNFT.wait();
                console.log('NFT Successfully Transferred to Destination Custody!');
                var hash = signedTxn.hash;
                console.log("Confirmation TX: " + hash)
                console.log('Verifications completed!, Starting Bridge Transfer...');
            }
            else if (bridgeHolder == bridgeWallet) {
                toast('Confirming Bridge NFT at Destination Custody...');
                const nftBridgeApprove = await dNFTCont.approve(dCustody, tokenId);
                  const approveConfirm = await nftBridgeApprove.wait();
                  console.log(approveConfirm);
                  let gas = { gasLimit: 3000000 };
                  const retaindNFT = await ethNFTCustody.retainNFTN(tokenId, gas);
                  await retaindNFT.wait();
                  toast('NFT Successfully Transferred to Destination Custody!');
                  toast('Verifications completed!, Starting Bridge Transfer...');
                }
                else {
                  console.log("Error submitting transaction");
                }
            })
            if (confirmHolder == userWallet) {
                let getHolder = await ethNFTCustody.holdCustody(tokenId);
                let unListed = "0x0000000000000000000000000000000000000000";
                if (confirmHolder == getHolder.holder) {
                  console.log("User Confirmed, No Updates Needed");
                } else if (getHolder.holder == unListed) {
                  console.log("User Confirmed, No Updates Needed");
                } else {
                  let updOwner = await ethNFTCustody.updateOwner(tokenId, userWallet);
                  let receipt = await updOwner.wait();
                  if (receipt) {
                    console.log("Holder Address Updated to: " + userWallet);
                  } else {
                    console.log("Error submitting transaction");
                  }
                }
             }
             toast("Verifying Details...")
             await new Promise((r) => setTimeout(r, 4000));
             toast("Verified, Bridge Initialized...")
             await new Promise((r) => setTimeout(r, 4000));
             toast("Please Approve NFT Transfer to Bridge.")
             const sNFTCustody = new ethers.Contract(sourceCustody, CustodyABI, signer);
             const tx1 = await sNFTCol.setApprovalForAll(sourceCustody, true);
             await tx1.wait();
             toast("Approval Received! Processing...")
             await new Promise((r) => setTimeout(r, 4000));
             toast("Please Execute NFT Transfer to Bridge.")

           
                const costNative = await sNFTCustody.costNative();
                let options = { gasLimit: 3000000, value: costNative };
                const tx3 = await sNFTCustody.retainNFTN(tokenId, options);
                await tx3.wait();
                toast("NFT has been transferred to Bridge!!" )
                toast("In Transit to destination...") 
                await new Promise((r) => setTimeout(r, 4000));

                toast('Transferring to Destination Via: '+ dRpc);
                let gas = { gasLimit: 3000000 };
                let rawTxn = await ethNFTCustody.populateTransaction.releaseNFT(
                  tokenId,
                  userWallet,
                  gas
                );
                let signedTxn = await wallet.sendTransaction(rawTxn);
                let receipt = await signedTxn.wait();
                if (receipt) {
                
              toast('Transfer has been completed!')
               
                //   var confirmOut4 =  explorer + signedTxn.hash
                //   var confirmOut5 = 'Transaction Info'
                  await new Promise((r) => setTimeout(r, 4000));
                  
                } else {
                  console.log("Error submitting transaction");
                }
                // getConfirmLink(confirmOut4);
                setSource();
      }
    
  return (
    <div className='pt-32 px-24'>
        <div>
            <main className='stake-bg py-6 rounded-lg px-4 shadow-lg'>
                <h5 className='text-xl font-light'>1.Transfer From</h5>
                <div className='px-8'>
                    <h5 className='text-md font-semibold'>Source</h5>

                    <select name="cars" id="cars" className='text-lg  mt-2 text-slate-200 w-full outline-none text-center bg-black py-3 px-8 rounded-lg'
                     onChange={(e)=>setChain(e.target.value)}
                    >
                        <option value="one" className='outline-none'>
                            Harmony
                        </option>
                        <option value="eth" className='outline-none flex'>
                           Ethereum
                        </option>
                  </select> 

                </div>

                <main className='pt-8 px-8'>
                    <button className='btn-color w-full text-black rounded-md font-semibold py-2 '
                     onClick={setSource}
                    >Retrieve Assets</button>
                </main>
            </main>

           <main className='stake-bg py-6 rounded-lg px-4 shadow-lg mt-6'>
                <h5 className='text-xl font-light'>2.Select NFT to transfer </h5>
                
                 <div className="mt-5 lg:mt-[33px] space-y-10 md:space-y-0 md:gap-5 lg:gap-6 md:grid grid-cols-2 lg:grid-cols-3">
                    {nfts.map((nft)=>{
                        return(
                           <div className="">
                             <img  src={nft.img}/>
                           </div>
                        )
                    })}
                 </div>

                
            </main> 


            <main className='stake-bg py-6 rounded-lg px-4 shadow-lg  mt-6'>
                <h5 className='text-xl font-light'>3.Transfer to</h5>
                <div className='px-8'>
                    <h5 className='text-md font-semibold'>Destination</h5>

                    <select name="cars" id="cars" className='text-lg  mt-2 text-slate-200 w-full outline-none text-center bg-black py-3 px-8 rounded-lg'
                       onChange={(e)=>setDestSelected(e.target.value)}
                    >
                        <option value="one" className='outline-none'>
                            Harmony
                        </option>
                        <option value="eth" className='outline-none flex'>
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
                    <button className='btn-color w-full text-black rounded-md font-semibold py-2'
                        onClick={initTransfer}
                    >Transfer</button>
                </main>
            </main> 
        </div>
    </div>
  )  
}
