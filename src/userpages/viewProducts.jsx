import React, { useState } from "react";
import { url } from "..";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useEffect } from "react";
const Body = styled.div`
  padding: 0px;
  margin: 0px;
  font-family: Arial, sans-serif;
`;

const Navbar = styled.div`
  background-color: #000000;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 50px;
  font-family: simplificia;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  background-color: #c8cad3;
  margin-top: 20px;
`;

const ProductImage = styled.div`
  width: 300px;
  height: 280px;
  overflow: hidden;
  border-radius: 10px;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  align-self: center;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  align-items: center;
`;

const Attribute = styled.div`
  font-size: 22px;
  color: #fff3e6bc;
`;

const Price = styled.div`
  font-size: 18px;
  color: #ff3e6c;
  font-weight: bold;
`;

const DesignerName = styled.div`
  font-size: 29px;
  color: #ffd010;
  font-family: SourceSansPro;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  width: 80px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ff3e6c;
  color: #fff;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d6335e;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  width: 100%;
`;

const OrderButton = styled.div`
  display: flex;
  gap: 10px;
`;
const ReviewContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  margin-bottom: 10px;
`;

const Username = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ReviewText = styled.p`
  font-size: 16px;
`;

const Rating = styled.p`
  font-size: 14px;
  color: #666;
`;

function Star({ filled, onClick }) {
  return (
    <span
      style={{ color: filled ? "gold" : "gray", cursor: "pointer" }}
      onClick={onClick}
    >
      ★
    </span>
  );
}

export default function ViewProduct() {
  const { userid, productid } = useParams();
  const location = useLocation();
  const [allReviews,setAllReviews]=useState([])
  const [NumberofItems, setNumberofItems] = useState(1);
  const [review, setReview] = useState("");
  const { param1, param2 } = location.state;
  const [rating, setRating] = useState(0);
  let flag = true;

  useEffect(() => {
    setAllReviews(param2.rev);
  }, []);
console.log(allReviews)
    const addToCart = () => {
    if (!flag) alert("Already added to cart");
    else {
      axios
        .post(`${url}/homepage/addtocart`, {
          userid: userid,
          designerid: param2.designerid,
          productid: productid,
        })
        .then((res) => {
          console.log(res.data);
          flag = false;
          alert("Product added to cart");
        })
        .catch((err) => console.log(err));
    }
  };

  const postReview = () => {
    
    axios
      .put(`${url}/new/productreview`, {
        productid: productid,
        userid: userid,
        designerid: param2.designerid,
        review: review,
        rating,
      })
      .then((res) => alert(res.data.message))
      .catch((err) => console.log(err));
  };

  const buyNow = () => {
    if (!NumberofItems) {
      alert("Please enter the number of items");
    } else {
      axios
        .post(`${url}/userorder`, {
          userid: userid,
          ownproduct: false,
          productid: productid,
          numberofitems: NumberofItems,
          designerid: param2.designerid,
        })
        .then((res) => {
          console.log(res.data);
          // Add any further actions after successful purchase
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <Body>
      <Navbar>
        <div>CRAFT AND STITCHES</div>
      </Navbar>
      <ProductContainer>
        <ProductImage>
          <img src={param1} alt="Product" />
        </ProductImage>
        <ProductDetails>
          <DesignerName> Design By: {param2.designername}</DesignerName>
          <Attribute>Description: {param2.description}</Attribute>
          <Attribute>Colours: {param2.colours}</Attribute>
          <Attribute>Fabric: {param2.fabric}</Attribute>
          <Attribute>Fit: {param2.fit}</Attribute>
          <Attribute>Special Attribute: {param2.special_attribute}</Attribute>
          <Attribute>Washing Instructions: {param2.washing_instructions}</Attribute>
          <Price>Approx. Price: {param2.approx_price}</Price>
          <OrderButton>
            <Input
              type="number"
              placeholder="No. of items"
              value={NumberofItems}
              onChange={(event) => setNumberofItems(event.target.value)}
            />
            <Button onClick={addToCart}>Add to Cart</Button>
            <Button onClick={buyNow}>Buy Now</Button>
          </OrderButton>
        </ProductDetails>
      </ProductContainer>
      <ProductContainer>
        <ProductDetails>
          <div>
            <h1>Rate This</h1>
            {[1, 2, 3, 4, 5].map((value) => (
              <Star key={value} filled={value <= rating} onClick={() => handleStarClick(value)} />
            ))}
            <p>Current Rating: {rating}</p>
          </div>
          <TextArea placeholder="Enter your review" value={review} onChange={(event) => setReview(event.target.value)} />
          <Button onClick={postReview}>Submit</Button>
          <ReviewContainer>
  {allReviews.map((review, index) => (
    <ReviewItem key={index}>
      <Username>{review.username}</Username>
      <ReviewText>{review.review}</ReviewText>
      <Rating>Rating: {review.rating}</Rating>
    </ReviewItem>
  ))}
</ReviewContainer>
        </ProductDetails>
      </ProductContainer>
    </Body>
  );
}
