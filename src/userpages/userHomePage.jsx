import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./userHomePage.css";
import {url} from ".."

function UserHomePage() {
   const params=useParams()
   const userid=params.UserID
   //  console.log(userid)
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totProducts, setTotProducts] = useState(0);
const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
    
      try {
        const currData = sessionStorage.getItem(`${currentPage}Data`);

        console.log(currData)
        if (currData) {
          setAllProducts(JSON.parse(currData));
          console.log("wtf")
        } else {
          const response = await axios.post(`${url}/homepage`, { count: currentPage });
          const responseData = response.data;
          setAllProducts(responseData.cur_page_products);
          setTotProducts(responseData.total_products);
          console.log(allProducts)
          sessionStorage.setItem(`${currentPage}Data`, JSON.stringify(responseData.cur_page_products));
    }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]); // Add currentPage as a dependency

  const clearSessionStorage = () => {
    sessionStorage.removeItem(`${currentPage}Data`);
    console.log("Cleared sessionStorage");
  };

  window.addEventListener("beforeunload", clearSessionStorage);
const inspectproduct=(id)=>{
axios.post(`${url}/homepage/${allProducts[id].productid}`).then((res)=>{
   const prodimg=allProducts[id].image

   navigate(`/${userid}/${allProducts[id].productid}`,{state:{param1:prodimg,param2:res.data}
})
   console.log(res)
}
).catch((err)=>console.log(err))
}

  return (
    
    <div className="UserHomeBody">
      <div>Home page</div>
     <div className="homediv">
      <Link to={`/UserProfile/${params.UserID}`}>Click to view profile</Link>
      <Link to={`/UpdateUserProfile/${params.UserID}`}>Click here to update profile</Link>
      <Link to={`/cart/${userid}`}> Click here to see Cart </Link>
      <Link to={`/userOrders/${params.UserID}`}>Click here to view your orders</Link>
      </div>
      <div>
        {
      
        allProducts.map((product, id) => (
          <div key={id}>
          <button className="img_button" onClick={()=>inspectproduct(id)}>  <img src={product.image} height="200px" width="250px" alt="Product" /> </button>
            <div>{product.productid}</div>
            <div>{product.designerid}</div>
            <div>{product.approx_price}</div>
          </div>
        )) 
        }
      </div>
      {totProducts > (currentPage + 1) * 20 && <button onClick={() => setCurrentPage(prev => prev + 1)}>Next Page</button>}
      {currentPage > 0 && <button onClick={() => setCurrentPage(prev => prev - 1)}>Previous Page</button>}
    </div>
  );
}

export default UserHomePage;
