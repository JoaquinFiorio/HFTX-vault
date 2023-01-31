

import { useState } from "react";
import ContentCards from "../../components/common/content-cards/ContentCards";
import PageHeader from "../../components/common/page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { buttonWithdraw, ErrorReset, fetchUserDeposits } from "../../redux/userActions";
import Swal from "sweetalert2";
import tronWeb from 'tronweb';

import { useEffect } from "react";
import Loading from "../../components/common/loading/Loading";


const Withdrawn = ({ toggleShow, contract, defaultAccount }) => {
  const { user, userLoaded, retireBalance, error, errorMessages } = useSelector((state) => state.user);
  const { isConnected, wallet, USDT_CONTRACT, APP_CONTRACT, totalbalance } = useSelector((state) => state.blockchain);

  const dispatch = useDispatch();
  const [amountToRetire, setAmountToRetire] = useState(0);
  const [inContractBalance, setInContractBalance] = useState(0);
  const [retiresLength, setRetiresLength] = useState(0);
  const [amountForWithdraw, setAmountForWithdraw] = useState(0);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  const requestHandler = () => {

    if (amountToRetire > 0 && user) {

      if (user.workingBalance >= amountToRetire) {
        dispatch(buttonWithdraw(amountToRetire))
        dispatch(fetchUserDeposits())
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'INSUFICIENT BALANCE',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'PLEASE ENTER A VALID AMOUNT',
      })
    }
  };

  const payedBalance = async () => {
    if (isConnected) {
      const balance = await APP_CONTRACT.approvedAmount(wallet).call();

      const formattedBalance = balance / 1000000;
      setInContractBalance(formattedBalance);
    }
  }

  useEffect(() => {
    if (isConnected) {
      payedBalance();
    }
  }, [isConnected])

  useEffect(() => {
    if (retireBalance) {
      setRetiresLength(retireBalance.length)
    } else {
      setRetiresLength(0)
    }
  }, [retireBalance, setRetiresLength])

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessages,
      })
    }
    dispatch(ErrorReset())
  }, [error, errorMessages, dispatch])


  const mongoDateConverter = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleString()
  }

  const withdrawContract = async () => {
    if (amountForWithdraw > 0) {
      if (amountForWithdraw <= inContractBalance) {
        try {
          setLoadingWithdraw(true)
          const amount = tronWeb.toSun(amountForWithdraw);
          const withdraw = await APP_CONTRACT.withdraw(amount).send();
      
          await APP_CONTRACT.Withdraw().watch((err, result) => {
            if (err) {
              console.log(err)
              setLoadingWithdraw(false)
            }
            if(result){
              setLoadingWithdraw(false)
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Withdrawn Successfully',
              })
              payedBalance();
            }
          })
        } catch (err) {
          console.log(err)
          setLoadingWithdraw(false)
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'INSUFICIENT BALANCE',
        })

      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'PLEASE ENTER A VALID AMOUNT',
      })
    }
  }




  return (
    <div className="pageContainer">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      {/* <div className="sectionContainer"> */}
      <PageHeader pageName="WITHDRAW" toggleShow={toggleShow} />
    {loadingWithdraw && <Loading/>}
      <div className="row mx-1">
        <div className="rowPrincipalWithdraw">
          <div className="item1-withdraw">
            <ContentCards
              headerContent={
                <>
                  <h3>
                    USDT AVAILABLE
                    <br />
                    TO WITHDRAW
                  </h3>
                </>
              }
              hasContent={true}
              bodyContent={
                <>
                  <div className="body-content-withdraw">
                    <h1 className="number text-center my-4">${userLoaded ? user.workingBalance.toFixed(2) : "0.00"}</h1>
                    <div className="horizontalSeparator" style={{ marginBottom: "-5px" }} />
                    <h3 className="my-4"> <br />TOTAL REQUEST</h3>
                    <h1 className="number text-center">{retiresLength}</h1>
                  </div>
                </>
              }
            />
          </div>

          <div className="item2-withdraw">
            <ContentCards
              headerContent={
                <>
                  <h3>
                    AMOUNT
                    <br />
                    TO WITHDRAW
                  </h3>
                </>
              }
              hasContent={true}
              bodyContent={
                <>
                  <div className="deposits-button-container">
                    <input type="number" className="form-control" placeholder="0.00" onChange={(e) => setAmountToRetire(e.target.value)} />

                    {user && user.workingBalance > amountToRetire ? (
                      <button
                        className="w-100 py-2 btn btn-primary text-center d-flex justify-content-center align-items-center"
                        onClick={requestHandler}
                        style={{ height: "60px" }}
                      >
                        REQUEST
                      </button>
                    ) : (
                      <button
                        className="w-100 py-2 btn btn-primary text-center d-flex justify-content-center align-items-center disabled"
                        style={{ height: "60px" }}
                      >
                        INSUFICIENT AMOUNT
                      </button>
                    )}

                  </div>
                </>
              }
            />
          </div>

          <div className="item3-withdraw">
            <ContentCards
              headerContent={
                <>
                  <h3 style={{ marginBottom: "-5px" }}>PAYED PROFITS<h5 className="number balanced">${inContractBalance}</h5></h3>
                </>
              }
              hasContent={true}
              bodyContent={
                <>
                  <div className="withdraw-button-container">
                    <input type="number" className="form-control" placeholder="0.00" onChange={(e) => setAmountForWithdraw(e.target.value)} />
                    <button className="btn btn-primary text-center d-flex justify-content-center align-items-center m-2 w-100 py-2" style={{ height: "60px", marginLeft: "0px!important" }}
                      onClick={withdrawContract}
                    >
                      WITHDRAW
                    </button>
                  </div>
                </>
              }
            />
          </div>
        </div>

        <div className="rowSecondaryWithdraw">
                <div className="headerWithContent">
                  <h3>WITHDRAW <br />HISTORY</h3>
                </div>
                <div className="cardContent">
                <div style={{ height: "400px", width: "100%" }}>
                  <div style={{ display: "flex", height: "100%", overflowX: "scroll" }}>
                    <div style={{ flexGrow: 3 }}>
                      <table className="table table-dark mt-4 table-hover pending-deposits-table" style={{ borderBottom: "1px solid rgba(0, 220, 255, 0.82)" }}>
                        <thead style={{
                          backgroundColor: "#232744",
                          fontSize: "20px",
                          marginTop:"20px"
                        }}>
                          <tr>
                            <th>STATUS</th>
                            <th>AMOUNT</th>
                            <th>DATE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {retiresLength > 0 &&
                            retireBalance.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td style={{fontFamily:"spantaran"}}>{item.state.toUpperCase()}</td>
                                  <td>{item.amount}</td>
                                  <td>{mongoDateConverter(item.date)}</td>
                                </tr>
                              )
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawn;