import axios from "axios";
import React from "react";
import Card from "../components/Card";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    React.useEffect(() => {
        const {data} = await axios.get('https://637f70212f8f56e28e8c10fb.mockapi.io/orders');
    }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>

      </div>

      <div className="d-flex flex-wrap">
        {[].map((item, index) => ( //Функция поиск товара
          <Card
           
          />
        ))}
      </div>
    </div>

  );
}
export default Orders;