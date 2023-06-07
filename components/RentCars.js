import { Text, View, Image } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {styles, styleRenta} from '../assets/style/RentCars'
import { styleInp, styleBut, styleImage} from '../assets/style/style';
// import App from '../App';
import Cars from './Cars';


let rentas = [
    {rentan: '1', nombre:'anderson', placa:'ngs 567', estado:'activo'}
]

export default function RentsCars(){

    // console.log(estado)

    const [rentan, setRentan] = useState ('');
    const [nombre, setName] = useState ('');
    const [placa, setPlaca] = useState ('');
    const [estado, setEstado] = useState ('');
    const [mensess, setMensess] = useState ('');


    let limpiar = ()=>{
        setRentan('')
        setName('')
        setPlaca('')
        setEstado('')
    }


    return(
        <View  style={styles.container}>

                <Image
                    style={styleImage.img}
                    source={require('../assets/images/Logo.png')}
                />


            <Text style={styleRenta.renta}>RENTA DE AUTOS</Text>

            <TextInput
                label="Identificador de renta"
                mode='Flat'
                left={<TextInput.Icon icon="phone-in-talk" />}
                style={styleInp.input}
                // onBlur={onBlur}
                onChangeText={rentan => setRentan(rentan)}
                value={rentan}
            />

            <TextInput
                label="Nombre del Usuario"
                mode='Flat'
                left={<TextInput.Icon icon="rename-box" />}
                style={styleInp.input}
                // onBlur={onBlur}
                onChangeText={nombre => setName(nombre)}
                value={nombre}
            />

            <TextInput
                label="Número de la placa"
                mode='Flat'
                left={<TextInput.Icon icon="numeric-0-box-multiple-outline" />}
                style={styleInp.input}
                // onBlur={onBlur}
                onChangeText={placa => setPlaca(placa)}
                value={placa}
            />

            <TextInput
                label="Estado de la Renta"
                mode='Flat'
                left={<TextInput.Icon icon="update" />}
                style={styleInp.input}
                // onBlur={onBlur}
                onChangeText={estado => setEstado(estado)}
                value={estado}
            />

            <Button
                style={styleBut.btn}
                icon="bookmark"
                mode="contained"
                onPress={()=>{
                    if (rentan == '' && nombre == '' && placa == '' && estado == ''){
                        setMensess('Todos los campos son Obligatorios...')
                    }else{
                        let findRenta = rentas.find(renta=>renta.rentan == rentan)
                        if(findRenta == undefined){
                            rentas.push({
                                rentan:rentan,
                                nombre: nombre,
                                placa: placa,
                                estado: estado
                            })
                            console.log(rentas);
                            setTimeout (function(){
                                limpiar()
                            },3000)
                            setMensess('Se ha guardado correctamente')
                        }
                    } 
                }}
            >
                Guardar Renta
            </Button>

            <Button
                style={styleBut.btn}
                icon="magnify"
                mode="contained"
                onPress={()=>{
                    let findEstado = rentas.find(renta=>renta.rentan == rentan)
                    // if(){
                    //     setMensess('El vehiculo ya no esta disponible...')
                    // }else 
                    if(rentan == ''){
                        setTimeout(function(){
                            limpiar()
                        },3000)
                        setMensess('Para poder hacer una busqueda debes ingresar el numero de la renta...')
                    }else{
                        if (findEstado == undefined && estado != 'activo') {
                            setMensess('El numero de la renta ya no esta disponible')
                            setTimeout(function(){
                                limpiar()
                            },2000)
                        }else{
                            setMensess('Renta encontrado correctamente en el sistema')
                            setName(findEstado.nombre)
                            setPlaca(findEstado.placa)
                            setEstado(findEstado.estado)

                            console.log(findEstado)
                            setTimeout(function(){
                                limpiar()
                            },7000)
                        }
                    }
                }}
            >
                Buscar Renta
            </Button>


            <Text style={{ color: 'white', marginTop: 22 }}>{mensess}</Text>
        </View>
    )
}