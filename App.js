import { useState } from 'react';
import { Text, View, Image } from 'react-native';
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


let users = [
  { email: 'andersonyepesbedoya@gmail.com', name: 'anderson', password: "22", role: 1 },
  { email: 'miguel@gmail.com', name: 'alejandro', password: "11", role: 2 }
];

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
        <Stack.Screen name='HomeTabs' component={HomeTabs} options={{ title: 'Mercedes Bens', headerShown: false }} />
        <Stack.Screen name='HomeRegister' component={HomeRegister} options={{ title: 'Mercedes Bens' }} />
        <Stack.Screen name='HomeRecuperarContraseña' component={HomeRecuperarContraseña} options={{ title: 'Mercedes Bens' }} />
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
        label="Correo electrónico"
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
          onPress={() => {
            if (email !== '' && password !== '') {
              let findUser = users.find(e => e.email === email && e.password === password);
              if (findUser !== undefined) {
                seterrormess('');
                limpiar();
                navigation.navigate('Cars');
              } else {
                seterrormess('Correo y/o contraseña incorrecto');
                setTimeout(function () {
                  limpiar();
                }, 2000);
              }
            } else {
              seterrormess('Todos los datos son obligatorios');
              setTimeout(function () {
                limpiar();
              }, 2000);
            }
          }}
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

function HomeRegister({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
  const [errormess, seterrormess] = useState('');

  let limpiar = () => {
    seterrormess('');
    setEmail('');
    setpassword('');
    setName('');
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Text style={[styleText.txt, { color: 'darkgray' }]}>Crea una Cuenta</Text>
      <Text style={styleTxtReg.txt2}>Al crear la cuenta tendrás acceso a todas las funciones del aplicativo</Text>
      <TextInput
        label="Correo electrónico"
        mode='flat'
        left={<TextInput.Icon icon="account-box" />}
        style={styleInp.input}
        onChangeText={email => setEmail(email)}
        value={email}
      />

      <TextInput
        label="Nombre del usuario"
        mode='flat'
        left={<TextInput.Icon icon="rename-box" />}
        style={styleInp.input}
        onChangeText={name => setName(name)}
        value={name}
      />

      <TextInput
        label="Contraseña Nueva"
        mode='flat'
        left={<TextInput.Icon icon="lock" />}
        style={styleInp.input}
        onChangeText={password => setpassword(password)}
        value={password}
        secureTextEntry
      />

      <Button
        style={[styleBut.btn, { backgroundColor: '#FF9800' }]}
        icon="account-plus"
        mode="contained"
        onPress={() => {
          if (email === '' || name === '' || password === '') {
            seterrormess('Todos los campos son obligatorios');
          } else {
            let findUser = users.find(e => e.email === email);
            if (findUser === undefined) {
              users.push({
                email: email,
                name: name,
                password: password
              });
              console.log(users);
              setTimeout(function () {
                limpiar();
              }, 4000);
              seterrormess('Excelente, se ha creado la cuenta, ahora debes iniciar sesión...');
            }
          }
        }}
      >
        Crear Cuenta
      </Button>

      <Text style={{ color: 'white', marginTop: 22 }}>{errormess}</Text>
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
