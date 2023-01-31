import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApy } from '../../redux/adminAction'

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { approvedDeposits, dataLoaded, pendingDeposits, pendingWithdrawal, approvedWithdrawal, paidWithdrawal, totalWorkingBalance } = useSelector(state => state.admin)
   
    const [totalADeposits, setTotalADeposits] = useState(0)
    const [totalPDeposits, setTotalPDeposits] = useState(0)
    const [totalPWithdrawal, setTotalPWithdrawal] = useState(0)
    const [totalAWithdrawal, setTotalAWithdrawal] = useState(0)
    const [totalPaidWithdrawal, setTotalPaidWithdrawal] = useState(0)


    useEffect(() => {
        if(dataLoaded){
            let total = 0
            approvedDeposits.map(deposit => {
                total += deposit.amount
            })
            let total2 = 0
            pendingDeposits.map(deposit => {
                total2 += deposit.amount
            })

            let total3 = 0
            pendingWithdrawal.map(withdrawal => {
                total3 += withdrawal.amount
            })

            let total4 = 0
            approvedWithdrawal.map(withdrawal => {
                total4 += withdrawal.amount
            })

            let total5 = 0
            paidWithdrawal.map(withdrawal => {
                total5 += withdrawal.amount
            })

            setTotalADeposits(total)
            setTotalPDeposits(total2)
            setTotalPWithdrawal(total3)
            setTotalAWithdrawal(total4)
            setTotalPaidWithdrawal(total5)

        }
    }, [dataLoaded, approvedDeposits])



    useEffect(() => {
        if (dataLoaded) {
          dispatch(getApy()
          )
        }
      }, [dataLoaded]);



    

    return (
        <div id="content" className="main-content m-3">
            <div className="row ">
                <div className="col  box-admin">
                    <div className="title-admin">
                        <h5>TOTAL BALANCE</h5>
                        <div className='number2'>
                            <h1>$ {totalWorkingBalance}</h1>
                        </div>
                    </div>
                </div>

                <div className="col  box-admin">
                    <div className="title-admin">
                        <h5>PENDING DEPOSITS</h5>
                        <div className='number2'>
                            <h1>$ {totalPDeposits}</h1>
                        </div>
                    </div>
                </div>

                <div className="col   box-admin">
                    <div className="title-admin">
                        <h5>APPROVED DEPOSITS</h5>
                        <div className='number2'>
                            <h1>$ {totalADeposits}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col box-admin">
                    <div className="title-admin">
                        <h5>PENDING WITHDRAWS</h5>
                        <div className='number2'>
                            <h1>$ {totalPWithdrawal}</h1>
                        </div>
                    </div>
                </div>

                <div className="col  box-admin">
                    <div className="title-admin">
                        <h5>APPROVED WITHDRAWS</h5>
                        <div className='number2'>
                            <h1>$ {totalAWithdrawal}</h1>
                        </div>
                    </div>
                </div>

                <div className="col box-admin">
                    <div className="title-admin">
                        <h5>PAID WITHDRAWS</h5>
                        <div className='number2'>
                            <h1>$ {totalPaidWithdrawal}</h1>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard