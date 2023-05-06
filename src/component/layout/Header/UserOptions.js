import React, { useState } from "react";
import "./Header.css"
import {Backdrop, SpeedDial, SpeedDialAction,} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person4Icon from '@mui/icons-material/Person4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
import {logout} from "../../../actions/userAction"
import {useDispatch, useSelector} from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAlert } from "react-alert";

const UserOption = ({user})=>{
    const{ cartItems}=useSelector((state)=>state.cart)
    const alert = useAlert();

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const option=[
        {icon: <ListAltIcon/>, name:"Orders", func:orders },
        {icon: <Person4Icon/>, name:"Profile", func: account},
        {icon: <ShoppingCartIcon style={{color: cartItems.length>0 ? "tomato" :"unset"}}/>, name:`Cart(${cartItems.length})`, func: cart},
        {icon: <ExitToAppIcon/>, name:"Logout", func: logoutUser},
    ];

    if(user.role === "admin"){
        option.unshift({
            icon: <DashboardIcon />,
            name:"Dashbord",
            func:deshboard,
        })
    }
    function deshboard (){
        navigate("/admin/dashboard")
    }

    function orders (){
        navigate("/orders")
    }

    function account(){
        navigate("/account")
    }

    function cart(){
        navigate("/cart");
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully")
    }



    return(
       <>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
            ariaLabel="SpeedDial tooltip exampal"
            onClose={()=>setOpen(false)}
            onOpen={()=> setOpen(true)}
            style={{zIndex:"11"}}
            open={open}
            direction="down"
            className="speedDial"
            icon={
                <img
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url: "/Profile.png"}
                alt="Profile"
                />
            }
        >
          {option.map((item)=>(
            <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          ))}
        </SpeedDial>
       </>
    )
}
export default UserOption;