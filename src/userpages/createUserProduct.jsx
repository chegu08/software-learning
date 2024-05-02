import { useState } from "react"
import axios from "axios"
import { url } from ".."
import { useParams } from "react-router-dom"
function CreateUserProduct(){
 
    const [description,setDescription]=useState("")
    const [fabric,setFabric]=useState("")
    const [specialAttributes,setSpecialAttributes]=useState(null)
    const [fit,setFit]=useState("")
    const [colours,setColours]=useState("")
    const [washingInstructions,setWashingInstructions]=useState("")
    const [approxPrice,setApproxPrice]=useState(null)
    const [img ,setimg]=useState(null)
  
   const params=useParams()
   const userid=params.userid
  console.log(userid)
   const handleImageChange=(event)=> {
      const file = event.target.files[0]; // Get the selected file
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const base64 = event.target.result;
        setimg(base64); // Store the base64 image data in state
      };
  
      reader.readAsDataURL(file);
      console.log(img) // Read the file as a data URL
    }
    
    const uploadProduct=()=>{
      if(!img)
      {
        alert("please upload an image")
        return
      }
      else
       {axios.post(`${url}/homepage/addtocart`,{
        // designerid:null,
        userid:userid,
        description:description,
        fabric:fabric,
        specialattribute:specialAttributes,
        fit:fit,
        colors:colours,
        washinginstructions:null,
        image:img,
        
       }).then((res)=>{
        console.log("product addded to cart")
          alert(res.data.message)
     })
       .catch((err)=>console.log(err))}
    }
  
  return(
      <div className="createProductBody">
        <input placeholder="enter the description of the product" onChange={(event)=>{setDescription(event.target.value)}}></input>
        <input placeholder="fabric used" onChange={(event)=>{setFabric(event.target.value)}}></input>
        <input placeholder="special attributes" onChange={(event)=>{setSpecialAttributes(event.target.value)}}></input>
        <input placeholder="fit" onChange={(event)=>{setFit(event.target.value)}}></input>
        <input placeholder="colours/designs available" onChange={(event)=>{setColours(event.target.value)}}></input>
        <input placeholder="washing instructions" onChange={(event)=>{setWashingInstructions(event.target.value)}}></input>
  
        <div>  <input type="file" accept="image/*" onChange={handleImageChange}></input></div>
       { img ? <img src={img} width="500px" height="500px"></img>:null}
       <button onClick={()=>uploadProduct()}>Upload design</button> 
      </div>
  )
}

export default CreateUserProduct;