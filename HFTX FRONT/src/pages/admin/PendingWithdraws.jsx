import { Checkbox } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { approveCheckedWithdrawal, approveOneWithdrawal } from '../../redux/adminAction'

const PendingWithdraws = () => {
    const dispatch = useDispatch()
    const { pendingWithdrawal, dataLoaded } = useSelector(state => state.admin)

    const [checked, setChecked] = useState([])

    const handleSelectAll = () => {
        setChecked(pendingWithdrawal.map(item => item._id))
    }

    const pushChecked = (id) => {
        if (checked.includes(id)) {
            setChecked(checked.filter(item => item !== id))
        } else {
            setChecked([...checked, id])
        }
    }

    const walletSlicer = (wallet) => {
        return wallet.slice(0, 6) + '...' + wallet.slice(-4)
    }

    const mongoDateConverter = (date) => {
        const newDate = new Date(date)
        return newDate.toLocaleString()
    }

    const approveOne = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(approveOneWithdrawal(id))
                Swal.fire(
                    'Approved!',
                    'Your withdrawal has been approved.',
                    'success'
                )
            }
        })
    }


    const approveChecked = () => {
        dispatch(approveCheckedWithdrawal(checked))
        Swal.fire({
            icon: 'success',
            title: 'Approved',
            text: 'Withdrawal Approved',
        })
    }

    return (
        <div className='pending-deposits-table'>
            <div className='table-responsive'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>checkbox</th>
                            <th scope='col'>Address</th>

                            <th scope='col'>Amount</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Action</th>
                            <th scope='col'>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dataLoaded && pendingWithdrawal.map((deposit, index) => (
                            <tr key={index}>
                                <th scope='row'>{<input type="checkbox" 
                                value={deposit._id} 
                                onChange={(e) => pushChecked(e.target.value)}
                                checked={checked.includes(deposit._id)} />}
                                </th>
                                <td>{walletSlicer(deposit.user.wallet)}</td>

                                <td>{deposit.amount}</td>
                                <td>{mongoDateConverter(deposit.date)}</td>
                                <td>
                                    <div>
                                        <button 
                                        className='btn btn-success' 
                                        onClick={() => approveOne(deposit._id)}>Approve</button>

                                    </div>
                                </td>
                                <td className='btn btn-warning text-warning'>pending</td>

                            </tr>
                        ))}

                    </tbody>
                </table>
                <div>
                    <button className='btn btn-success' onClick={approveChecked}>Approve Checked</button>
                    <button className='btn btn-primary' onClick={handleSelectAll}>Check All</button>
                </div>
            </div>
        </div>
    )
}

export default PendingWithdraws