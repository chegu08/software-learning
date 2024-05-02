import { useState} from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import { url } from "..";

function UserLoginPage()
{

    const [loginUserName,setLoginUserName]=useState("")
    const [loginPassword,setLoginPassword]=useState("")
      
          const navigate=useNavigate()
  
          const login=()=>{
            axios.post(`${url}/login/loginuser`,{
             password:loginPassword,
             username:loginUserName
          
            }).then((res)=>{
          if(res.data.message==="Authenticated")
            {alert("welcome to login page")
            const userId=res.data.userid
            console.log(userId)
            navigate(`/UserHomePage/${userId}`)
            }
            })
            .catch((err)=>{
              console.log(err)
            });
          };
          return(
            <div>
            <input placeholder="Enter your userName" type="text" onChange={(event)=>{setLoginUserName(event.target.value)}}></input>
            <input placeholder="ENter your password" type="text" onChange={(event)=>{setLoginPassword(event.target.value)}}></input>
            <button onClick={login}>login</button>
         </ div>
          )
}

export default UserLoginPage;