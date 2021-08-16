import React from "react";
import axios from "axios";
import Card from "../components/Card";
import AppContext from "../context";

function Orders() {
  const {onAddToFavorite,onAddToCart} = React.useContext(AppContext);
  const mockApiUrl = "https://60e02e2c6b689e001788c95d.mockapi.io";

  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(()=> {

    (async() => {

      try {
        const {data} =  await axios.get(`${mockApiUrl}/orders`);
      setOrders(data.reduce((prev, obj)=> [...prev, ...obj.items], []));
      setIsLoading(false);
      } catch (error)
 {
   alert('Error orders! Ошибка при запросе заказа!');
   console.error(error);
 }
    })();
  }, [])


 return ( 
 <div className="content p-40">
 <div className="d-flex align-center justify-between mb-40">
   <h1 className="mb-40">
     Мои заказы
   </h1>
 </div>

 <div className="d-flex all-sneakers">
 {(isLoading ? [...Array(8)] : orders).map((item, index) => (
       <Card
       key={index}
       loading={isLoading}
       {...item}
       />
     )) }</div>
</div>) 
}

export default Orders;
