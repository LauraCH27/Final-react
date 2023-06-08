import { useState,useEffect } from 'react';
import { Text, View, Image, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { styles, styleImage, styleText, styleInp, styleBut, contenedorBtn, styleTxtReg } from './assets/style/style';
import Cars from './components/Cars';
import RentsCars from './components/RentCars';
import Lista from './components/Lista';
import axios from 'axios';


// let users = [
//   { email: 'andersonyepesbedoya@gmail.com', name: 'anderson', password: "22", role: 1 },
//   { email: 'miguel@gmail.com', name: 'alejandro', password: "11", role: 2 }
// ];



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const onSearch = async() => {
  const response= await axios.get('http://localhost:3000/buscarusuarios')
  let users= response.data.usuarios
  console.log(users)

  let usuario=users.find((user)=>{})
  
}

export default function App() {
  // const [list,setList] = useState([]);
  // useEffect(()=>{
  //   axios({
  //     url:"http://localhost:3000/buscarusuarios"
  //   })
  //   .then((response)=>{
  //     setList(response.data)
  //     console.log(list)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })

  // })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
        // headerShown:false,
        headerStyle: {
          backgroundColor: "gray"
        },
        headerTintColor: "white",
      }}>
        <Stack.Screen name='HomeTabs' component={HomeTabs} options={{ title: 'Hotel.com', headerShown: false }} />
        <Stack.Screen name='HomeRegister' component={HomeRegister} options={{ title: 'Hotel.com' }} />
        <Stack.Screen name='HomeRecuperarContraseña' component={HomeRecuperarContraseña} options={{ title: 'Hotel.com' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [errormess, seterrormess] = useState('');

  let limpiar = () => {
    seterrormess('');
    setEmail('');
    setpassword('');
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Image style={styleImage.img} source={require('./assets/images/Logo.png')} />
      <Text style={[styleText.txt, { color: 'darkgray' }]}>Inicio de Sesion</Text>

      <TextInput
        label="Usuario"
        mode='flat'
        left={<TextInput.Icon icon="account-box" />}
        style={styleInp.input}
        onChangeText={email => setEmail(email)}
        value={email}
      />

      <TextInput
        label="Contraseña"
        mode='flat'
        left={<TextInput.Icon icon="lock" />}
        style={styleInp.input}
        onChangeText={password => setpassword(password)}
        value={password}
        secureTextEntry
      />

      <View style={contenedorBtn.contenedor}>
        <Button
          style={[styleBut.btn, { backgroundColor: '#FF5722' }]}
          icon="login"
          mode="contained"
          onPress={() => {onSearch()}
          //   () => {
          //   if (email !== '' && password !== '') {
          //     let findUser = users.find(e => e.email === email && e.password === password);
          //     if (findUser !== undefined) {
          //       seterrormess('');
          //       limpiar();
          //       navigation.navigate('Cars');
          //     } else {
          //       seterrormess('Correo y/o contraseña incorrecto');
          //       setTimeout(function () {
          //         limpiar();
          //       }, 2000);
          //     }
          //   } else {
          //     seterrormess('Todos los datos son obligatorios');
          //     setTimeout(function () {
          //       limpiar();
          //     }, 2000);
          //   }
          // }
        }
        >
          Iniciar Sesión
        </Button>
        <Button
          style={[styleBut.btn, { backgroundColor: '#FF9800' }]}
          icon="account-plus"
          mode="contained"
          onPress={() => navigation.navigate('HomeRegister')}
        >
          Registrarse
        </Button>
      </View>

      <Text style={{ color: 'white', marginTop: 22, position: 'absolute' }}>{errormess}</Text>

      <Button
        style={[styleBut.btn, { backgroundColor: 'transparent', marginTop: 70 }]}
        labelStyle={{ color: 'gray' }}
        onPress={() => navigation.navigate('HomeRecuperarContraseña')}
      >
        ¿Olvidaste tu contraseña?
      </Button>
    </View>
  );
}

import { Checkbox } from 'react-native-paper';

function HomeRegister({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [palabraReservada, setPalabraReservada] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const limpiar = () => {
    setUsuario('');
    setNombre('');
    setRol('');
    setContraseña('');
    setPalabraReservada('');
    setErrorMessage('');
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Text style={[styleText.txt, { color: 'darkgray', marginBottom: 10 }]}>Crea una Cuenta</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={[styleInp.pickerLabel, { marginRight: 10 }]}>Rol:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={rol === 'Usuario' ? 'checked' : 'unchecked'}
            onPress={() => setRol('Usuario')}
            color="#FF9800"
            uncheckedColor="#FF9800"
          />
          <Text style={styleInp.checkboxLabel}>Usuario</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
          <Checkbox.Android
            status={rol === 'Admin' ? 'checked' : 'unchecked'}
            onPress={() => setRol('Admin')}
            color="#FF9800"
            uncheckedColor="#FF9800"
          />
          <Text style={styleInp.checkboxLabel}>Admin</Text>
        </View>
      </View>

      <TextInput
        label="Usuario"
        mode="flat"
        left={<TextInput.Icon icon="account-box" />}
        style={styleInp.input}
        onChangeText={usuario => setUsuario(usuario)}
        value={usuario}
      />

      <TextInput
        label="Nombre"
        mode="flat"
        left={<TextInput.Icon icon="rename-box" />}
        style={styleInp.input}
        onChangeText={nombre => setNombre(nombre)}
        value={nombre}
      />

      <TextInput
        label="Contraseña"
        mode="flat"
        left={<TextInput.Icon icon="lock" />}
        style={styleInp.input}
        onChangeText={contraseña => setContraseña(contraseña)}
        value={contraseña}
        secureTextEntry
      />

      <TextInput
        label="Palabra Reservada"
        mode="flat"
        left={<TextInput.Icon icon="key" />}
        style={styleInp.input}
        onChangeText={palabraReservada => setPalabraReservada(palabraReservada)}
        value={palabraReservada}
        secureTextEntry
      />

      <Text style={{ color: 'white', marginTop: 22 }}>{errorMessage}</Text>

      <Button
        style={[styleBut.btn, { backgroundColor: '#FF9800' }]}
        icon="account-plus"
        mode="contained"
        onPress={() => {
          if (usuario === '' || nombre === '' || contraseña === '' || palabraReservada === '') {
            setErrorMessage('Todos los campos son obligatorios');
          } else {
            let findUser = users.find(user => user.usuario === usuario);
            if (findUser === undefined) {
              users.push({
                usuario: usuario,
                nombre: nombre,
                rol: rol,
                contraseña: contraseña,
                palabraReservada: palabraReservada
              });
              console.log(users);
              setTimeout(() => {
                limpiar();
              }, 4000);
              setErrorMessage('Excelente, se ha creado la cuenta. Ahora debes iniciar sesión...');
            } else {
              setErrorMessage('El usuario ya existe');
            }
          }
        }}
      >
        Crear Cuenta
      </Button>
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#DE3812',
        tabBarInactiveBackgroundColor: '#F5681F'
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: (tabInfo) => (<MaterialIcons name='home' size={30} color='white' />)
        }}
      />
      <Tab.Screen
        name='Cars'
        component={Cars}
        options={{
          tabBarIcon: (tabInfo) => (<MaterialIcons name='hotel' size={30} color='white' />)
        }}
      />
      <Tab.Screen
        name='RentCars'
        component={RentsCars}
        options={{
          tabBarIcon: (tabInfo) => (<MaterialIcons name='save' size={30} color='white' />)
        }}
      />
    </Tab.Navigator>
  );
}


