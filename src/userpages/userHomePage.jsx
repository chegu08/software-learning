import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { url } from "..";

const UserHomeBody = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 0;
  margin-bottom: 20px;
  .nav-link {
    color: white;
    text-decoration: none;
   
  }
  transition: transform 0.3s ease; /* Add transition for sliding effect */
  transform: translateY(0); /* Initially keep it at its original position */

  @media (max-width: 768px) { /* Adjust max-width as needed */
    transform: translateY(-100%); /* Move the navbar above the viewport */
  }
  gap:850px;

`;

const HomeLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }
`;
const ProductContainer = styled.div`
  display: flex;
  justify-content:space-around;
  flex-wrap: wrap; /* Allow items to wrap onto multiple lines */
  max-width: 100%;
  gap:30px;
`;

const ProductButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductImage = styled.img`
  max-width: 200px;
  max-height: 200px; /* Adjust as needed */
  width: auto;
  height: auto;
  border-radius: 5px;
`;

const TopButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HomePageText = styled.h1`
  text-align: center;
  color: #333;
`;

const ProductInfo = styled.div`
  background-color: #8b5d5d;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const ProductId = styled.div`
  font-weight: bold;
`;

const ProductDetail = styled.div`
  margin-top: 5px;
`;
function UserHomePage() {
  const params = useParams();
  const userid = params.UserID;
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totProducts, setTotProducts] = useState(0);
  const [link,setLink]=useState(null)
  const navigate = useNavigate();

    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currData = sessionStorage.getItem(`${currentPage}Data`);
        if (currData) {
          setAllProducts(JSON.parse(currData));
        } else {
          const response = await axios.post(`${url}/homepage`, { count: currentPage });
          const responseData = response.data;
          setAllProducts(responseData.cur_page_products);
          setTotProducts(responseData.total_products);
          sessionStorage.setItem(`${currentPage}Data`, JSON.stringify(responseData.cur_page_products));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const clearSessionStorage = () => {
    sessionStorage.removeItem(`${currentPage}Data`);
  };

  window.addEventListener("beforeunload", clearSessionStorage);

  const inspectProduct = (id) => {
    axios.post(`${url}/new/${allProducts[id].productid}`).then((res) => {
      const prodimg = allProducts[id].image;
      console.log(res.data)
      navigate(`/${userid}/${allProducts[id].productid}`, { state: { param1: prodimg, param2: res.data } });
    }).catch((err) => {
      console.log(err);
    });
  };




const lastCall=async (link)=>{
  axios.post(`${url}/image/download/${link}`)
  .then((res2)=>console.log(res2.data))
.catch((err)=>console.log(err))
}

const getimage =  () => {
 navigate("/genimg");
}


// Set interval to call sendRequestAndUpdateStatus every 2 seconds until imgStatus is 3

console.log(allProducts[0])
  return (
    <UserHomeBody>
      <NavBar>
        <HomePageText>HOMEPAGE</HomePageText>
        <Link to={`/cart/${userid}`}>Cart</Link>
        <HomeLinks>
        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
            <Link to={`/UserProfile/${params.UserID}`}>View Profile</Link>
            <Link to={`/UpdateUserProfile/${params.UserID}`}>Update Profile</Link>
        
            <Link to={`/userOrders/${params.UserID}`}>View Orders</Link>
          </div>
        </div>
      </HomeLinks>
      </NavBar>
      
      <ProductContainer>
        {allProducts.map((product, id) => (
          <div key={id}>
          <button onClick={()=>inspectProduct(id)} style={{"border": "none", "backgroundColor": "#666", "color": "white", "padding": "8px 16px", "borderRadius": "5px", "cursor": "pointer", "transition": "backgroundColor 0.3s ease"}}>
          <ProductButton>
              <ProductImage src={product.image} alt="Product" />
            </ProductButton >
            <ProductInfo>
              <ProductId>Name: {product.description}</ProductId>
              <ProductDetail>Designer ID: {product.designerid}</ProductDetail>
              <ProductDetail>Approx Price: {product.approx_price}</ProductDetail>
            </ProductInfo>
          </button>
          </div>
        ))}
      </ProductContainer>
      {totProducts > (currentPage + 1) * 20 && <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next Page</button>}
      {currentPage > 0 && <button onClick={() => setCurrentPage((prev) => prev - 1)}>Previous Page</button>}
      <button onClick={()=>getimage()}>create image</button>
    </UserHomeBody>
  );
}

export default UserHomePage;