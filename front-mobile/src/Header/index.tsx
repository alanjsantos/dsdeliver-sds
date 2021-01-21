import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function Header() {

      // FUncao que serve para redirecionar para a tela de Orders
      const navigation = useNavigation();

      // Quando o usuario clicar sera redirecionado para a tela de Orders
      const handlOnPress = () => {
        navigation.navigate('Home');
      }

  return (
    <TouchableWithoutFeedback onPress={handlOnPress}>
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} />
        <Text style={styles.Text}>DS Delivery</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DA5C5C",
    height: 90,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "center",
  },

  Text: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: "#FFF",
    marginLeft: 15,
    fontFamily: "OpenSans_700Bold",
  },
});

export default Header;
