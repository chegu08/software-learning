import axios from "axios";
import { useState } from "react";
import "./designerProfile.css"
import { useParams } from "react-router-dom";
import { url } from "..";
function DesignerProfile() {
    const [designerData, setdesignerData]=useState({});
    const params = useParams();
      let designerid=params.designerID;
     console.log(designerid)
  const getDet=()=>{
    axios.post(`${url}/homepage/designerprofile/`,{
        designerid:designerid,
    })
   .then((res)=>{
    console.log(res)
     setdesignerData(res.data)
   })
   .catch((err)=>{
    console.log(err)
   });
}
    return(
        <div className="designerProfileBody">
        <button onClick={getDet}>see Details</button>
         <div>{designerData.designername}</div>
         <div>{designerData.age}</div>
         <div>{designerData.gender}</div>
         <div>{designerData.address}</div>
         <div>{designerData.phonenumber/*phone number must be changed to number*/ }</div>
         <div>{designerData.mailID}</div>
        </div>
    )
};

export default DesignerProfile;
