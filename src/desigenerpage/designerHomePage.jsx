import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "..";
import styled from "styled-components";

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductItem = styled.div`
  width: calc(25% - 10px);
  margin-bottom: 20px;
  text-align: center;
`;

const ProductImage = styled.img`
  width:200px;
  height: 200px;
`;

function DesignerHomePage() {
  const params = useParams();
  const [designerOrders, setDesignersOrders] = useState([]);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("pending");

  useEffect(() => {
    console.log("Fetching designer orders...");
    axios
      .post(`${url}/new/designerorders/${params.designerID}`)
      .then((res) => {
        console.log("Designer orders:", res.data);
        setDesignersOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching designer orders:", err);
      });
  }, []);

  const handleClick = (num, id) => {
    const desproduct = designerOrders[num].arr[id];

    console.log("hi")
    console.log(desproduct);
    navigate(`/inspectDesignerOrder/${params.designerID}`, {
      state: { desproduct },
    });
  };

  return (
    <div className="UserHomeBody">
      <div>Designer Home page</div>
      <br />
      <br />
      <Link to={`/Designerprofile/${params.designerID}`}>
        Click to view profile
      </Link>
      <br />
      <br />
      <Link to={`/UpdateDesignerProfile/${params.designerID}`}>
        Click here to update profile
      </Link>
      <br />
      <br />
      <Link to={`/addYourDesigns/${params.designerID}`}>
        click here to upload your designs
      </Link>
      <div>
        <select
          value={selectedFilter}
          onChange={(event) => setSelectedFilter(event.target.value)}
        >
          <option value="pending">pending orders</option>
          <option value="accepted">accepted orders</option>
          <option value="paid">paid orders</option>
          <option value="shipped/started">started and shipped orders</option>
          <option value="rejected/cancelled">rejected orders</option>
        </select>
      </div>

      <ProductContainer>
        {selectedFilter === "pending" &&
          designerOrders[0]?.arr.map((items, id) => (
            <ProductItem key={id}>
              <button onClick={() => handleClick(0, id)}>
                <ProductImage src={items.image} alt="" />
              </button>
              <div>{items.username}</div>
              <div>{items.description}</div>
              <div>{items.orderstatus}</div>
            </ProductItem>
          ))}
      </ProductContainer>

      <ProductContainer>
        {selectedFilter === "accepted" &&
          designerOrders[1]?.arr.map((items, id) => (
            <ProductItem key={id}>
              <button onClick={() => handleClick(1, id)}>
                <ProductImage src={items.image} alt="" />
              </button>
              <div>{items.username}</div>
              <div>{items.description}</div>
              <div>{items.orderstatus}</div>
            </ProductItem>
          ))}
      </ProductContainer>
    

      <ProductContainer>
      {selectedFilter==="paid" && designerOrders[2]?.arr.map((items,id)=>{
            return(
               <ProductItem key={id}>
                <button onClick={()=>handleClick(2,id)}><ProductImage id="image"src={items.image} /></button>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </ProductItem>
                  
            )
         })}
      </ProductContainer>
      

{selectedFilter==="shipped/started" && designerOrders[3]?.arr.map((items,id)=>{
            return(
               <ProductItem key={id}>
                <button onClick={()=>handleClick(3,id)}><ProductImage id="image"src={items.image} /></button>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </ProductItem>
                  
            )
         })}

         {selectedFilter==="shipped/started" && designerOrders[4]?.arr.map((items,id)=>{
            return(
               <div key={id}>
                <div ><button onClick={()=>handleClick(4,id)}><img id="image"src={items.image} /></button></div>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </div>
                  
            )
         })}

{selectedFilter==="rejected/cancelled" && designerOrders[5]?.arr.map((items,id)=>{
            return(
               <div key={id}>
                <div ><button onClick={()=>handleClick(5,id)}><img id="image"src={items.image} /></button></div>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </div>
                  
            )
         })}

{selectedFilter==="rejected/cancelled" && designerOrders[6]?.arr.map((items,id)=>{
            return(
               <ProductItem key={id}>
               <button onClick={()=>handleClick(6,id)}><ProductImage id="image"src={items.image} /></button>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </ProductItem>
            )
         })} 

    </div>
  );
}

export default DesignerHomePage;