function HomeRecuperarContraseña({ navigation }) {
  const [email, setEmail] = useState('');
  const [keyword, setKeyword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  let limpiar = () => {
    setEmail('');
    setKeyword('');
    setNewPassword('');
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Text style={[styleText.txt, { color: 'darkgray' }]}>Recuperar Contraseña</Text>

      <TextInput
        label="Usuario"
        mode='flat'
        left={<TextInput.Icon name="account-box" />}
        style={styleInp.input}
        onChangeText={email => setEmail(email)}
        value={email}
      />

      <TextInput
        label="Palabra Reservada"
        mode='flat'
        left={<TextInput.Icon name="lock-question" />}
        style={styleInp.input}
        onChangeText={keyword => setKeyword(keyword)}
        value={keyword}
      />

      <TextInput
        label="Nueva Contraseña"
        mode='flat'
        left={<TextInput.Icon name="lock" />}
        style={styleInp.input}
        onChangeText={newPassword => setNewPassword(newPassword)}
        value={newPassword}
        secureTextEntry
      />

      <View style={contenedorBtn.contenedor}>
        <Button
          style={[styleBut.btn, { backgroundColor: '#FF9800' }]}
          icon="account-plus"
          mode="contained"
          onPress={() => {
            // Implementar la lógica para recuperar la contraseña
          }}
        >
          Registrar
        </Button>
        <Button
          style={[styleBut.btn, { backgroundColor: '#FF5722' }]}
          icon="login"
          mode="contained"
          onPress={() => navigation.navigate('HomeScreen')}
        >
          Iniciar Sesión
        </Button>
      </View>
    </View>
  );
}
