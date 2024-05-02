import { url } from ".."
import axios from "axios"
import { useParams } from "react-router-dom"
import { useState } from "react"
function CreateProduct(){
  const params=useParams()
  const designerid=params.designerID
  const [description,setDescription]=useState("")
  const [fabric,setFabric]=useState("")
  const [specialAttributes,setSpecialAttributes]=useState(null)
  const [fit,setFit]=useState("")
  const [colours,setColours]=useState("")
  const [washingInstructions,setWashingInstructions]=useState("")
  const [approxPrice,setApproxPrice]=useState(null)
  const [img ,setimg]=useState(null)


 const handleImageChange=(event)=> {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const base64 = event.target.result;
      setimg(base64); // Store the base64 image data in state
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  }
  console.log(designerid)
  const uploadProduct=()=>{
    
     axios.post(`${url}/homepage/createproduct`,{
      designerid:designerid,
      description:description,
      fabric:fabric,
      specialAttributes:specialAttributes,
      fit:fit,
      colours:colours,
      washingInstructions:washingInstructions,
      approxPrice:approxPrice,
      productImage:img
     }).then((res)=>{console.log("product addded to database")
     console.log(designerid)
   })
     .catch((err)=>console.log(err))
  }

return(
    <div className="createProductBody">
      <input placeholder="enter the description of the product" onChange={(event)=>{setDescription(event.target.value)}}></input>
      <input placeholder="fabric used" onChange={(event)=>{setFabric(event.target.value)}}></input>
      <input placeholder="special attributes" onChange={(event)=>{setSpecialAttributes(event.target.value)}}></input>
      <input placeholder="fit" onChange={(event)=>{setFit(event.target.value)}}></input>
      <input placeholder="colours/designs available" onChange={(event)=>{setColours(event.target.value)}}></input>
      <input placeholder="washing instructions" onChange={(event)=>{setWashingInstructions(event.target.value)}}></input>
      <input placeholder="approx price" onChange={(event)=>{setApproxPrice(event.target.value)}}></input>
      <div>  <input type="file" accept="image/*" onChange={handleImageChange}></input></div>
     { img ? <img src={img} width="500px" height="500px"></img>:null}
      <button onClick={uploadProduct}>Upload design</button>
      

    </div>
)
}
export default CreateProduct;