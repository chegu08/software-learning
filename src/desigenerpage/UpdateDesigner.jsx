import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { url } from "..";
import "./updateDesigner.css"
function Updatedesigner() {
  const [designerData, setDesignerData] = useState({});
  const params = useParams();
  const designerid = params.designerID;
  console.log(designerData)

const updatedesigner=()=>{
axios.put(`${url}/homepage/designerprofile/update`,{designerid:designerid,designername:designerData.designername,age:designerData.age,gender:designerData.gender,phonenumber:designerData.phonenumber,mailID:designerData.mailID})
.then(()=>{console.log("updated")})
.catch((err)=>{console.log(err)});
}

  useEffect(() => {
    axios.post(`${url}/homepage/designerprofile/`, {
        designerid: designerid,
      })
      .then((res) => {
        console.log(res)
        setDesignerData(res.data)
      })
      .catch((err) => {
        console.log(err)
      });

  }, [designerid]);

  // Handler to update designer data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDesignerData(prevdesignerData => ({
      ...prevdesignerData,
      [name]: value
    }));
  };

  return (
    <div className="UpdatedesignerBody">
      <textarea name="designername" value={designerData.designername} onChange={handleChange}></textarea>
      <textarea name="age" value={designerData.age} onChange={handleChange}></textarea>
      <textarea name="gender" value={designerData.gender} onChange={handleChange}></textarea>
      <textarea name="address" value={designerData.address} onChange={handleChange}></textarea>
      <textarea name="phonenumber" value={designerData.phonenumber} onChange={handleChange}></textarea>
      <textarea name="emailID" value={designerData.mailID} onChange={handleChange}></textarea>
      <button onClick={updatedesigner}>click here to update</button>
    </div>
  );
}

export default Updatedesigner;
