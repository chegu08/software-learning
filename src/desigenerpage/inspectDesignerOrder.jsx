import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { url } from "..";
function InspectDesignerOrder(){
const [ordStatus,setOrdStatus]=useState(false)
const [price,setPrice]=useState(0)
const [tendate,settendate]=useState("")
  const params=useLocation()
  const order=params.state;

  if(order.desproduct.orderstatus=="accepted")
  setOrdStatus(true)
  const handleSubmit=()=>{
    let orderstatus="pending"
    if(ordStatus)
    orderstatus="accepted"
    axios.put(`${url}/homepage/designerorder`,{orderid:order.desproduct.orderid,orderstatus:orderstatus,price:price,tentativedate:tendate})
    .then(res=>{
      alert(res.data.message)
    })
    .catch(err=>{
      console.log(err)
    })
  }
return(
  <div>
   <img src={order.desproduct.image} width="350px" height="250px"/>
   {
    order.desproduct.orderstatus=="pending"&&
    <button onClick={()=>{setOrdStatus(true)}}>click here to accept the order</button>
   }
   {
    ordStatus &&
    <input onChange={(event)=>setPrice(event.target.value)} placeholder="enter the price of product" ></input>
   }
   {
    ordStatus &&
    <input placeholder="enter the delivery date" onChange={(event)=>settendate(event.target.value)}></input>
   }
   {
    ordStatus &&
    <button onClick={handleSubmit}>submit</button>
   }
  
  </div>
)
}

export default InspectDesignerOrder;