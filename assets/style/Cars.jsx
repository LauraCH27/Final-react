import { StyleSheet } from "react-native";
export {stylesCon, styleTexto, styleImage}

const stylesCon = StyleSheet.create({
    container2: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const styleImage = StyleSheet.create({
  img:{
      top:-1,
      width:100,
      height:100
  }
})

const styleTexto = StyleSheet.create({
  carro:{
    top:-10,
    color:'red',
    fontSize:30,
    fontWeight:"bold",
    textAlign:'center'
  }
})