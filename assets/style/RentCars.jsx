import { StyleSheet } from "react-native";
export {styles,styleRenta,styleImage}


const styles = StyleSheet.create({
    container: {
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

const styleRenta = StyleSheet.create({
    renta:{
      top:-10,
      color:'red',
      fontSize:30,
      fontWeight:"bold"
    }
  })