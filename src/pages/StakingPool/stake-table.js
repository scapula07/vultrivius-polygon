import React ,{useState,useEffect} from 'react'
import { collection, onSnapshot, doc,getDocs,query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase'
import ellipse from "../../assests/poolEllipse.png"
import Modal from '../../components/Modal'
import {AiOutlineCloseCircle} from "react-icons/ai"
import { AccountState,PkState } from '../../recoilstate/globalState'
import { useRecoilValue } from 'recoil'
export default function StakeTable() {
    const [pool,setPool]=useState([])
    const [stake,setStake]=useState({})
    const [trigger,setTrigger] =useState(false)
    const account=useRecoilValue(AccountState)
    useEffect(()=>{
        const getStake=async()=>{
            const q = query(collection(db, "pools"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const stakes=[]
            // console.log(querySnapshot)
            querySnapshot.docs.map((doc)=>{
               // console.log(doc.data())
               stakes.push({...doc.data(),id:doc.id})
               setStake({...doc.data(),id:doc.id})
      
               
             })
             setPool(stakes)
          }
          getStake()
        
    },[])
  return (
    <div className='pt-10'>
        <div className='flex space-x-40 stake-bg py-2 px-8 items-center '>
            <h5 className='text-sm'>POOL</h5>
            <h5 className='text-sm'>TOTAL STAKE</h5>
            <h5 className='text-sm'>EARNINGS</h5>
            <h5 className='text-sm'>APR</h5>
            <h5 className='text-sm'>ENDS</h5>
            <h5 className='text-sm'></h5>
        </div>

        <div className="min-h-min py-10 overflow-y-scroll">
            {pool.map((pool)=>
              <>
               <div className='flex items-center space-x-36 pt-4 px-4'>
                  <h5 className='flex items-center space-x-1'>
                    <img src={ellipse} className="w-4 h-4"/>
                    <span className='text-sm font-semibold'>{`Pool#${pool?.ID}`}</span>
                  </h5>

                  <h5  className=''>{pool?.totalstake} ONE</h5>
                  <h5  className='flex flex-col justify-center'>
                    <span className='font-semibold'>{pool.earnings}</span>
                    <span className='text-slate-400 text-xs'>0 USD</span>
                  </h5>
                  <h5>{pool?.apr}%</h5>
                  <h5  className='flex flex-col justify-center'>
                    <span className='font-semibold'>{"About 4 hours"}</span>
                    <span className='text-slate-400 text-xs'>(Sep 30, 2022, 6:26 AM)</span>
                  </h5>
                  <button className='border border-slate-800 px-2 py-1 text-xs w-24 rounded-full'
                     onClick={()=>setTrigger(true)}
                  >View Details</button>
               </div>

                <Modal  trigger={trigger} cname="h-72 w-2/5 shadow rounded-lg py-4 px-8" >
                    <main className='flex justify-end'>
                      <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
                    </main>

                    <div>
                      <h5 className='font-semibold'>Pool Details</h5>
                      <main className='flex flex-col pt-4'>
                        <h5 className='flex items-center justify-between text-sm text-slate-400 w-full'><span className='w-1/2'>APR</span> <span className='w-1/2'>{pool?.apr}%</span></h5>
                        <h5 className='flex items-center justify-between text-sm text-slate-400 w-full'><span className='w-1/2'>Min. stake per user:</span> <span className='w-1/2'>{"4"}</span></h5>

                        <h5 className='flex items-center justify-between text-sm text-slate-400 w-full'><span className='w-1/2'>Ends in</span> <span className='w-1/2'>{"About 4 hours"} (Sep 30, 2022, 6:26 AM)</span></h5>
                        <h5 className='flex items-center justify-between text-sm text-slate-400 w-full'><span className='w-1/2'>Number of stakers</span> <span className='w-1/2'>{"0"}</span></h5>
                       </main>

                       <main className='flex w-full items-center justify-between border stake-bg rounded-md py-2 mt-4 px-4'>
                         <div className='w-3/4'>
                            <h5  className='text-xs text-slate-400'>Pool rewards</h5>
                            <h5 className='flex flex-col'>
                              <span className='text-xs  font-semibold'>{"0"}</span>
                              <span className='text-xs  text-slate-400'>{"0"} USD</span>
                            </h5>
                         </div>
                         <div className='w-1/4'>
                            <button className='stake-btn px-2 py-2  rounded-sm text-xs font-semibold'>Harvest Rewards</button>
                         </div>
                         
                       </main>
                       <main className='flex justify-center pt-4'>
                         <button className='btn-color text-black px-2 py-1 text-xs font-semibold rounded-sm'>Join pool</button>
                       </main>
                    </div>
                </Modal>
               </>
            
            )

            }

        </div>
    </div>
  )
}
