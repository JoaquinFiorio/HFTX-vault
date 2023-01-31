import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveDeposit, rejectDeposit } from '../../redux/adminAction'

const PendingDeposits = () => {
    const transactionApi = "https://nile.tronscan.org/#/transaction/"
    const dispatch = useDispatch()

    const { pendingDeposits, dataLoaded } = useSelector(state => state.admin)
  

    const walletSlicer = (wallet) => {
        return wallet.slice(0, 6) + '...' + wallet.slice(-4)
    }

    const mongoDateConverter = (date) => {
        const newDate = new Date(date)
        return newDate.toLocaleString()
    }

    const handleApprove = (id) => {
    
        dispatch(approveDeposit(id))
    }

    const handleReject = (id) => {
        dispatch(rejectDeposit(id))
    }

  return (
    <div className='pending-deposits-table'>
        <div className='table-responsive'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>TX-Hash</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Status</th>
                        {/* <th scope='col'>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {dataLoaded && pendingDeposits.map((deposit, index) => (
                    <tr key={index}>
                        <th scope='row'>{index}</th>
                        <td>{walletSlicer(deposit.user.wallet)}</td>
                        <td><a href={`${transactionApi}${deposit.transaction}`} target='_blank'>{walletSlicer(deposit.transaction)}</a></td>
                        <td>{deposit.amount}</td>
                        <td>{mongoDateConverter(deposit.date)}</td>
                        <td className='btn btn-warning text-warning'>pending</td>
                        {/* <td>
                            <button 
                            className='btn btn-primary btn-sm me-2'
                            onClick={() => handleApprove(deposit._id)}
                            >Approve</button>
                            <button 
                            className='btn btn-danger btn-sm'
                            onClick={() => handleReject(deposit._id)}
                            >Reject</button>
                        </td> */}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default PendingDeposits