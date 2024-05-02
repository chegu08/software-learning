import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { url } from "..";
import axios from "axios";
 // Import your CSS file

export default function Cart() {
    const params = useParams();
    const { userid } = params;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.post(`${url}/homepage/seecart`, { userid: userid })
            .then((res) => {
                setCart(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const removeFromCart = (idToRemove) => {
        axios.delete(`${url}/new/deleteitem`, {
            data: {
                userid: userid,
                productid: cart[idToRemove].productid
            }
        })
        .then((res) => {
            alert(res.data.message);
            const updatedCart = cart.filter((item, index) => index !== idToRemove); // Update cart after removing item
            setCart(updatedCart);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const buyNow = (id) => {
        const productId = cart[id].productid;
        axios.post(`${url}/userorder`, {
            userid: userid,
            ownproduct: false,
            productid: productId,
            numberofitems: cart[id].NumberofItems,
            designerid: cart[id].designerid
        })
        .then((res) => {
            console.log(res.data);
           
            // Add any further actions after successful purchase
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const addItems = (id) => {
        const updatedCart = [...cart];
        updatedCart[id].NumberofItems++;
        setCart(updatedCart);
        // Update number of items in the database via API call
        axios.put(`${url}/new/updateNumberofItems`, {
            userid: userid,
            productid: cart[id].productid,
            NumberofItems: updatedCart[id].NumberofItems
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const removeItems = (id) => {
        if (cart[id].NumberofItems >= 1) {
            const updatedCart = [...cart];
            updatedCart[id].NumberofItems--;
            setCart(updatedCart);
            // Update number of items in the database via API call
            axios.put(`${url}/new/updateNumberofItems`, {
                userid: userid,
                productid: cart[id].productid,
                NumberofItems: updatedCart[id].NumberofItems
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className="cart-container">
            {cart.map((item, id) => (
                <div className="cart-item" key={id}>
                    <img src={item.image} alt={item.description} />
                    <div className="cart-item-description">{item.description}</div>                                                   
                    <div>Quantity: {item.NumberofItems}</div>
                    <div className="cart-item-price">Price: {item.approx_price}</div>
                    <div className="cart-item-buttons">
                        <button onClick={() => removeFromCart(id)}>Remove from Cart</button>
                        <button className="buy-now-button" onClick={(event) => buyNow(id)}>Buy Now</button>
                        <button onClick={() => addItems(id)}>+</button>
                        <button onClick={() => removeItems(id)}>-</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
