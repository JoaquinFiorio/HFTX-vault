import PageHeader from "../../components/common/page-header/PageHeader";
//import AmountInput from "../../components/common/amount-input/AmountInput";
import styles from "./calculator.module.css";
//import $ from 'jquery';
import React from 'react';
//import ReactDOM from 'react-dom';

/* $(document).ready(function () {

  interval = setInterval(function () {
      if ($('#yt-widget').hasClass('yt-state_mobile')) {
          $('#yt-widget').removeClass('yt-state_mobile')
          clearInterval(interval);
      }
  }, 4000);

}); */


const Calculator = ({ toggleShow }) => {
  
  
 
  




const handleClick= (e) => {
  e.preventDefault()
  calculateCompoundInterest()
}
 
//const results= document.getElementById('results').style.visibility = 'hidden'
//document.getElementById('calc-separator').style.visibility = 'hidden'

function calculateCompoundInterest() {
  let vprincipal = Number(document.getElementById('principal').value);

  let vinterest_rate = Number(document.getElementById('interest_rate').value);
  let vinterest_rate_period = Number(document.getElementById('interest_rate_period').value);
  let vtime = Number(document.getElementById('time').value);
  let vtime_period = Number(document.getElementById('time_period').value);
  let vcompound_interval = Number(document.getElementById('compound_interval').value);
  


  if (vprincipal >= 1 && vinterest_rate > 0 && vtime > 0) {
      let time_in_years = (vtime / vtime_period); // Convert to years
      let interest_rate_in_years = (vinterest_rate * vinterest_rate_period); // Convert to years
      let initial_balance = vprincipal;
      let compound_interest = vprincipal * Math.pow(1 + ((interest_rate_in_years / 100) / vcompound_interval), vcompound_interval * time_in_years);
      let interest_earned = Math.abs(compound_interest - initial_balance);
      document.getElementById('result_final_investment').innerText = '$ ' + compound_interest.toFixed(2);
      document.getElementById('result_interest_earned').innerText = '$ ' + interest_earned.toFixed(2);
      document.getElementById('result_initial_balance').innerText = '$ ' + initial_balance.toFixed(2);
      document.getElementById('results').hidden=false;
      //document.getElementById('results').style.visibility = 'visible'
      //document.getElementById('calc-separator').style.visibility = 'visible'
  }
}

  
  
  
  
  
  //////////////////////////////////////////////////////////////////////////////
  
  return (
    <div className="pageContainer">
      <PageHeader pageName="CALCULATOR" toggleShow={toggleShow} />

      <div className="calc-conteiner">
        <div className="calc">


        <form > 
            <h4>INITIAL BALANCE</h4>
            <div className={styles.initBalance}>
                <input className={styles.firstInput}  type="number" id="principal" />
            </div>

            <h4>INTEREST RATE <span style={{fontFamily:"sans-serif", fontStyle:"italic"}}>(%)</span></h4>
            <div className={styles.interestRate}>
                <input className={styles.secondInput} inputMode="numeric" type="number"  id="interest_rate"/>
                <select className={styles.firstSelect} id="interest_rate_period" >
                  <option value="365">DAILY</option>
                  <option value="52">WEEKLY</option>
                  <option value="12" >MONTHLY</option>
                  <option value="1">YEARLY</option>
                </select>
            </div>
            
            <h4>TIME</h4>
            <div className={styles.time} >
              
              <input className={styles.thirdInput} inputMode="numeric" id="time" type="number"/>
              <select className={styles.secondSelect} id="time_period" >
                  <option value="365">DAYS</option>
                  <option value="52">WEEKS</option>
                  <option value="12" >MONTHS</option>
                  <option value="1">YEARS</option>
              </select>
            </div>
            <div>
              <h4>COMPOUNT INTERVAL</h4>
              <select className={styles.lastSelect} defaultValue={'12'} id="compound_interval" >
                  <option value="365">DAILY</option>
                  <option value="52">WEEKLY</option>
                  <option value="12" >MONTHLY</option>
                  <option value="1">YEARLY</option>
              </select>
            </div>
            <div className={styles.calcButtonContainer}>
              <button className={styles.buttonCalc}  onClick={handleClick}>CALCULATE</button>
            </div>
            <div className={styles.calcResult} hidden={true} id="results">
              <h3>CALCULATION PROJECTION</h3>
                           
              <span className="font-weight-medium text-center">FINAL BALANCE: <strong id="result_final_investment"></strong></span>
              <span className="font-weight-medium text-center">INTEREST EARNED: <strong id="result_interest_earned"></strong></span>
              <span className="text-center">INITIAL BALANCE: <strong id="result_initial_balance"></strong></span>
            </div>
            </form>
          </div>
        </div>
        
     
    </div>
  );
};

export default Calculator;
