import styles from "./page-header.module.css";
import { BiMenu } from "react-icons/bi";


 


const PageHeader = ({ pageName, toggleShow, boton, vault }) => {
  
  
  var isBoton;
  if (boton) {
    isBoton = <div className={styles.divBoton}><button className={styles.botonHeader}>${boton}</button></div>
  }else{
    isBoton = '';
  }


  var isVault;
  if (vault) {
    isVault = <h1 className={styles.pageName}>USDT<span style={{"fontFamily": "sans-serif"}}> / </span>USDT VAULT</h1>;
  }else{
    isVault = <h1 className={styles.pageName}>{pageName}</h1>
  }
  
  return (
    <div className="d-flex justify-content-between">
      {/* <h1 className={styles.pageName}>{pageName}</h1> */}
      {isVault}
      {isBoton}
      <div className={`d-lg-none ${styles.pageName}`} onClick={toggleShow}>
        <BiMenu className={styles.menuIcon} />
      </div>
    </div>
  );
};

export default PageHeader;
