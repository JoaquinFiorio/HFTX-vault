import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import styles from "./navigation.module.css";
import logo from "../../../assets/images/LOGOSTAKE.png";
import item1 from "../../../assets/images/item1.png";
import item2 from "../../../assets/images/item2.png";
import item3 from "../../../assets/images/item3.png";
import item4 from "../../../assets/images/item4.png";
import item5 from "../../../assets/images/item5.png";
import item6 from "../../../assets/images/item6.png";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, fetchErrorReset, logout } from "../../../redux/conecctionAction";
import { fetchMessage, fetchUserDeposits, getRewardHistory, loginToken } from "../../../redux/userActions";
import Swal from "sweetalert2";
import { loadAdminData } from "../../../redux/adminAction";
import { loadAppData } from "../../../redux/appDataActions";


const Navigation = ({ show, handleClose, toggleShow, accountChangedHandler, connButtonText,setConnButtonText }) => {

  const dispatch = useDispatch();

  const { isConnected, wallet, USDT_CONTRACT, APP_CONTRACT, loading, error, errorMessages, } = useSelector((state) => state.blockchain);
  const {userLoaded, user} = useSelector((state) => state.user);
  const { totalWorkingBalance, apyHistory, apyHistoryLoaded } = useSelector((state) => state.data);




  useEffect(() => {
    if(error){
      alert(errorMessages)
    }
    dispatch(fetchErrorReset())
  }, [error])


  useEffect(() => {
    if(isConnected && !userLoaded){
      dispatch(fetchMessage())
    }
  }, [isConnected, userLoaded])

  useEffect(() => {
    if(localStorage.getItem("verification-token") && !userLoaded){
      dispatch(loginToken())
    }
  }, [userLoaded])


  useEffect(() => {
    if(!isConnected && userLoaded){
      dispatch(connectWallet());
    }
  }, [isConnected, userLoaded])


  useEffect(() => {
    if (userLoaded) {
      dispatch(fetchUserDeposits());
    }
  }, [userLoaded]);


  useEffect(() => {
    if(!apyHistoryLoaded){
      dispatch(getRewardHistory());
      dispatch(loadAppData());
    }
  }, [apyHistoryLoaded]);
 
  const connectWalletHandler = async() => {
    dispatch(connectWallet());
  }


  const { width } = useWindowDimensions();
  const [links, setLinks] = useState([
    {
      name: "VAULT",
      icon: item2,
      isSelected: true,
      to: "/",
      
    },
    {
      name: "DASHBOARD",
      icon: item4,
      isSelected: false,
      to: "/dashboard",
    },
    {
      name: "DEPOSITS",
      icon: item3,
      isSelected: false,
      to: "/deposits",
    },
    {
      name: "WITHDRAW",
      icon: item1,
      isSelected: false,
      to: "/withdrawn",
    },
    {
      name: "MARKET",
      icon: item5,
      isSelected: false,
      to: "/market",
    },
    {
      name: "CALCULATOR",
      icon: item6,
      isSelected: false,
      to: "/calculator",
    }
  ]);

  useEffect(() => {
    if(userLoaded){
      if(user.role === "admin"){
        setLinks([
          {
            name: "VAULT",
            icon: item2,
            isSelected: true,
            to: "/",
            
          },
          {
            name: "DASHBOARD",
            icon: item4,
            isSelected: false,
            to: "/dashboard",
          },
          {
            name: "DEPOSITS",
            icon: item3,
            isSelected: false,
            to: "/deposits",
          },
          {
            name: "WITHDRAW",
            icon: item1,
            isSelected: false,
            to: "/withdrawn",
          },
          {
            name: "MARKET",
            icon: item5,
            isSelected: false,
            to: "/market",
          },
          {
            name: "CALCULATOR",
            icon: item6,
            isSelected: false,
            to: "/calculator",
          },
          {
            name: "Admin Panel",
            icon: item4,
            isSelected: false,
            to: "/admin",
          }
        ])

      }else{
        setLinks([
          {
            name: "VAULT",
            icon: item2,
            isSelected: true,
            to: "/",
            
          },
          {
            name: "DASHBOARD",
            icon: item4,
            isSelected: false,
            to: "/dashboard",
          },
          {
            name: "DEPOSITS",
            icon: item3,
            isSelected: false,
            to: "/deposits",
          },
          {
            name: "WITHDRAW",
            icon: item1,
            isSelected: false,
            to: "/withdrawn",
          },
          {
            name: "MARKET",
            icon: item5,
            isSelected: false,
            to: "/market",
          },
          {
            name: "CALCULATOR",
            icon: item6,
            isSelected: false,
            to: "/calculator",
          }
        ])
      }
    }else{
      setLinks([
        {
          name: "VAULT",
          icon: item2,
          isSelected: true,
          to: "/",
          
        },
        {
          name: "DASHBOARD",
          icon: item4,
          isSelected: false,
          to: "/dashboard",
        },
        {
          name: "DEPOSITS",
          icon: item3,
          isSelected: false,
          to: "/deposits",
        },
        {
          name: "WITHDRAW",
          icon: item1,
          isSelected: false,
          to: "/withdrawn",
        },
        {
          name: "MARKET",
          icon: item5,
          isSelected: false,
          to: "/market",
        },
        {
          name: "CALCULATOR",
          icon: item6,
          isSelected: false,
          to: "/calculator",
        }
      ])
    }
  }, [userLoaded])


  const onSelect = (id) => {
    setLinks(
      links.map((link, index) => {
        if (index === id) return { ...link, isSelected: true };
        else return { ...link, isSelected: false };
      })
    );
  };

  const handleClick = () => {
    if (width <= 993) {
      toggleShow();
    } else return;
  };

  const walletSlice = (wallet) => {
    if (wallet) {
      return wallet.slice(0, 6) + "..." + wallet.slice(-4);
    }
  };

  const loginOutHandler = () => {
    dispatch(logout());
    Swal.fire({
      title: "Logged out successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  }


  return (
    <>
   
      <Offcanvas
        show={width>=992?true:show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}

        
      >
        <Offcanvas.Body className={styles.navMenu}>
          <MdClose
            onClick={toggleShow}
            className={`d-sm-none ${styles.toggleButton}`}
          />
          <div className={styles.navContainer}>
            
            <img src={logo} alt="company logo" className={styles.logo} />
    
            <button className={styles.linkSelected} style={{color: "white", 
            padding:"20px 35px",
            fontSize: "13px",
            backgroundColor:"#282828",
            border:"none",
            margin:"-20px auto",
            marginBottom: "80px",
            fontFamily: "sans-serif",
            fontWeight: "900",
            borderRadius: "5px",
            
            }} onClick={connectWalletHandler}>{isConnected? walletSlice(wallet): 'CONNECT WALLET'}</button>


            {links.map((link, index) => {
              return (
                <Link key={index} to={link.to} className={styles.linksDecoration} onClick={handleClick}>
                  <div className={link.isSelected ? styles.linkSelected : styles.link} onClick={() => onSelect(index)}>
                    <img src={link.icon} alt="link icons" className={styles.icons}/>
                    <h5 className={styles.navLinks}>{link.name}</h5>
                  </div>
                </Link>
              );
            })}
          </div>
          <button className="btn btn-danger"
          onClick={loginOutHandler}
            style={{
              padding:"15px 35px",
              color: "white",
              fontSize: "18px",
              backgroundColor:"#d40404",
              border:"none",
              borderRadius: "5px",
              width: "97%",
              margin: "30px 0 30px 4px",
            }}
            >LOGOUT</button>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;
