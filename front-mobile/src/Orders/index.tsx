import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Header from "../Header";
import OrderCard from '../OrderCard';

function Orders() {
  return (
    <>
    <Header />
      <ScrollView style={style.container}>
        <OrderCard />
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'

  }
});

export default Orders;
