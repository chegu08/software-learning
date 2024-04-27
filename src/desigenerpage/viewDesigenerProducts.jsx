import { useLocation } from "react-router-dom";

function ViewDesProducts(){

const location=useLocation
const {product}=location.state


return(
    <div>
        <img src={product.image}/>
    </div>
)


}

export default ViewDesProducts;