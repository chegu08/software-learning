import axios from "axios";
import "./userProfile.css"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "..";
function UserProfile() {
    const [userData, setUserData]=useState({})
    const params = useParams()
      let userid=params.UserID
      console.log("user id:")
     console.log(userid)

  const getDet=()=>{
    axios.post(`${url}/homepage/userprofile/`,{
        userid:userid,
    })
   .then((res)=>{
    console.log(res)
     setUserData(res.data)
   })
   .catch((err)=>{
    console.log(err)
   });
}
    return(
        <div className="UserProfileBody">
        <button onClick={getDet}>see Details</button>
         <div>{userData.username}</div>
         <div>{userData.age}</div>
         <div>{userData.gender}</div>
         <div>{userData.address}</div>
         <div>{userData.phonenumber/*phone number must be changed to number*/ }</div>
         <div>{userData.mailID}</div>
        <img src={userData.dp} height="200px" width="300px" />
        </div>
    )
};
export default UserProfile;
