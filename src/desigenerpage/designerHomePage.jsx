import React from "react";
import { Link,useParams} from "react-router-dom";
import "./designerHomePage.css"
function DesignerHomePage(){
const params=useParams()

 return(
   <div className="UserHomeBody">
   <div>Designer Home page</div>
   <br />
   <br />
      <Link to={`/Designerprofile/${params.designerID}`}>Click to view profile</Link>
      <br />
      <br />
      <Link to={`/UpdateDesignerProfile/${params.designerID}`}>Click here to update profile</Link>
      <br /><br />
      <Link to={`/addYourDesigns/${params.designerID}`}>click here to upload your designs</Link>
   </div>
  
)
}
export default DesignerHomePage;