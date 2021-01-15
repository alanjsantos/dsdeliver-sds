import "./styles.css";
import StepsHeader from "./StepsHeader";
import ProductsList from "./ProductsList";
import { useEffect, useState } from "react";
import { OderLocationData, Product } from "./types";
import { fetchProducts } from "./../api";
import OrderLocation from './OrderLocation';

function Orders() {
  // criando o estado Products.
  //Importante sobre estado: 1. sempre tem uma várivel e uma função
  const [products, setProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OderLocationData>()
  // useEffect: tempo de vida do componente. (O estado que vai armazenar a lista de produto.)
  useEffect(() => {
    // chamando a função que faz a rota (requisicao no back-end).
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []); 
  // 
  return (
    <div className="orders-container">
      <StepsHeader />
      <ProductsList products={products} />
     <OrderLocation onChangeLocation = {location => setOrderLocation(location)}/>
    </div>
  );
}

export default Orders;
