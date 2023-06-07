import { StyleSheet } from "react-native";
export {styles, styleImage, styleText, styleInp, styleBut, contenedorBtn, styleTxtReg}

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
    },
    auto:{
        opacity: 0.5,
        marginTop:60,
        width:400,
        height:190
    }
});

const styleText = StyleSheet.create({
    txt:{
        marginTop:20,
        color:'red',
        fontSize:30,
        fontWeight:"bold"
    }
});

const styleInp = StyleSheet.create({
    input:{
        marginTop: 25, 
        backgroundColor: "#dcdcdc",
    }
});

const contenedorBtn =StyleSheet.create({
    contenedor:{
        flexDirection:'row',
        marginTop:20,
        display:'flex',
        justifyContent:'center'
    }
});

const styleBut = StyleSheet.create({
    btn:{
        marginTop: 30, 
        backgroundColor: '#8b0000',
        marginRight: 10,
    }
})

//STYLOS DE HOMEREGISTRO

const styleTxtReg = StyleSheet.create({
    txt2:{
        textAlign:'center',
        color: 'white',
        marginTop:25,
        marginBottom:15,
        fontSize:15
    }
})