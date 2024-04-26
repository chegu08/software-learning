import { useNavigate} from 'react-router-dom';
import axios from "axios"; 
import { useState } from 'react';
import { url } from "..";
function DesignerLoginPage(){
    const navigate=useNavigate()
    const [logindesignerName,setLogindesignerName]=useState("")
    const [loginPassword,setLoginPassword]=useState("")
    const login=()=>{
        axios.post(`${url}/login/logindesigner`,{
         password:loginPassword,
         designername:logindesignerName
        }).then((res)=>{
      if(res.data.message==="Authenticated")
        {alert("welcome to login page")
        const designerId=res.data.designerid
        navigate(`/DesignerHomePage/${designerId}`)
        }
        })
        .catch((err)=>{
          console.log(err)
        });
      };
      return(
        <div>
                  <input placeholder="Enter your designerName" type="text" onChange={(event)=>{setLogindesignerName(event.target.value)}}></input>
                  <input placeholder="ENter your password" type="text" onChange={(event)=>{setLoginPassword(event.target.value)}}></input>
                  <button onClick={login}>login</button>
               </ div>
      )
}



export default DesignerLoginPage;