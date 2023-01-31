
import ContentCards from "../../components/common/content-cards/ContentCards";
import PageHeader from "../../components/common/page-header/PageHeader";
import AmountInput from "../../components/common/amount-input/AmountInput";
import styles from "./vault.module.css";
import item7 from "../../assets/images/item7.png";
//import { useState } from "react";

/////////////////////////
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Tvl from "../../components/charts/Tvl";

////////////////////////

const Vault = ({ toggleShow, porcentajeDayli, contract, cantidadUsdt }) => {
  const { user, userLoaded, pendingDepositsUser, approvedDepositsUser, retireBalance } = useSelector((state) => state.user);
  const { totalWorkingBalance, apyHistory, apyHistoryLoaded } = useSelector((state) => state.data);


    const [apyHistoryAverage, setApyHistoryAverage] = useState(0);
    const [totalPaidRetire, setTotalPaidRetire] = useState(0);
    const [dates , setDates] = useState([]);
    const [workingBalancePerDay, setWorkingBalancePerDay] = useState([])
    const [apyPerDay, setApyPerDay] = useState([])
    const [dailyApy, setDailyApy] = useState([])
    const [lastApiSaved, setLastApiSaved] = useState([])
  
  const apy =  porcentajeDayli/ 100 * 260;
  const daily = porcentajeDayli/ 100;

  const [depositosTotal, setDepositosTotal] = useState(0);

  const AddApprovedDeposits = () => {
    let total = 0;
    approvedDepositsUser.map((deposit) => {
      total += deposit.amount;
    });
    setDepositosTotal(total);
  };

  useEffect(() => {
    if (approvedDepositsUser.length > 0) {
      AddApprovedDeposits();
    }
  }, [approvedDepositsUser]);

  useEffect(() => {
    if (apyHistoryLoaded) {
    
      //get average
      let total = 0;
      //get last 10 days apy
      let last10Days = apyHistory.slice(Math.max(apyHistory.length - 10, 0));
      let totalApy = last10Days.length;
  
      last10Days.map((item) => {
        total += item.apy;
      });
      const average = total / totalApy * 240 / 100 * 2.1
      setApyHistoryAverage(average.toFixed(2));
    }
  }, [apyHistoryLoaded, apyHistory]);

  useEffect(() => {
    if (retireBalance.length > 0) {
      let total = 0;
      retireBalance.map((item) => {
        if(item.state === "paid"){
          total += item.amount;
        }
      });
      setTotalPaidRetire(total);
    }
  }, [retireBalance]);

  useEffect(() => {
    if (apyHistoryLoaded){
      let dates = []
      let apys = []
      let Daily = []
      let workingsBalances = []
      let lastApiSaved = []

      apyHistory.map((item) => {
          const newDate = new Date(item.date);
          const convertedDate = newDate.toLocaleDateString();
          dates.push(convertedDate);
          apys.push(item.apy*240/10 * 2.1);
          Daily.push(item.apy);
          workingsBalances.push(item.TotalworkingBalance);
          lastApiSaved  = item;
        })
        setDates(dates);
        setWorkingBalancePerDay(workingsBalances)
        setApyPerDay(apys)
        setDailyApy(Daily)

        if(getDateWithouthTime(lastApiSaved.date) === new Date().toLocaleDateString()){
       
          setLastApiSaved(lastApiSaved.apy)
        }else{
          setLastApiSaved(0)
        }
    }
    }, [apyHistoryLoaded, apyHistory, totalWorkingBalance, userLoaded, user]);

    const getDateWithouthTime = (date) => {
      const newDate = new Date(date);
      return newDate.toLocaleDateString();
    };


  const Tab = styled(TabUnstyled)`
    

    &:hover {
      transform: none;
    }

    &:focus {
      transform: none;
    }

    &.${tabUnstyledClasses.selected} {
      background-image: linear-gradient(to right, #0087b6 0%, #0058a6 100%);
     
     
    }

    &.${buttonUnstyledClasses.disabled} {
      
    }
  `;

  const TabPanel = styled(TabPanelUnstyled)`
   
  `;

  /* const TabsList = styled(TabsListUnstyled)`
    
  `; */

  return (
    <div className="pageContainer">
      <PageHeader pageName="USDT/USDT VAULT"  toggleShow={toggleShow} vault={true} />
      <div className="background">
        <div className="row mx-1">
          <div className="rowPrincipalVault">
            {/* FIRST SECTION */}

            <div className="item1-vault">
              <ContentCards
                headerContent={
                  <>
                  <div className={styles.valores}></div>
                 
                    <div className="d-flex justify-content-evenly">
                      <div className="encabezados">
                        <h4>TVL</h4>
                        <h3 className="number">${totalWorkingBalance}</h3>
                      </div>
                      <div className="verticalSeparatorHeaderVault" />
                      
                      <div className="encabezados">
                        <h4>APY</h4>
                        <h3 className="number">{apyHistoryAverage}%</h3>
                      </div>
                      <div className="verticalSeparatorHeaderVault" />
                     
                      <div className="encabezados">
                        <h4>DAILY</h4>
                        <h3 className="number">{lastApiSaved > 0 ? lastApiSaved + '%' : 0}</h3>
                      </div>
                    </div>
                  </>
                }
                hasContent={false}
              />
            </div>
            {/* HISTORICAL RATE SECTION */}
            <div className="item2-vault">
              <TabsUnstyled  defaultValue={0} >
                <ContentCards
                  headerContent={
                    <>
                      <nav className="nav-tab" id="nav-tab">
                        <h3 className="historical-rate">HISTORICAL <br/> RATE</h3>
                        <div className="botonesTab">
                          <TabsListUnstyled componentsProps={{ root: { className: 'botonesTab' } }}>
                            <Tab  className={styles.boton}>TVL</Tab>
                            <Tab className={styles.boton}>APY</Tab>
                            <Tab className={styles.boton}>DAILY</Tab>
                          </TabsListUnstyled>
                        </div>
                      </nav>
                    </>
                  }
                  hasContent={true}
                  bodyContent={
                    <>
                      <div className="tab-graficos">
                        <TabPanel value={0}>
                          
                          <div><Tvl labels={dates} DATA={workingBalancePerDay}/></div>
                          
                          </TabPanel>
                        <TabPanel value={1}>
                          <div><Tvl labels={dates} DATA={apyPerDay}/></div>
                        </TabPanel>
                        <TabPanel value={2}><div><Tvl labels={dates} DATA={dailyApy}/></div></TabPanel>
                      </div>
                    </>
                  }
                />
              </TabsUnstyled>
            </div>
            {/*  */}

            {/* FINAL SECTION */}
            <div className="item3-vault">
              <ContentCards
                headerContent={
                  <>
                    <h3>YOUR <br/> DEPOSIT</h3>
                  </>
                }
                hasContent={true}
                bodyContent={
                  <>
                    <div className="deposit-vault-container">
                      <AmountInput children={depositosTotal} />
                        
                     
                    </div>
                  </>
                }
              />
            </div>

            <div className="item4-vault">
              <ContentCards
                headerContent={
                  <>
                    <h3>YOUR <br/> WITHDRAWS</h3>
                  </>
                }
                hasContent={true}
                bodyContent={
                  <>
                    <div className="deposit-vault-container">
                      <AmountInput children={totalPaidRetire} />
                    </div>
                  </>
                }
              />
            </div>

            <div className="item5-vault">
              <ContentCards
                headerContent={
                  <>
                    <h3>AUDIT</h3>
                    <div className="text-center"></div>
                  </>
                }
                hasContent={true}
                bodyContent={
                  <>
                    <img
                      src={item7}
                      alt="audit icon"
                      className={styles.auditLogo}
                    />
                  </>
                }
              />
            </div>
            {/* <div className="usd contrat">
              <ContentCards
                headerContent={
                  <>
                    <h5>USDT CONTRACT</h5>
                    
                  </>
                }
                hasContent={false}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
