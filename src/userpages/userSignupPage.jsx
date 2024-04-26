import React from "react";
import { useState } from "react";
import { useNavigate,Link} from 'react-router-dom';
import axios from "axios"; 
import "./userSignupPage.css";
import { url } from "..";

function UserSignupPage(){
  const [username, setUserName] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [phonenumber, setPhonumber] = useState(0);
  const [password, setPassword] = useState("");
  const [mailId, setMailId] = useState("");
  const [img, setImg] = useState(null);


  const uploadImg = (e) => {
      const data = new FileReader();
      data.addEventListener("load", () => {
          setImg(data.result);
      });
      data.readAsDataURL(e.target.files[0]);
  }

    
        const navigate=useNavigate()

        
      
    const addEmployee = () => {
        axios.post(`${url}/signup/createuser`, {
            username: username,
            age: age,
            gender: gender,
            address: address,
            phonenumber: phonenumber,
            password: password,
            mailID: mailId,
            userdp: img,
        }).then((res) => {
            const userid = res.data.userid;
            console.log(userid);
            console.log("data sent");
            navigate(`/UserHomePage/${userid}`);
        })
            .catch((err) => {
                console.error(err);
            });
    }
        
          return (
            <div className="App">
            
              <div className="Information">
            <input placeholder="name" type="text" onChange={(event) => { setUserName(event.target.value) }}></input>
            <input placeholder="age" type="number" onChange={(event) => { setAge(event.target.value) }}></input>
            <input placeholder="address" type="text" onChange={(event) => { setAddress(event.target.value) }}></input>
            <input placeholder="gender" type="text" onChange={(event) => { setGender(event.target.value) }}></input>
            <input placeholder="phnum" type="number" className="wage" onChange={(event) => { setPhonumber(event.target.value) }}></input>
            <input placeholder="password" type="text" onChange={(event) => { setPassword(event.target.value) }}></input>
            <input placeholder="mailID" type="text" onChange={(event) => { setMailId(event.target.value) }}></input>
            <input type="file" accept="image/*" onChange={uploadImg}></input>
            <button onClick={addEmployee} placeholder="upload here">Add employee</button>
               </div>
             <Link to="/UserLoginPage">Click here to Login</Link>
            </div>
          );
  
}
export default UserSignupPage;