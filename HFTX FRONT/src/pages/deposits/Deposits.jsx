
import { useState } from "react";
import ContentCards from "../../components/common/content-cards/ContentCards";
import PageHeader from "../../components/common/page-header/PageHeader";

import Tronweb from "tronweb";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fontFamily } from "@mui/system";
import { connectWallet } from "../../redux/conecctionAction";
import { fetchUserDeposits } from "../../redux/userActions";
import Swal from 'sweetalert2'


const Deposits = () => {
  const { user, userLoaded, pendingDepositsUser, approvedDepositsUser } = useSelector((state) => state.user);
  const { isConnected, wallet, USDT_CONTRACT, APP_CONTRACT, loading, error, totalbalance, errorMessages, contractAddress} = useSelector((state) => state.blockchain);

  const [forDeposit, setForDeposit] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [allDeposits, setAllDeposits] = useState([]);
  const [loadingDeposits, setLoadingDeposits] = useState(false);

  const dispatch = useDispatch();

  const transactionApi = "https://nile.tronscan.org/#/transaction/"

  const walletSlicer = (wallet) => {
    return wallet.slice(0, 6) + '...' + wallet.slice(-4)
  }

  const mongoDateConverter = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleString()
  }

  const approve = async () =>{
    try {
      setLoadingDeposits(true)
      const approve = await USDT_CONTRACT.approve(APP_CONTRACT.address, '999999999999999').send();

      await USDT_CONTRACT.allowance(wallet, APP_CONTRACT.address).call().then((result) => {
        setApprovedAmount(Tronweb.fromSun(result))
      });

      setLoadingDeposits(false)

      Swal.fire({
        icon: 'success',
        title: 'Approved',
        text: 'You have approved the contract to spend your USDT',
        showConfirmButton: false,
        timer: 1500
      })


    } catch (error) {
      console.log(error);
      setLoadingDeposits(false)
    }
  }

  const checkApprove = async () =>{
    try {
      const checkApprove = await USDT_CONTRACT.allowance(wallet, APP_CONTRACT.address).call();
      const checkApproveNumber = Tronweb.toDecimal(checkApprove);
      setApprovedAmount(checkApproveNumber);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if(isConnected){
    checkApprove()

    }
  }, [isConnected]);

  const approveCount = () =>{
    let count = 0;
    count += pendingDepositsUser.length;
    count += approvedDepositsUser.length;
    setTotalDeposits(count);
  }

  const depositsArray = () =>{
    let array = [];
    pendingDepositsUser.map((deposit) => {
      array.push(deposit);
    });
    approvedDepositsUser.map((deposit) => {
      array.push(deposit);
    });

    setAllDeposits(array);
  }

  useEffect(() => {
    if (userLoaded) {
      approveCount()
      depositsArray()
    }
  }, [userLoaded, approvedDepositsUser, pendingDepositsUser]);


  const envioUsdt = async (cantidadUsdt) =>{
    if(cantidadUsdt <= 100 ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The minimum amount to deposit is 101 USDT',
      })
    }
    try {
      setLoadingDeposits(true);
      const deposit = Tronweb.toSun(cantidadUsdt);
  
      await APP_CONTRACT.deposit(deposit).send()

      await APP_CONTRACT.Deposit().watch((err, { result }) => {
        if (err) {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          })
          throw err;
        }
    
        dispatch(fetchUserDeposits(user._id));
        setLoadingDeposits(false);
        Swal.fire({
          icon: 'success',
          title: 'Deposit',
          text: 'Your deposit has been sent!',
        })
      });

      dispatch(fetchUserDeposits)
      dispatch(connectWallet())
      setLoadingDeposits(false);
        
    } catch (error) {
      console.log(error);
      setLoadingDeposits(false);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error sending the deposit, try again',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }



  const titles = ["STATUS", "AMOUNT", "TX-HASH", "DATE"];

  return (
    <div className="pageContainer">
      {/* <div className="sectionContainer"> */}
      <PageHeader pageName="DEPOSITS" />
      <div className="row mx-1">
        {/* USDT AVAILABLE TO INVEST */}
        <div className="rowPrincipalDeposits">

         <div 
         className="item1-deposits"
     
         >
            <ContentCards
              headerContent={
                <>
                  <h3>USDT AVAILABLE <br/> TO INVEST</h3>
                </>
              }
              hasContent={true}
              bodyContent={
                <>
                  <div className="body-content-deposits">
                    <h1 className="number text-center my-4">${isConnected? totalbalance : 0}</h1>
                    <div className="horizontalSeparator" style={{marginBottom: "-5px"}} />
                    <h3 className="my-4">TODAY <br/>TOTAL DEPOSITS</h3>
                    <h1 className="number text-center">{totalDeposits}</h1>
                  </div>
                </>
              }
            />
          </div>

          
            {/* AMOUNT MIN */}
            
              <div className="item2-deposits">
                <ContentCards
                  headerContent={
                    <>
                      <h3>
                        AMOUNT MIN <span className="number">:<br/> 101</span> USDT
                      </h3>
                    </>
                  }
                  hasContent={true}
                  bodyContent={
                    <>
                      <div className="deposits-button-container">
                        <div className="deposits-button">
                          <input type="number" className="form-control" style={{height:"65%", marginTop:"-52px"}} placeholder="0.00" onChange={(e)=>
                            setForDeposit(e.target.value)
                            } />
                          {loadingDeposits ? (
                            <button className="btn btn-primary w-100 py-2" type="button" style={{height:"60px"}} disabled>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              Loading...
                            </button>
                          ) : (
                            <>
                          {approvedAmount >= forDeposit ? forDeposit >= 101 ?
                           
                          <button className="btn btn-primary w-100 py-2" style={{height:"60px"}} onClick={()=>envioUsdt(forDeposit)}>
                            DEPOSIT
                          </button>
                          :
                          <button className="btn btn-primary w-100 py-2" style={{height:"60px"}} disabled> Not enough </button>
                          :
                          <button className="btn btn-primary w-100 py-2" style={{height:"60px"}} onClick={()=>approve()}>APPROVE</button>
                
                          }
                            </>
                          )}
                          </div>
                      </div>
                    </>
                  }
                />
              </div>
              <div className="item3-deposits">
                <ContentCards
                  headerContent={
                    <>
                      <h3>
                        REFERRAL<br/>LINK
                      </h3>
                    </>
                  }
                  hasContent={true}
                  bodyContent={
                    <>
                      <div className="deposits-button-container">
                        <div className="deposits-button">
                          <h2>COMMING SOON</h2>
                          </div>
                      </div>
                    </>
                  }
                />
              </div>


    
            
          
        </div>
        {/* PERCENTAGES HISTORY */}
        <div className="rowSecondaryDeposits">
          <div className="headerWithContent">
            <h3>DEPOSITS<br/>HISTORY</h3>
          </div>
          <div className="cardContent">
              <div style={{ height: 400, width: "100%"}}>
                  <div style={{ display: "flex", height: "100%",overflowX:"scroll" }}>
                    <div style={{ flexGrow: 3 }}>
                    <table className="table table-dark mt-4 table-hover pending-deposits-table" 
                    style={{
                      borderBottom:"1px solid rgba(0, 220, 255, 0.82)",
                      
                    }}>
                      <thead
                        style={{
                          backgroundColor: "#232744",
                          fontSize: "20px"
                        }}>

                        <tr>
                          {titles.map((title, index) => (
                            <th key={index}>{title}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {allDeposits.map((deposit, index) => (
                          <tr key={index}>
                            <td style={{fontFamily:"spantaran"}}>{deposit.status.toUpperCase()}</td>
                            <td>{deposit.amount}</td>
                            <td><a href={`${transactionApi}${deposit.transaction}`} target='_blank'>{walletSlicer(deposit.transaction)}</a></td>
                            <td>{mongoDateConverter(deposit.date)}</td>
                          </tr>
                        ))}
                      </tbody>
                </table>
                    </div>
                  </div>
                </div>
                </div>
        </div>
        
      </div>
      {/* </div> */}
    </div>
  );
};

export default Deposits;
