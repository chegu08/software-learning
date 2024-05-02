import axios from "axios";
import { useEffect } from "react";
import { url } from "..";
import { useParams } from "react-router-dom";
function UpdatePayment()
{

const params=useParams()
const orderid=params.orderID
const paymentid=params.paymentID
console.log(params.orderID)
console.log(orderid)
console.log(paymentid)
    useEffect(()=>{
    axios.post(`${url}/userorder/${orderid}/${paymentid}`)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
 },[])

    return(
       <div>
       
        <div>PAYMENT SUCCESSFULL NIGGA</div>

       </div>
    
    )
}


export default UpdatePayment;