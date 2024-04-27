import { useLocation } from "react-router-dom";

function ViewOrder()
{
const location=useLocation()
const {product}=location.state

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
    </div>
    
)
}

export default ViewOrder;