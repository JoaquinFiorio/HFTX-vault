import React from "react"



const CoinRow = ({coin, index})=> {



  return (
      
                    <tr >
                        <td>{index}</td>
                        <td>
                           <img src={coin.image} alt={coin.name} style={{width:"3%"}} className="me-4" /> 
                            <span>{coin.name}</span>
                           <span className="ms-3 text-muted text-uppercase">{coin.symbol}</span> </td>

                        <td style={{fontFamily:"cursive"}}>${coin.current_price}</td>

                        <td style={{fontFamily:"cursive"}} className={coin.price_change_24h > 0 ? "text-success" : "text-danger"}>

                            {coin.price_change_24h}
                            
                            
                            </td>
                    </tr>
       
      
  );
}

export default CoinRow;
