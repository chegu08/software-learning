import React from "react";
import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios"; 
import { url } from "..";
function DesignerSignupPage(){
        const [designername,setdesignerName]=useState('')
        const [age,setAge]=useState(0)
        const [adddress,setAddress]=useState('')
        const [gender,setGender]=useState('')
        const [phonenumber,setPhonumber]=useState(0)
        const  [password,setPassword]=useState("")
        const [mailId,setMaliId]=useState("")
      
        const [img,setimg]=useState("")
        const uploadImg=(e)=>{//the img is uploaded to the backend as a base64 string
          const data=new FileReader
          data.addEventListener("load",()=>{
            setimg(data.result)
          })
          data.readAsDataURL(e.target.files[0])
   }
        const navigate=useNavigate()
     
        const addDesigner=()=>{
         
          axios.post(`${url}/signup/createdesigner`,{
            designername:designername,
          age:age,
             gender:gender,
           address:adddress,
           phonenumber:phonenumber,
         password:password,
      mailID:mailId
          }).then((res)=>{
            const designerid=res.data.id
            console.log("data sent")
            navigate(`/DesignerHomePage/${designerid}`)
          })
          .catch((err)=>{
            console.error(err);
          });
        };
        
          return (
            <div className="App">
              <div>
              <div className="Information">
                <input placeholder="name" type="text" onChange={(event)=>{setdesignerName(event.target.value)}}></input>
                <input placeholder="age" type="number" onChange={(event)=>{setAge(event.target.value)}}></input>
                <input placeholder="address" type="text" onChange={(event)=>{setAddress(event.target.value)}}></input>
                <input placeholder="gender" type="text" onChange={(event)=>{setGender(event.target.value)}}></input>
                <input placeholder="phnum "type="number" className="wage" onChange={(event)=>{setPhonumber(event.target.value)}}></input>
                <input placeholder="password" type="password" onChange={(event)=>{setPassword(event.target.value)}}></input>
                <input placeholder="mailID" type="text" onChange={(event)=>{setMaliId(event.target.value)}}></input>
                <input type="file" accept="image/*" onChange={uploadImg}></input>
                <button onClick={addDesigner}>Add employee</button>
        
               </div>
               <Link to="/designerLoginPage">Click here to go to Login Page</Link>
               </div>
            </div>
          );
  
  
}
export default DesignerSignupPage;