import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { url } from "..";
function ViewOrder()
{
const location=useLocation()
const {product}=location.state
console.log(product.userid);
console.log(product.amounttopay)
console.log(product)

const payHandler = () => {
//     console.log(product.userid);
//     axios.get(`${url}/payment/${product.userid}/${product.orderid}/${product.amounttopay}`)
//       .then((response) => {
// window.open(`${url}/payment/${product.userid}/${product.orderid}/${product.amounttopay}`, '_blank');
//       })
//       .catch((error) => {
//         // Handle any errors that occur during the payment process
//         console.error("Error processing payment:", error);
//         // Optionally, you can show a message to the user indicating the payment failed
//       });
const paymentWindow=window.open(`${url}/payment/${product.userid}/${product.orderid}/${product.amounttopay}`, '_blank');
product.orderstatus="paid";
window.location.reload()
setTimeout(() => {
  paymentWindow.close();
  window.location.reload();
}, 100000);
  };
 
return(
    <div>
        <div><img src={product.image} width="350px" height="400px"/></div>
        <div className="product-description">{product.description}</div>
    <div className="product-attribute">Colours: {product.colours}</div>
    <div className="product-attribute">Fabric: {product.fabric}</div>
    <div className="product-attribute">Fit: {product.fit}</div>
    <div className="product-attribute">Special Attribute: {product.special_attribute}</div>
    <div className="product-attribute">Washing Instructions: {product.washing_instructions}</div>
    <div className="product-price">Approx. Price: {product.approx_price}</div>
    <div className="designer-name">Created by: {product.designername}</div>
    {
        product.orderstatus=="accepted" && 
        <button onClick={()=>payHandler()}>pay here</button>
    }
    {
      product.orderstatus=="paid" &&
      <h2>YOU HAVE PAID </h2>
    }
    </div>
)
}

export default ViewOrder;