import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { url } from "..";
function ViewOrder()
{
const location=useLocation()
const {product}=location.state

console.log(product.orderid)
const payHandler = () => {
    console.log("ho");
    axios
      .get(`${url}/payment/${product.userid}/${product.orderid}`)
      .then((response) => {
        console.log(response.data);
    const paymentwindow = window.open(`${url}/payment/${product.userid}/${product.orderid}`,"_blank");
        // Close the window after 5 seconds (5000 milliseconds)
        // Optionally, you can use history.push() to navigate to a new route in your React app
      })
      .catch((error) => {
        // Handle any errors that occur during the payment process
        console.error("Error processing payment:", error);
        // Optionally, you can show a message to the user indicating the payment failed
      });
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
    </div>
    
)
}

export default ViewOrder;