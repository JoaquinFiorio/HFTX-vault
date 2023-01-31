

import React from "react"



const CoinRow = ({deposito, index})=> {



  return (
      
                    <tr >
                        <td>{deposito.inversor}</td>
                        

                        <td>{deposito.cantidadInvertida1}</td>

                        <td >{deposito.fechaDeEntrada1}</td>

  
                    </tr>
       
      
  );
}

export default CoinRow;
