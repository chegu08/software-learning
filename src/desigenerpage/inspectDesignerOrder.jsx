import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { url } from "..";

function InspectDesignerOrder() {
  const [price, setPrice] = useState(0);
  const [tendate, setTendate] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const params = useLocation();
  const order = params.state.desproduct;
  console.log("gii")
console.log(order)
  const [ordStatus, setOrdStatus] = useState(order.orderstatus);

  const handleSubmit = () => {
    console.log(order.orderid)
    console.log(order.orderstatus)
    console.log(price)
    console.log(tendate)
    console.log(shipmentDate)
    axios.put(`${url}/new/designerorder/update`, {
      orderid: order.orderid,
      status: order.orderstatus,
      price: price,
      tentativedate: tendate,
      shipment_date: shipmentDate
    })
    .then(res => {
      alert(res.data.message);
      // Reload the page after successful submission
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div>
       {order.orderstatus === "pending" && (
        <div>
          <h2>ORDER STILL IN PENDING</h2>
          <button onClick={() => {
            setOrdStatus("rejected");
            order.orderstatus = "rejected";
            handleSubmit();
          }}>Click here to reject the order</button>
        </div>
      )}

      {order.orderstatus === "pending" && (
        <div>
          <h2>ORDER STILL IN PENDING</h2>
          <button onClick={() => {
            setOrdStatus("accepted");
            order.orderstatus = "accepted";
          }}>Click here to accept the order</button>
        </div>
      )}

      {order.orderstatus === "accepted" && (
        <div>
          <h2>ORDER IS ACCEPTED</h2>
          <input type="number" placeholder="Enter the price of the product" onChange={(event) => setPrice(event.target.value)} />
          <input type="date" placeholder="Enter the tentative delivery date" onChange={(event) => setTendate(event.target.value)} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {order.orderstatus === "paid" && (
        <div>
          <h2>ORDER IS PAID</h2>
          <button onClick={() => {
            // setOrdStatus("started");
            order.orderstatus = "started";
          }}>Click here if you have started the process</button>
        </div>
      )}

      {order.orderstatus === "started" && (
        <div>
          <h2>YOU HAVE STARTED DESIGNING</h2>
          <input type="date" placeholder="Enter the delivery date" onChange={(event) => setShipmentDate(event.target.value)} />
          <button onClick={handleSubmit}>Update Shipment Date</button>
        </div>
      )}
    </div>
  );
}

export default InspectDesignerOrder;
