import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import Product from "./productCard.js"
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";



const Home =()=>{
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, error, products} = useSelector(
        (state) => state.products
    );

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    },[dispatch,error,alert]);
    return(
       <>
       {loading ? (
        <Loader/>
       ):(
        <>
        <MetaData title="SHOP"/>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
            {products.map((product)=><><Product product={product} /></>)}
        </div>
        </>
       )}
       </>
    )
}
export default Home;