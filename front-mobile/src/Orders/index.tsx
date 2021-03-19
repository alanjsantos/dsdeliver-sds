import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Text, ActivityIndicator } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Header from "../Header";
import OrderCard from "../OrderCard";
import { Order } from "../types";
import { fetchOrders } from "./../api";

type Props = {
  order: Order;
};

function Orders({ order }: Props) {
  // capturando os dados
  const [orders, setOders] = useState<Order[]>([]);
  // isLoading para tratar carregamento, caso o back end demore a responder.
  const [isLoading, setIsLoading] = useState(false);
  // FUncao que serve para redirecionar para a tela de Orders
  const navigation = useNavigation();
  //Serve para renderizar conteúdo diferente com base no estado de foco atual da tela
  const isFocused = useIsFocused();

  //1. buscando os dado (pedidos.)
  const fetchData = () => {
    setIsLoading(true);
    fetchOrders()
      .then((response) => setOders(response.data))
      .catch(() => Alert.alert("Houve um erro ao carregar os pedidos."))
      .finally(() => setIsLoading(false));
  };

  //testando o foco atual da tela.
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
    //colocando o isFocused como dependencia do useEffect
  }, [isFocused]);

  // Quando o usuario clicar sera redirecionado para a tela de Orders
  const handlOnPress = (order: Order) => {
    navigation.navigate("OrderDetails", {
      order,
    });
  };

  return (
    <>
      <Header />
      <ScrollView style={style.container}>
        {isLoading ? (
          <View style={style.containerLoading}>
            <ActivityIndicator size="large" 
                               color="#DA5C5C"/>
            <Text>Carregando os produtos ..</Text>                   
          </View>
          
        ) : (
          orders.map((order) => (
            <TouchableWithoutFeedback
              key={order.id}
              onPress={() => {
                handlOnPress(order);
              }}
            >
              <OrderCard order={order} />
            </TouchableWithoutFeedback>
          ))
        )}
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({

  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  } ,
    container: {
    paddingRight: "5%",
    paddingLeft: "5%",
  },
});

export default Orders;
