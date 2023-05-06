 import React, { useEffect, useState } from "react";
 import Carousel from "react-material-ui-carousel";
 
 import "./ProductDetails.css"
 import {useSelector, useDispatch} from "react-redux";
 import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
 import { useParams } from "react-router-dom";
 import { useAlert } from "react-alert";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
} from "@mui/material"
import {Rating} from "@mui/material"
import { NEW_REVIEW_RESET } from "../../constants/productConstants";


const ProductDetails = ()=>{
        const {id}= useParams();
      const alert = useAlert();
     const dispatch = useDispatch();
    
    const {product, loading, error} = useSelector((state)=> state.productDetails);
        
    const {success, error: reviewError} = useSelector(
        (state) => state.newReview
    )
     
     const option={
        edit: false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth <600 ? 20:25,
        value: product.ratings,
        isHalf:true,
     }
     const [quantity, setQuantity]= useState(1);
     const [open, setOpen] = useState(false);
     const [rating, setRating]= useState(0);
     const[comment, setComment]= useState("");


     const increaseQuntity = ()=>{
        if(product.Stock <= quantity) return;

        const qty = quantity +1;
        setQuantity(qty);
     };

     const decreaseQuantity=()=>{
        if(1 >= quantity) return;
        const qty = quantity -1;
        setQuantity(qty);
     };

     const addToCartHandler =()=>{
        dispatch(addItemsToCart(id, quantity));
       
        alert.success("Item Added To Cart")
     };
     const submitReviewToggle = ()=>{
        open ? setOpen(false):setOpen(true);
     }
     const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };
    
              
     useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type: NEW_REVIEW_RESET});
        }
    dispatch(getProductDetails(id))
     },[dispatch, error, id,alert, reviewError, success]);


    return(
        <>
            {loading ? <Loader /> : 
                    <>
                    <MetaData title= {`${product.name} --SHOP`}/>
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                               
                                {
                                    product.images && product.images.map((item, i)=>(
                                        < img className="CarouselImage" key={item.url}  src={item.url} alt={`${i} Slide`} />
                                    ))
                                }
                            </Carousel>
                        </div>
            
                   <div>
                    <div className="ditailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <ReactStars {...option}/>
                        <span>({product.numOfReviews} Reviews)</span>
            
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="deailsBlock-3-1-1">
                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly value={quantity} type="number" />
                                <button onClick={increaseQuntity}>+</button>
                            </div>
                            <button  onClick={addToCartHandler}>Add to Card</button>
                        </div>
            
                        <p>
                            Status:
                            <b className={product.Stock <1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
            
                    <div className="detailsBlock-4">
                        Description: <p>{product.description}</p>
                    </div>
                    <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                    </div>
                    </div>
            
                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
            
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && 
                             product.reviews.map((review)=> <ReviewCard review={review}/>)}
                        </div>):(
                            <p className="noReviews">No Reviews Yet</p>
                        )
                    }
                    </>}
        </>
    )
}
export default ProductDetails;
