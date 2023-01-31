import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from "./tab.module.css";


function EjemploTab() {
  return (
    <Tabs
      defaultActiveKey="TLV"
      id="uncontrolled-tab"
      className={styles.color}
      
      
    >
      <Tab eventKey="TLV" title="TLV" >
        <h1 className={styles.nameTab}>Grafico 1</h1>
      </Tab>
      <Tab eventKey="APY" title="APY">
      <h1 className={styles.nameTab}>Grafico 2</h1>
      </Tab>
      <Tab eventKey="DAILY" title="DAILY">
      <h1 className={styles.nameTab}>Grafico 3</h1>
      </Tab>
    </Tabs>
  );
}

export default EjemploTab;