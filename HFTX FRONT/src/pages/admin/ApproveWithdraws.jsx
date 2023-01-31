import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import tronweb from 'tronweb'
import Loading from '../../components/common/loading/Loading'
import { changeBatchDepositToPaid, changeDepositToPaid } from '../../redux/adminAction'

const ApproveWithdraws = () => {
    const dispatch = useDispatch()
    const { approvedWithdrawal, dataLoaded } = useSelector(state => state.admin)
    const { isConnected, wallet, USDT_CONTRACT, APP_CONTRACT, error, errorMessages, contractAddress } = useSelector((state) => state.blockchain);
    const [checked, setChecked] = useState([])
    const [loading , setLoading] = useState(false)
    const [isCheckAll, setIsCheckAll] = useState(false)

    const handleSelectAll = () => {
        setChecked(approvedWithdrawal.map(item => item._id))
    }


    const pushChecked = (e) => {
        if(e.target.checked){
            setChecked([...checked, e.target.value])
        }else{
            setChecked(checked.filter(item => item !== e.target.value))
        }
        
    }
    

    const payChecked = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, pay it!'
        }).then(async(result) => {
            if (result.isConfirmed) {

        try{
        if(checked.length > 0){
            let userAndAmount = []
            checked.forEach(item => {
                const user = approvedWithdrawal.find(withdraw => withdraw._id === item)
                const amount = tronweb.toSun(user.amount)
                const array = [user.user.wallet,amount]
                userAndAmount.push(array)

            })
            
            setLoading(true)
            const result = await APP_CONTRACT.methods.approvedBatch(userAndAmount).send()
          
         
                dispatch(changeBatchDepositToPaid(checked))
                Swal.fire({
                    icon: 'success',
                    title: 'Paid',
                    text: 'Withdrawal Paid',
                })
                setLoading(false)
         
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select at least one withdrawal',
            })
        }
        }catch(err){
            console.log(err)
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            })
        }
        }})
    

    }




    const walletSlicer = (wallet) => {
        return wallet.slice(0, 6) + '...' + wallet.slice(-4)
    }

    const mongoDateConverter = (date) => {
        const newDate = new Date(date)
        return newDate.toLocaleString()
    }

    const paidDeposit = async (deposit) => {
        const { _id, amount } = deposit
    
        const amountInSun = tronweb.toSun(amount)
        try{
            setLoading(true)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, pay it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
        const result = await APP_CONTRACT.setApprovedAmount(deposit.user.wallet, amountInSun).send();
        setTimeout(() => {
            dispatch(changeDepositToPaid(_id))
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Paid',
                text: 'You have paid the withdrawal',
                showConfirmButton: false,
                timer: 1500
            })
        }, 3000);
            }else{
                setLoading(false)
            }
        })
 
        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    



return (
    <div className='pending-deposits-table'>
        {loading && <Loading/>}
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
                    {dataLoaded && approvedWithdrawal.map((deposit, index) => (
                        <tr key={index}>
                            <th scope='row'>{<input
                             type="checkbox"  
                             value={deposit._id} 
                             onChange={(e) => pushChecked(e)} 
                             checked={checked.includes(deposit._id) ? true : false}
                             
                             />}</th>
                            <td>{walletSlicer(deposit.user.wallet)}</td>

                            <td>{deposit.amount}</td>
                            <td>{mongoDateConverter(deposit.date)}</td>
                            <td>
                                <div>
                                    <button className='btn btn-success'
                                        onClick={() => paidDeposit(deposit)}
                                    >Paid</button>
                                    <button className='btn btn-danger'>Cancel</button>

                                </div>
                            </td>
                            <td className='btn btn-success text-success'>pending</td>

                        </tr>
                    ))}

                </tbody>
            </table>
            <div>
                <button className='btn btn-success' onClick={payChecked}>Pay Checked</button>
                <button className='btn btn-primary' onClick={handleSelectAll}>Check All</button>
             
            </div>
        </div>
    </div>
)
}

export default ApproveWithdraws