import React, { useState } from "react";
import { url } from "..";
import { useParams ,useLocation} from "react-router-dom";
import "./ViewProduct.css"; // Import your CSS file
import axios from "axios";
let flag=true

export default function ViewProduct(){
    const [NumberofItems,setNumberofItems]=useState(1)
    const {userid,productid} = useParams();
    const location = useLocation();
    const [review,setReview]=useState("")
    const { param1, param2 } = location.state;
    console.log(userid)
    console.log(param2.designerid)
    console.log(param2.productid)
    const addToCart=()=>{
        if(!flag)
        alert("already added to cart")
       else
      {  axios.post(`${url}/homepage/addtocart`,{userid:userid,designerid:param2.designerid,productid:productid})
        .then((res)=>{
            console.log(res.data);
             flag=false
             alert("Product added to cart")
        })
        .catch((err)=>console.log(err))
    }
    }
 const postReview=()=>{

 } 
 const buyNow = (id) => {
    
  if(!NumberofItems)
  {console.log(NumberofItems)
    alert("Please enter the number of items")
  }
  else
    {axios.post(`${url}/userorder`, {
        userid: userid,
        ownproduct: false,
        productid:productid,
        numberofitems: NumberofItems,
        designerid: param2.designerid
    })
    .then((res) => {
        console.log(res.data);
        // Add any further actions after successful purchase
    })
    .catch((err) => {
        console.log(err);
    })
}
}

    return (
        <div className="product-container">
            <div className="product-image">
                <img src={param1} height="280px" width="300px" alt="Product" />
            </div>
            <div className="wrap-product">
            <div className="product-description">{param2.description}</div>
            <div className="product-attribute">Colours: {param2.colours}</div>
            <div className="product-attribute">Fabric: {param2.fabric}</div>
            <div className="product-attribute">Fit: {param2.fit}</div>
            <div className="product-attribute">Special Attribute: {param2.special_attribute}</div>
            <div className="product-attribute">Washing Instructions: {param2.washing_instructions}</div>
            <div className="product-price">Approx. Price: {param2.approx_price}</div>
            <div className="designer-name">Created by: {param2.designername}</div>
            <input placeholder="enter no of items" value={NumberofItems} onChange={(event)=>setNumberofItems(event.target.value)}></input>
           {  <button onClick={()=>{addToCart()}}>Add to Cart</button> }
            <button onClick={()=>buyNow()}>Buy Now</button>
            <textarea placeholder="enter your reiew" onChange={(event)=>{setReview(event.target.value)}}></textarea>
            <button onClick={postReview}>Submit</button>
            </div>
        </div>
    );
}
