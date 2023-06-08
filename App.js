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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  
  
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
  const [usuario, setUsuario] = useState('');
  const [password, setpassword] = useState('');
  const [errorInicio, seterrorInicio] = useState('');
  

  let limpiar = () => {
    seterrorInicio('');
    setUsuario('');
    setpassword('');
  };

  const onSearch = async() => {
    const response= await axios.get('http://localhost:3000/buscarusuarios')
    let users= response.data.usuarios
      if (usuario !== '' || password !== '') {
        let findUser = users.find(e => e.usuario === usuario && e.contraseña === password);
        if (findUser !== undefined) {
          seterrorInicio('');
          limpiar();
          if (findUser.rol == 'admin') {
            navigation.navigate('Habitaciones');
          }else {
          navigation.navigate('Reservar');}
        } else {
          seterrorInicio('Usuario y/o contraseña incorrecto');
          setTimeout(function () {
            limpiar();
          }, 2000);
        }
      } else {
        seterrorInicio('Todos los datos son obligatorios');
        setTimeout(function () {
          limpiar();
        }, 2000);
      }
  }

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Image style={styleImage.img} source={require('./assets/images/Logo.png')} />
      <Text style={[styleText.txt, { color: 'darkgray' }]}>Inicio de Sesion</Text>

      <TextInput
        label="Usuario"
        mode='flat'
        left={<TextInput.Icon icon="account-box" />}
        style={styleInp.input}
        onChangeText={usuario => setUsuario(usuario)}
        value={usuario}
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
      <Text style={{ color: 'red', marginTop: 22 }}>{errorInicio}</Text>
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

  const  registrar= async()=> {
    if (usuario === '' || nombre === '' || contraseña === '' || palabraReservada === '') {
      setErrorMessage('Todos los campos son obligatorios');
      setTimeout(function () {
        limpiar();
      }, 2000);
    } else {
      const response= await axios.get('http://localhost:3000/buscarusuarios')
      let users= response.data.usuarios
      let findUser = users.find(user => user.usuario === usuario);
      if (findUser === undefined) {
        const response = await axios.post('http://localhost:3000/crearusuario', {
          usuario: usuario,
          nombre: nombre,
          rol: rol,
          contraseña: contraseña,
          palabraReservada: palabraReservada
        });
        setErrorMessage(response.mensaje)
        setTimeout(() => {
          limpiar();
        }, 4000);
        ;
        
      } else {
        setErrorMessage('El usuario ya existe');
        setTimeout(function () {
          limpiar();
        }, 2000);
      }
    }

  }

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

      <Text style={{ color: 'red', marginTop: 22 }}>{errorMessage}</Text>

      <Button
        style={[styleBut.btn, { backgroundColor: '#FF9800' }]}
        icon="account-plus"
        mode="contained"
        onPress={() => {
          registrar()
        }}
      >
        Crear Cuenta
      </Button>
    </View>
  );
}

function HomeTabs() {
  const [isTabVisible, setTabVisible] = useState(true)
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
        name='Habitaciones'
        component={Cars}
        options={{
          tabBarIcon: (tabInfo) => (<MaterialIcons name='hotel' size={30} color='white' />),
          tabBarVisible:isTabVisible
        }}
      />
      <Tab.Screen
        name='Reservar'
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
  const [errorMessage, setErrorMessage] = useState('');

  let limpiar = () => {
    setEmail('');
    setKeyword('');
    setNewPassword('');
    setErrorMessage('');
  };

  const cambiarContraseña= async ()=>{
    const response= await axios.get('http://localhost:3000/buscarusuarios')
    let users= response.data.usuarios
    let findUser = users.find(e => e.usuario === email)
    if (findUser!==undefined) {
      if (findUser.palabraReservada===keyword) {
        const response= await axios.put('http://localhost:3000/recuperarpassword/'+findUser._id,{
          usuario: findUser.usuario,
          nombre: findUser.nombre,
          rol: findUser.rol,
          contraseña: newPassword,
          palabraReservada: findUser.palabraReservada
        })
       setErrorMessage(response.data.mensaje);
        setTimeout(() => {
          limpiar();
        }, 4000);
      } else{
        setTimeout(() => {
          limpiar();
        }, 4000);
        setErrorMessage("palabra clave incorrecta");
      }
    }else{
      setTimeout(() => {
        limpiar();
      }, 4000);
      setErrorMessage("Datos de usuario incorrectos");
    }
  }

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
            cambiarContraseña()
          }}
        >
          Registrar
        </Button>
        <Button
          style={[styleBut.btn, { backgroundColor: '#FF5722' }]}
          icon="login"
          mode="contained"
          onPress={() => navigation.navigate('HomeTabs')}
        >
          Iniciar Sesión
        </Button>
        
      </View>
      <Text style={{ color: 'red', marginTop: 22 }}>{errorMessage}</Text>
    </View>
  );
}
