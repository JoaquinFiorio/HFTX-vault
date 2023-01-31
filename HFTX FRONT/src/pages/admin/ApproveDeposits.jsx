import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const ApproveDeposits = () => {
  const transactionApi = "https://nile.tronscan.org/#/transaction/"

  const { approvedDeposits, dataLoaded } = useSelector(state => state.admin)


  const walletSlicer = (wallet) => {
    return wallet.slice(0, 6) + '...' + wallet.slice(-4)
  }

  const mongoDateConverter = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleString()
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
     
            </tr>
          </thead>
          <tbody>
            {dataLoaded && approvedDeposits.map((deposit, index) => (
              <tr key={index}>
                <th scope='row'>{index}</th>
                <td>{walletSlicer(deposit.user.wallet)}</td>
                <td><a href={`${transactionApi}${deposit.transaction}`} target='_blank'>{walletSlicer(deposit.transaction)}</a></td>
                <td>{deposit.amount}</td>
                <td>{mongoDateConverter(deposit.aprovedDate)}</td>
                <td className='btn btn-success text-success'>Approved</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApproveDeposits