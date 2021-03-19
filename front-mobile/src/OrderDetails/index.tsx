import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, Alert, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { confirmDelivery } from "../api";
import Header from "../Header";
import OrderCard from "../OrderCard";
import { Order } from "../types";

//toda as veses que os props é atrelado as rotas, será necesarrio criar dois objetos:
//1 route: { params {}}
type Props = {
  route: {
    params: {
      order: Order;
    };
  };
};

function OrderDetails({ route }: Props) {
  const order = route.params.order;
  const navigation = useNavigation();

  //funco par ao botão cancelar (irá para a pagina de pedidos)
  const handlOncCancel = () => {
    navigation.navigate('Orders');
  }

  //funcao para o botão de confirmar entrega
  const handlConfirmDelivery = () => {
    confirmDelivery(order.id)
      .then(() =>{
        Alert.alert(`Pedido ${order.id} confirmado com sucesso.`)
        navigation.navigate('Orders');
      })    
      .catch(() => {
        Alert.alert(`Houve um erro ao confirmar o pedido ${order.id}`)
      })
    navigation.navigate('Orders');
  }

  //funcao para realizar a integracao do google maps.
  const handleStartNavigation = () =>{
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`)
  }
  // extraindo order atrelado as routas.
  return (
    <>
      <Header />
      <View style={styles.container}>
        <OrderCard order={order} />
        <RectButton style={styles.button} onPress={handleStartNavigation}>
            <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handlConfirmDelivery}>
            <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
        </RectButton>
        <RectButton style={styles.button} onPress ={handlOncCancel}>
            <Text style={styles.buttonText}>CANCELAR</Text>
        </RectButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: -0.24,
    fontFamily: 'OpenSans_700Bold'
  }
});

export default OrderDetails;
