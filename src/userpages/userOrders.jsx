import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "..";

import { useParams,Navigate } from "react-router-dom";
import "./userOrders.css"; // Import the CSS file

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const { userid } = params;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${url}/userorder/${userid}`);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [userid]);


const handleClick = (id) => {
    const product=orders[id]
  Navigate(`inspectOrder/${orders[id].productid}`,{state:{product}})
}

  return (
    <div className="container">
      <h1>ORDERS</h1>
      {orders.map((order, id) => {
        return (
          <div className="order" key={id}>
       <button> <img src={order.image} alt="Product" onClick={()=>handleClick(id)} /></button>    
            {/* <div className="orderid">Order ID: {order.orderid}</div> */}
            <div className="description">Description: {order.description}</div>
            {/* <div className="NumberofItems">Number of Items: {order.NumberofItems}</div>
            <div className="orderdate">Order Date: {order.orderdate}</div> */}
            <div className="orderstatus">Order Status: {order.orderstatus}</div>
            {/* <div className="productid">Product ID: {order.productid}</div> */}
          </div>
        );
      })}
    </div>
  );
}

export default UserOrders;
