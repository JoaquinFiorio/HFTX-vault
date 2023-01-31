import styles from "./amount-input.module.css";

const AmountInput = ({children}) => {
  return (
    
      
    <div style={{
      width: "90%",
      height: "70%",
      backgroundColor: "#141438",
      borderRadius: "10px",
      display:"flex",
      justifyContent:"center",
      color:"white!important",
      fontFamily: "sans-serif",
      fontWeight: 700,
      alignItems:"center",
      fontSize:"40px",
    }}
      >
    {children}
      </div>
    
  
);
};

export default AmountInput;
