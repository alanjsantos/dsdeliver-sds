import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Order } from "../types";

//importando o puglin fromNow
import relativeTimE from 'dayjs/plugin/relativeTime'
//confugrando a bilbioteca dayJS para traduzir para o portugues BR
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";
dayjs.locale('pt-br');

//extendo o dayJS para usar o plugin relativeTime
dayjs.extend(relativeTimE)


type Props = {
  order: Order;
}

//formatando data com dayJS (biblioteca)
function dateFromNow(date: string) {
  return dayjs(date).format
}

//formatando preço: (passando como parametro product.price) em ProductCards
export function formatPrice(price: number) {
  //criando uma constante recebdno uma API NumverFromat
 const formatter = new Intl.NumberFormat("pt-BR", {
   style: "currency",
   currency: "BRL",
   minimumFractionDigits: 2,
 });

 return formatter.format(price);
}

function OrderCard({ order }: Props) {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.orderName}>Pedido {order.id}</Text>
        <Text style={style.orderPrice}>R$ {formatPrice(order.total)}</Text>
      </View>
      <Text style={style.text}>{order.moment}</Text>
      <View style={style.productsList}>
        {order.products.map(product => (
        <Text key={product.id} style={style.text}>{product.name}</Text>
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: "10%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: "2%",
    padding: 15,
    backgroundColor: "#FFF",
    shadowOpacity: 0.25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    borderRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.24,
    color: "#9E9E9E",
    fontFamily: "OpenSans_400Regular",
  },
  orderName: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: "#263238",
    fontFamily: "OpenSans_700Bold",
  },
  orderPrice: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 25,
    textAlign: "right",
    letterSpacing: -0.24,
    color: "#DA5C5C",
    fontFamily: "OpenSans_700Bold",
  },
  productsList: {
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 15,
  },
});

export default OrderCard;
