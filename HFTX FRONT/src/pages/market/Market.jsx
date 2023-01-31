import PageHeader from "../../components/common/page-header/PageHeader";
import axios from "axios";
import TableCoin from "./TableCoin"
import { useState, useEffect } from "react";

//import styles from "./market.module.css";

const Market = ({ toggleShow }) => {

  const [coins, setCoins] = useState([])

  const [search, setSearch] = useState("")

    const getData = async () => {
      const res =  await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
      setCoins(res.data)
    }

  useEffect(()=>{
  
    getData()


  },[])
  return (
    <div className="pageContainer">
      <PageHeader pageName="MARKET" toggleShow={toggleShow} />
                <div className="container">
            <div className='row' style={{overflowX: "scroll"}}> 
            <TableCoin coins={coins} search={search}/>
            </div>
    </div>
    </div>
  );
};

export default Market;
