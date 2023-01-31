import Navigation from "./components/common/navigation/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vault from "./pages/vault/Vault";
import Dashboard from "./pages/dashboard/Dashboard";
import Deposits from "./pages/deposits/Deposits";
import Withdrawn from "./pages/withdrawn/Withdrawn";
import Market from "./pages/market/Market";
import Calculator from "./pages/calculator/Calculator";
import { useState } from "react";
import windowDimensions from "./hooks/useWindowDimensions";
import TronWeb  from 'tronweb'
import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingDeposits from "./pages/admin/PendingDeposits";
import ApproveDeposits from "./pages/admin/ApproveDeposits";
import PendingWithdraws from "./pages/admin/PendingWithdraws";
import ApproveWithdraws from "./pages/admin/ApproveWithdraws";
import PaidWithdraws from "./pages/admin/PaidWithdraws";
import Calendar from "./pages/admin/Calendar";
import SetAdmins from "./pages/admin/SetAdmins";

function App() {

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://nile.trongrid.io");
const solidityNode = new HttpProvider("https://nile.trongrid.io");
const eventServer = new HttpProvider("https://nile.trongrid.io");
const privateKey = "2f477a143c88ef2cd8bc5772e9c1bf98f655ca05a45f14520b489c8f623e9464";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);



  const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
  const [contractToken, setContractToken] = useState(null);

  const [cantidadUsdt, setUsdt] = useState(null);
  const [cantidadUsdtTotal, setUsdtTotal] = useState(null);
  const [porcentajeDayli, setDaily] = useState(null);
  const [depositos, setDepositos] = useState([]);

  let contractAddress = "TPaAdpZhrCM44Bjsc7Bahf7xowzTXwN8B3"
  let contractAddressToekn = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"
  let newContract = "TBrP1UH8QggrHNPb6mMRZPsH9RhiiHVV3m"

  const [defaultAccount, setDefaultAccount] = useState(null);

	const [connButtonText, setConnButtonText] = useState('Connect Wallet');





	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
    updateEthers()
	}





	const updateEthers = async () => {

		let tempContract = await  tronWeb.contract().at(contractAddress);
		setContract(tempContract);	


    let tempContractToken = await  tronWeb.contract().at(contractAddressToekn)
		setContractToken(tempContractToken);	
    

    let balanceStalking = await tempContract.cantidadTotalUSDT().call()
    let string = balanceStalking.toString()
    setUsdt(string)

    let returnCantidadUst = await tempContract.returnCantidadUst().call()
    let returnCantidadUstString = returnCantidadUst.toString()
    setUsdtTotal(returnCantidadUstString)

    let porcentajeSemanal = await tempContract.porcentajeSemanal().call()
    let stringporcentajeSemanal = porcentajeSemanal.toString()
    setDaily(stringporcentajeSemanal)
   
    let depositosYfechas = await tempContract.depositosYfechas().call()
    setDepositos(depositosYfechas)

	}

 


  const {width}=windowDimensions();
  
  const [show, setShow] = useState(true);
  const handleClose = () => width>992?setShow(true):setShow(false);
  const toggleShow = () => setShow((s) => !s);
  return (
    <Router>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <div className="container-fluid p-0">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <Navigation
          show={show}
          handleClose={handleClose}
          toggleShow={toggleShow}
          connButtonText={connButtonText}
          accountChangedHandler= {accountChangedHandler}
          setConnButtonText={setConnButtonText}
          HttpProvider= {HttpProvider}
          fullNode= {fullNode}
          solidityNode= {solidityNode}
          eventServer= {eventServer}
          privateKey= {privateKey}
          tronWeb= {tronWeb}

        />
        <Routes>
          <Route path="/" exact element={<Vault contract = {contract}
          porcentajeDayli={porcentajeDayli} 
          cantidadUsdt={cantidadUsdt}
          cantidadUsdtTotal={cantidadUsdtTotal}
          toggleShow={toggleShow} />} />
          <Route
            path="/dashboard"
            exact
            element={<Dashboard contract = {contract}
             toggleShow={toggleShow} 
             cantidadUsdt = {cantidadUsdt}
             porcentajeDayli = {porcentajeDayli}
             defaultAccount={defaultAccount}
             depositos={depositos}/>}
          />
          <Route
            path="/deposits"
            exact
            element={<Deposits contract = {contract} 
            contractToken ={contractToken}
            depositos ={depositos}
            defaultAccount={defaultAccount}
            connButtonText={connButtonText}
            toggleShow={toggleShow} />}
          />
          <Route
            path="/withdrawn"
            exact
            element={<Withdrawn contract = {contract}
            defaultAccount={defaultAccount} toggleShow={toggleShow} />}
          />
          <Route
            path="/market"
            exact
            element={<Market  toggleShow={toggleShow} />}
          />
          <Route
            path="/calculator"
            exact
            element={<Calculator toggleShow={toggleShow} />}
          />
          <Route path="/admin" element={<Admin toggleShow={toggleShow} />}>
            <Route index element={<AdminDashboard/>} />
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            <Route path="/admin/pdeposits" element={<PendingDeposits/>} />
            <Route path="/admin/adeposits" element={<ApproveDeposits/>} />
            <Route path="/admin/pwithdraws" element={<PendingWithdraws/>} />
            <Route path="/admin/awithdraw" element={<ApproveWithdraws/>} />
            <Route path="/admin/paidwithdraws" element={<PaidWithdraws/>} />
            <Route path="/admin/configuration" element={<SetAdmins/>} />
            <Route path="/admin/calendar" element={<Calendar/>} />


          </Route>
        </Routes>
      </div>
    </Router>
  );
  
}

export default App;
