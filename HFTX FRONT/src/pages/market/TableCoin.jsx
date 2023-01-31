import React from "react"

import CoinRow from "./CoinRow"


const titles = ["#", "COIN", "PRICE", "PRICE CHANGE"];




const TableCoin = ({coins, search})=> {

   const monedasfiltradas = coins.filter((coin)=> 
   coin.name.toLowerCase().includes(search.toLowerCase()) | 
   coin.symbol.toLowerCase().includes(search.toLowerCase())

   
   )

  return (
        <table className="table table-dark mt-4 table-hover" style={{width: "80%",border: "#00dcffd1",marginLeft: "10%"}}>
            <thead>
                <tr>
                  {
                    titles.map(title =>(
                        <td>{title}</td>
                    ))
                  }
                </tr>
            </thead>
            <tbody>
                {monedasfiltradas.map((coin, index)=>(
                   <CoinRow coin={coin} key={index} index={index + 1}/>
                ))}
            </tbody>

        </table>
  );
}

export default TableCoin;
