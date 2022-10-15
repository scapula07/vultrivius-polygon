import { HttpProvider, WSProvider } from '@harmony-js/network'
import { PrivateKey,  Key,HarmonyShards, HARMONY_RPC_SHARD_0_URL, HARMONY_RPC_WS,HRC721  } from 'harmony-marketplace-sdk'
import marketPlaceAbi from "./ContractABI/marketplaceAbi.json"



const marketplace_contract_Address="0xdEa8ed1C1Fc91Fbd4391a55e294C33De6afF702a"

export const connectHarmony =async(privateKey)=>{
    console.log(privateKey,"harmonyyy")
    
    try{
    // const pk = new PrivateKey(new HttpProvider(HARMONY_RPC_SHARD_0_URL), privateKey)
       const pk = new PrivateKey(new HttpProvider('https://api.s0.b.hmny.io'), privateKey)
      
     console.log(pk)
   
    return pk
    }catch(e){
        console.log(e)
    }
}


//export const marketPlaceContract = new HRC721(marketplace_contract_Address, marketPlaceAbi,pk)
