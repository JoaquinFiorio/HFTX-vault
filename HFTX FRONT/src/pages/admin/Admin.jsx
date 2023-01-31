import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, NavLink } from 'react-router-dom'
import PageHeader from '../../components/common/page-header/PageHeader'
import { loadAdminData } from '../../redux/adminAction'
import "./admin.css"

const Admin = ({toggleShow}) => {
  const {deposits, dataLoaded}= useSelector(state => state.admin)
  const {user, userLoaded} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if(userLoaded){ 
    if(user.role === "admin"){
      dispatch(loadAdminData())
    }
  }
  }, [userLoaded])
  return (
    <div className="pageContainer">
    <PageHeader pageName="ADMIN PANEL" toggleShow={toggleShow} />
    <div className="adminContainer d-flex justify-content-center">
    <NavLink to="/admin/dashboard" className="btn btn-primary  me-2">Dashboard</NavLink>
    <NavLink to="/admin/pdeposits" className="btn btn-primary  me-2">Pending Deposits</NavLink>
    <NavLink to="/admin/adeposits" className="btn btn-primary  me-2">Approved Deposits</NavLink>
    <NavLink to="/admin/pwithdraws" className="btn btn-primary  me-2">Pending Withdraws</NavLink>
    <NavLink to="/admin/awithdraw" className="btn btn-primary  me-2">Approved Withdraws</NavLink>
    <NavLink to="/admin/calendar" className="btn btn-primary me-2">Calendar</NavLink>
    <NavLink to="/admin/configuration" className="btn btn-primary me-2">SetAdmin</NavLink>
    <NavLink to="/admin/manual" className="btn btn-primary me-2">Manual Deposit</NavLink>


    </div>
    <Outlet/>
    </div>
  )
}

export default Admin