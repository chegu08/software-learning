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
`;

const HomeLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: #666;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #999;
    }
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
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
  max-width: 100%;
  max-height: 200px; /* Adjust as needed */
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

function UserHomePage() {
  const params = useParams();
  const userid = params.UserID;
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totProducts, setTotProducts] = useState(0);
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
    axios.post(`${url}/homepage/${allProducts[id].productid}`).then((res) => {
      const prodimg = allProducts[id].image;
      navigate(`/${userid}/${allProducts[id].productid}`, { state: { param1: prodimg, param2: res.data } });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <UserHomeBody>
      <NavBar>
        <HomePageText>HOMEPAGE</HomePageText>
      </NavBar>
      <HomeLinks>
        <Link to={`/UserProfile/${params.UserID}`}>View Profile</Link>
        <Link to={`/UpdateUserProfile/${params.UserID}`}>Update Profile</Link>
        <Link to={`/cart/${userid}`}>Cart</Link>
        <Link to={`/userOrders/${params.UserID}`}>View Orders</Link>
      </HomeLinks>
      <ProductContainer>
        {allProducts.map((product, id) => (
          <div key={id}>
            <ProductButton onClick={() => inspectProduct(id)}>
              <ProductImage src={product.image} alt="Product" />
            </ProductButton>
            <div>{product.productid}</div>
            <div>{product.designerid}</div>
            <div>{product.approx_price}</div>
          </div>
        ))}
      </ProductContainer>
      {totProducts > (currentPage + 1) * 20 && <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next Page</button>}
      {currentPage > 0 && <button onClick={() => setCurrentPage((prev) => prev - 1)}>Previous Page</button>}
    </UserHomeBody>
  );
}

export default UserHomePage;
