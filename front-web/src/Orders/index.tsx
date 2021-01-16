import StepsHeader from "./StepsHeader";
import { toast } from "react-toastify";
import ProductsList from "./ProductsList";
import React, { useEffect, useState } from "react";
import { OderLocationData, Product } from "./types";
import { fetchProducts, saveOrder } from "./../api";
import OrderLocation from "./OrderLocation";
import OrderSummary from "./OrderSummary";
import Footer from "../Footer";
import { checkIsSelected } from "./helpers";
import "./styles.css";

function Orders() {
  // criando o estado Products.
  //Importante sobre estado: 1. sempre tem uma várivel e uma função
  const [products, setProducts] = useState<Product[]>([]);
  // nos diz quantas listas de produtos estão selecionados.
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OderLocationData>();
  //somando o tatal de preços (SOMANDO O ARRAY).
  const totalPrice = selectedProducts.reduce((sum, item) => {
    return sum + item.price;
  }, 0);
  // useEffect: tempo de vida do componente. (O estado que vai armazenar a lista de produto.)
  useEffect(() => {
    // chamando a função que faz a rota (requisicao no back-end).
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch(() => {
        toast.warning(`Erro ao listar o produto Nº `);
      });
  }, []);

  //será invocado quando o usuario clicar em uma card.
  const handleSelectProduct = (product: Product) => {
    const isAlreadySelected = checkIsSelected(selectedProducts, product);

    // testando se o produto foi selecionado ou nao.
    if (isAlreadySelected) {
      const selected = selectedProducts.filter(
        (item) => item.id !== product.id
      );
      setSelectedProducts(selected);
    } else {
      setSelectedProducts((previous) => [...previous, product]);
    }
  };
  //
  const handleSubmit = () => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...orderLocation!,
      products: productsIds,
    };

    saveOrder(payload)
      .then((resposne) => {
        toast.error(`Pedido enviado com sucesso! Nº ${resposne.data.id}` );
        setSelectedProducts([]);
      })
      .catch(() => {
        toast.warning("Erro ao enviar pedido");
      });
  };
  //
  return (
    <>
      <div className="orders-container">
        <StepsHeader />
        <ProductsList
          products={products}
          onSelectProduct={handleSelectProduct}
          selectedProducts={selectedProducts}
        />
        <OrderLocation
          onChangeLocation={(location) => setOrderLocation(location)}
        />
        <OrderSummary
          amount={selectedProducts.length}
          totalPrice={totalPrice}
          onSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </>
  );
}

export default Orders;
