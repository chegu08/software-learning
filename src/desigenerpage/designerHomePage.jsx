import React, { useEffect, useState } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import "./designerHomePage.css"
import axios from "axios";
import { url } from "..";


function DesignerHomePage(){

const params=useParams()
const [designerOrders,setDesignersOrders]=useState([])
const navigate=useNavigate()
const [selectedFilter,setSelectedFilter]=useState("pending")

useEffect(() => {
   console.log("Fetching designer orders...");
   axios.post(`${url}/homepage/designerorders/${params.designerID}`)
     .then( (res) => {
       console.log("Designer orders:", res.data);
       setDesignersOrders(res.data)
     })
     .catch((err) => {
       console.error("Error fetching designer orders:", err);
     });
 }, []);
 
 
  
const handleClick=(num,id)=>{
     const desproduct=designerOrders[num].arr[id]
     console.log(desproduct)
     navigate(`/inspectDesignerOrder/${params.designerID}`,{state:{desproduct}})
}


 return(
   <div className="UserHomeBody">
   <div>Designer Home page</div>
   <br />
   <br />
      <Link to={`/Designerprofile/${params.designerID}`}>Click to view profile</Link>
      <br />
      <br />
      <Link to={`/UpdateDesignerProfile/${params.designerID}`}>Click here to update profile</Link>
      <br /><br />
      <Link to={`/addYourDesigns/${params.designerID}`}>click here to upload your designs</Link>
      <div>
      <select value={selectedFilter} onChange={(event)=>setSelectedFilter(event.target.value)}>
         <option value="pending">pending orders</option>
         <option value="accepted">accepted orders</option>
         <option value="paid">paid orders</option>
         <option value="shipped/started">started and shipped orders</option>
         <option value="rejected/cancelled">rejected orders</option>
      </select>
      </div>
   
      {console.log(designerOrders[0])}
      <div className="order-container">
         { 
         selectedFilter==="pending"&& designerOrders[0]?.arr.map((items,id)=>{
            return(
               <div key={id}>
                <div ><button onClick={()=>handleClick(0,id)}><img id="image"src={items.image} /></button></div>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </div>
            )
         })}

          {selectedFilter==="accepted" && designerOrders[1]?.arr.map((items,id)=>{
            return(
               <div key={id}>
                <div ><button onClick={()=>handleClick(1,id)}><img id="image"src={items.image} className=""/></button></div>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </div>
                  
            )
         })}

         {selectedFilter==="paid" && designerOrders[2]?.arr.map((items,id)=>{
            return(
               <div key={id}>
                <div ><button onClick={()=>handleClick(2,id)}><img id="image"src={items.image} /></button></div>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </div>
                  
            )
         })}

{selectedFilter==="shipped/started" && designerOrders[3]?.arr.map((items,id)=>{
            return(
               <div key={id}>
                <div ><button onClick={()=>handleClick(3,id)}><img id="image"src={items.image} /></button></div>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </div>
                  
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
               <div key={id}>
                <div ><button onClick={()=>handleClick(6,id)}><img id="image"src={items.image} /></button></div>
                <div>{items.username}</div>
                <div>{items.description}</div>
                <div>{items.orderstatus}</div>
                  </div>
            )
         })} 
      </div>
   </div>
  
)
}
export default DesignerHomePage;