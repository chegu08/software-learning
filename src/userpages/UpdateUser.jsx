import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { url } from "..";
import "./UpdateUser.css"
function Updateuser() {
  const [userData, setUserData] = useState({});
  const params = useParams();
  const userid = params.UserID;
  console.log(userData)

const updateuser=()=>{
axios.put(`${url}/homepage/userprofile/update`,{userid:userid,username:userData.username,age:userData.age,gender:userData.gender,phonenumber:userData.phonenumber,mailID:userData.mailID})
.then(()=>{console.log("updated")})
.catch((err)=>{console.log(err)});
}

  useEffect(() => {
    axios.post(`${url}/homepage/userprofile/`, {
        userid: userid,
      })
      .then((res) => {
        console.log(res)
        setUserData(res.data)
      })
      .catch((err) => {
        console.log(err)
      });

  }, [userid]);

  // Handler to update user data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  return (
    <div className="UpdateUserBody">
      <textarea name="username" value={userData.username} onChange={handleChange}></textarea>
      <textarea name="age" value={userData.age} onChange={handleChange}></textarea>
      <textarea name="gender" value={userData.gender} onChange={handleChange}></textarea>
      <textarea name="address" value={userData.address} onChange={handleChange}></textarea>
      <textarea name="phonenumber" value={userData.phonenumber} onChange={handleChange}></textarea>
      <textarea name="emailID" value={userData.mailID} onChange={handleChange}></textarea>
      <button onClick={updateuser}>click here to update</button>
    </div>
  );
}

export default Updateuser;
