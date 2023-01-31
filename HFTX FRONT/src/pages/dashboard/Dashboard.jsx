import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCards from "../../components/common/content-cards/ContentCards";
import PageHeader from "../../components/common/page-header/PageHeader";
import { fetchUserDeposits, getRewardHistory } from "../../redux/userActions";
//import styles from "./dashboard.module.css";

const Dashboard =  ({ toggleShow , porcentajeDayli, defaultAccount, contract, depositos }) => {
  const dispatch = useDispatch();
  const { user, userLoaded, pendingDepositsUser, approvedDepositsUser, rewardedHistory, latesApy, apyHistory, apyHistoryLoaded} = useSelector((state) => state.user);
  const { isConnected, wallet, USDT_CONTRACT, APP_CONTRACT, loading, error, errorMessages} = useSelector((state) => state.blockchain);
  



  const [depositosFinal, setDepositosFInal] = useState(0);
  const [depositosTotal, setDepositosTotal] = useState(0);
  const [APyHistory, setAPyHistory] = useState([]);

  useEffect(() => {
    if (userLoaded) {
      dispatch(fetchUserDeposits());
    }
  }, [userLoaded]);

  useEffect(() => {
    if (approvedDepositsUser.length > 0) {
      AddApprovedDeposits()
    }
  }, [approvedDepositsUser]);


  useEffect(() => {
    if(apyHistoryLoaded){
      //reverse the array
      const reversed = apyHistory.reverse();
      setAPyHistory(reversed);
    }
  }, [apyHistoryLoaded, apyHistory]);

  const AddApprovedDeposits = () => {
    let total = 0;
    approvedDepositsUser.map((deposit) => {
      total += deposit.amount;
    });
    setDepositosTotal(total);
  };

  const getDateWithouthTime = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };



 
  return (
    <div className="pageContainer">
      <PageHeader pageName="DASHBOARD" toggleShow={toggleShow} />
      <div className="row mx-1">
        <div className="rowPrincipalDashboard">
          <div className="item1-dashboard">
            {/* MY ACCOUNT SECTION */}
            <ContentCards
              headerContent={
                <>
                  <h3>MY ACCOUNT</h3>
                </>
              }
              hasContent={true}
              bodyContent={
                <>
                  <h3>TOTAL BALANCE</h3>
                  <h3 className="greenNumber-dashboard mb-4">
                    ${userLoaded? user.workingBalance.toFixed(2) : "0,00"}
                  </h3>
                  <div className="deposits-profits">
                    <div id="deposits-profits" className="d-flex justify-content-evenly">
                      <div className="dashboard-deposits">
                        <h3 className="py-4"> DEPOSITS HISTORY</h3>
                        <h3 className="total-deposits-number my-4">
                          ${depositosTotal}
                        </h3>
                      </div>
                      <div className="verticalSeparator-dashboard" />
                      <div className="dashboard-profits">
                        <h3 className="py-4">TOTAL PROFITS</h3>
                        <h3 className="total-profits-number my-4">
                          ${userLoaded? user.totalProfits.toFixed(2) : "0,00"}
                        </h3>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </div>
          {/* DAY PERCENTAGE */}
          <div className="item2-dashboard">
            <ContentCards
              headerContent={
                <>
                  <h3>DAY PERCENTAGE</h3>
                </>
              }
              hasContent={true}
              bodyContent={
                <>
                  <h2 className="day-percentaje-number">{latesApy.apy? latesApy.apy : "0"}%</h2>
                  <div className="horizontalSeparator-day-percentaje" style={{marginBottom:"40px"}}/>
                  <div style={{display:"flex", justifyContent:"center" }}><h3 className="my-4" style={{fontSize: "25px"}}>BALANCE INCREASE</h3></div>
                  <h1 className="day-balance-number">${latesApy.apy? (user.workingBalance * latesApy.apy / 100).toFixed(2) : "0,00"}</h1>
                </>
              }
            />
          </div>

          {/* PERCENTAGES HISTORY */}
        </div>
        
        <div className="percentage-history-table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">DATE</th>
                <th scope="col">PERCENTAGE</th>
              </tr>
            </thead>
            <tbody>
              {apyHistoryLoaded? APyHistory.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{getDateWithouthTime(item.date)}</td>
                    <td>{item.apy}%</td>
                  </tr>
                );
              }) : null}
            </tbody>
          </table>
              
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
