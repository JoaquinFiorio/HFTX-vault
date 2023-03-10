import React from 'react'
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Filler, 
    Legend
} from 'chart.js';

import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title, 
    Tooltip, 
    Filler, 
    Legend
);




const Tvl = ({labels, DATA}) => {

    const options = {
        responsive:true, 
        plugins: {
            legend: {
                display: false
            },
            title:{
                display: false,
                text: "Chart.js line Chart",           
            },
        }
    }

    const data = {
        labels,
        datasets:[
            {
                fill: true,
                label: 'TVL',
                data: DATA, 
                borderColor:  'rgb(53, 162, 235)',
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                
               
                
            }
        ]
    }
        
    
  return (
    <Line options={options} data={data} />
  )
}

export default Tvl