import axios from "axios";
import { useEffect } from "react";
import { url } from "..";
function UpdatePayment()
{


    useEffect(()=>{
    axios.post(`${url}/userorder/`)
    })

    return(
       <div>
       
        <div>PAYMENT SUCCESSFULL NIGGA</div>

       </div>
    
    )
}


export default UpdatePayment;