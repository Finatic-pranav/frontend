import React, { useState,useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";

const style = [
  { backgroundColor: "green", color: "white" },
  { backgroundColor: "white", color: "black" },
];
const datas = [
  {
    name: "Dashboard",
    logo: DashboardIcon,
    clicked:true
  },
  {
    name: "Accounts",
    logo: AccountBalanceWalletIcon,
    clicked:false
  },
  {
    name: "Payroll",
    logo: AttachMoneyOutlinedIcon,
    clicked:false
  },
  {
    name: "Reports",
    logo: DescriptionIcon,
    clicked:false
  },
  {
    name: "Advisor",
    logo: PersonIcon,
    clicked:false
  },
  {
    name: "Contacts",
    logo: ContactsIcon,
    clicked:false
  },
];

export default function ListItems() {
  const [press,setPress] = useState(datas)
  let a
  useEffect(()=>{
    console.log('useeffect')
  },[press])
  function handelClick(clickedIndex){
    a = press
    a.map((item,index)=>index ===clickedIndex ? item.clicked = true : item.clicked = false)
    setPress([...a])
  }  

  return (
    <>
      {press.map((data,index) => {
        return (
          <ListItemButton key={index} style={data.clicked ? style[0] : style[1]} onClick={()=>handelClick(index)}>
            <ListItemIcon>
              <data.logo style={data.clicked ? style[0] : style[1]} />
            </ListItemIcon>
            <ListItemText primary={`${data.name}`} />
          </ListItemButton>
        );
      })}
    </>
  );
}
