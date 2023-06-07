import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Lista({navigation,route}){
    return(
        <View  style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Text>RENTA DE CARROS</Text>
        </View>
    )
}