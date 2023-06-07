import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { stylesCon, styleTexto, styleImage } from '../assets/style/Cars';

export default function HotelBooking(props) {
  const [titular, setTitular] = useState('');
  const [numPersonas, setNumPersonas] = useState('');
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [mensaje, setMensaje] = useState('');

  let limpiar = () => {
    setTitular('');
    setNumPersonas('');
    setFechaInicial('');
    setFechaFinal('');
  };

  return (
    <View style={[stylesCon.container2, { backgroundColor: 'white' }]}>
      <Image
        style={styleImage.img}
        source={require('../assets/images/Logo.png')}
      />

        <Text style={[styleTexto.carro, { marginTop: 20, marginBottom: 10, color: 'darkgray' }]}>Reserva de Hospedaje</Text>


      <TextInput
        label="Titular de la habitación"
        mode="flat"
        left={<TextInput.Icon name="account" />}
        style={{ marginBottom: 10 }}
        onChangeText={titular => setTitular(titular)}
        value={titular}
      />
      <TextInput
        label="Número de personas"
        mode="flat"
        left={<TextInput.Icon name="account-group" />}
        style={{ marginBottom: 10 }}
        onChangeText={numPersonas => setNumPersonas(numPersonas)}
        value={numPersonas}
        keyboardType="numeric"
      />
      <TextInput
        label="Fecha inicial"
        mode="flat"
        left={<TextInput.Icon name="calendar-start" />}
        style={{ marginBottom: 10 }}
        onChangeText={fechaInicial => setFechaInicial(fechaInicial)}
        value={fechaInicial}
        keyboardType="numeric"
      />
      <TextInput
        label="Fecha final"
        mode="flat"
        left={<TextInput.Icon name="calendar-end" />}
        style={{ marginBottom: 20 }}
        onChangeText={fechaFinal => setFechaFinal(fechaFinal)}
        value={fechaFinal}
        keyboardType="numeric"
      />

      <Button
        style={{ backgroundColor: 'orange', marginBottom: 20 }}
        icon={() => <MaterialIcons name="bookmark" size={24} color="white" />}
        mode="contained"
        onPress={() => {
          if (titular === '' || numPersonas === '' || fechaInicial === '' || fechaFinal === '') {
            setMensaje('Todos los campos son obligatorios...');
          } else {
            // Lógica para guardar los datos de reserva de hospedaje
            // Aquí puedes realizar las acciones necesarias, como enviar los datos a una API o almacenarlos en una base de datos
            console.log('Datos de reserva guardados:', {
              titular: titular,
              numPersonas: numPersonas,
              fechaInicial: fechaInicial,
              fechaFinal: fechaFinal
            });

            setTimeout(function () {
              limpiar();
            }, 2000);
            setMensaje('Reserva realizada correctamente');
          }
        }}
      >
        Reservar
      </Button>

      <Text style={{ color: 'black', marginTop: 10 }}>{mensaje}</Text>
    </View>
  );
}
