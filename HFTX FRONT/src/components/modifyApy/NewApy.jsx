import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { getApy, modifyApy } from '../../redux/adminAction'
import "./newApy.css"
const NewApy = ({setOpenModal, apyId}) => {
    const dispatch = useDispatch()
    const [apy, setApy] = useState(0)
    const [loading, setLoading] = useState(false)

    const close = () => {
        setOpenModal(false)
    }

    const handleApy = async() => {
        setLoading(true)
        dispatch(modifyApy(apy, apyId))


        setTimeout(() => {
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Apy modified',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(getApy())
           
            setOpenModal(false)
        }, 2500);

       
    }

    
  return (
    <div className="full-width">
        <div className="modal-apys">
      
            {loading ? <div className="spinner-border text-primary text-center" role="status">
            <span className="sr-only text-primary"></span>
            </div> :
            <>            
            <div className="modal-apys__header">
                <h3>Modify APY</h3>
            </div>
            <div className="modal-apys__body">
                <div className="close-button " 
                onClick={close}>X</div>
                <div className="modal-apys__body__input">
                    <input type="number" className="form-control" placeholder="0.00" onChange={(e) => setApy(e.target.value)} />
                </div>
                <div className="modal-apys__body__button text-center">
                    <button 
                    className="btn btn-primary px-5"
                    onClick={handleApy}
                    >Save</button>
                </div>
            </div>
            </>}
        </div>
    </div>
  )
}

export default NewApy