import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getApy, payTodayReward, saveApy } from '../../redux/adminAction';
import {BiEdit} from 'react-icons/bi'
import NewApy from '../../components/modifyApy/NewApy';

const Calendar = () => {

  const { dataLoaded, pendingDeposits, approvedDeposits, pendingWithdrawal, approvedWithdrawal, paidWithdrawal, apy, totalWorkingBalance } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const [apyAmount, setApy] = useState(0);
  const [todayReward, setTodayReward] = useState(0);
  const [savedApyPercent , setSavedApyPercent] = useState(0);
  const [savedApyDate , setSavedApyDate] = useState(0);
  const [savedApyLoaded, setSavedApyLoaded] = useState(false);
  const [payed, setPayed] = useState(0);
  const [totalPayed, setTotalPayed] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [apyId, setApyId] = useState('');

  useEffect(() => {
    if (dataLoaded) {
      dispatch(getApy()
      )
    }
  }, [dataLoaded])

  useEffect(() => {
    if (dataLoaded) {
      setTodayReward((apyAmount * totalWorkingBalance) / 100)
    }else{
      setTodayReward(0)
    }
  }, [apyAmount, totalWorkingBalance]);

  useEffect(() => {
    if (apy) {
   
        //get today apy 
        const today = new Date();
        const apyDate = new Date(apy.date);
        if (today.getDate() === apyDate.getDate() && today.getMonth() === apyDate.getMonth() && today.getFullYear() === apyDate.getFullYear()) {
        setSavedApyPercent(apy.apy)
        setSavedApyDate(apy.date)
        setPayed(apy.payed?"payed":"not payed")
        setTotalPayed(apy.totalPayed)
        setSavedApyLoaded(true)
        setApyId(apy._id)
        }else{
          setSavedApyLoaded(true)
          setSavedApyPercent('No apy for today')
          setSavedApyDate('No apy for today')
          setPayed('No apy for today')
          setTotalPayed('No apy for today')

        }
      
    }
  }, [apy]);

  const handlePay = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay it!'
    }).then((result) => {
      if (result.isConfirmed) {
    dispatch(payTodayReward())
    Swal.fire(
      'Payed!',
      'Today reward has been payed.',
      'success'
    )}
    })
    
  }




  const handleApy = () => {
    Swal.fire
      ({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      }).then((result) => {
        if (result.isConfirmed) {
 

          dispatch(saveApy(apyAmount))
        
          Swal.fire(
            'Changed!',
            'Your APY has been changed.',
            'success'
          )

        }
      })
  }

  const mongoDateConverter = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleString()
  }



 

  return (
    <div>
      {openModal && <NewApy setOpenModal={setOpenModal} apyId={apyId} />}
      <div className="tittle text-center my-4">
        <h3>Calendar</h3>
      </div>
      <div className='body-calendar container'>
        <h5>Today APY</h5>
        <input type="number" className="form-control" placeholder="0.00" onChange={(e) => setApy(e.target.value)} />
        <div className='text-center my-3'>
          <button className="btn btn-primary px-5"
            onClick={handleApy}
          >Save</button>
        </div>
        <div className='my-5 loaded-apy'>
          <h5> Saved APY </h5>
          <h5> Apy Saved: {savedApyLoaded ? savedApyPercent : "save apy please"} %
          <BiEdit style={{
            background:"linear-gradient(to right, #0087b6 0%, #0058a6 100%)", 
            padding:"2px", 
            color:"white", 
            borderRadius:"3px",
            marginLeft:"10px",
            fontSize:"30px",
            cursor:"pointer"
            }}
            onClick={()=>setOpenModal(true)}
            />
            </h5>
          <h5> Apy Date: {savedApyLoaded ? mongoDateConverter(savedApyDate) : "not date founded"} </h5>
          <h5> Payed: {savedApyLoaded ?  payed : "loading..."} </h5>
          <h5> Total Payed: {savedApyLoaded ?  totalPayed : "loading..."} </h5>
        </div>

        <div className='total-rewarded'>

          <h5>Send Rewards</h5>
          <p>Total Rewarded: {todayReward}</p>
          {payed === "not payed" ? <button className="btn btn-primary px-5"
            onClick={handlePay}
          >Pay</button> : 
          <button className="btn btn-primary px-5"
            disabled
          >day payed</button>}
        </div>
      </div>
    </div>
  )
}


export default Calendar