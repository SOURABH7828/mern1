import React,{useState} from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css"
import { useNavigate } from "react-router-dom";


const Search = () =>{
   
    const[searchParams, setSearchParams] = useSearchParams();
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate("");
 
   

    const searchSubmitHandler =(e)=>{
        e.preventDefault();
        
        if(keyword){
            navigate(`/products/${keyword}`);
            //setSearchParams({products:keyword} )
        }else{
            navigate("products")
            //setSearchParams({products:""});
            // setSearchParams("/products".replace("search?%2F",""))
        }
    }
    

    return(
        <>
        <MetaData title= "Search A Product --SHOP"/>
       <h1>hello</h1>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text" placeholder="Search a Product..."
                onChange={(e)=> setKeyword(e.target.value)}/>

                <input type="submit" value="Search"/>
            </form>
            
        </>

    )
}
export default Search;