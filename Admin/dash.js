import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  CheckBox,
  Button,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


 



const App = () => {
const [color,setColor]=React.useState('white')

  

  return (
    <View style={styles.container}>
     <View style={styles.dash}>
    {/*cada  item do painel*/}
     <View >
    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:7}}> 
     <FontAwesome name="user-plus" size={24} color={color} />
     <Text style={{color:color}}>Cadastrar</Text> 
     </TouchableOpacity>
     </View>   

 {/*cada  item do painel*/}
     <View >
     <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:7}}> 
     <Ionicons name="ios-people-circle-outline" size={24} color={color} />
     <Text style={{color:color}}>Usúarios</Text> 
     </TouchableOpacity>
     </View>   


      {/*cada  item do painel*/}
     <View >
     <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:7}}> 
     <FontAwesome5 name="file-signature" size={24} color={color} />
     <Text style={{color:color}}>Exercicios</Text> 
     </TouchableOpacity>
     </View>   

    </View>   
    
     {/*Segunda coluna de funcçoes*/}

     <View style={styles.dash}>
    {/*cada  item do painel*/}
     <View >
    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:7}}> 
    <FontAwesome5 name="money-check-alt" size={24} color={color} />
     <Text style={{color:color}}>Financeiro</Text> 
     </TouchableOpacity>
     </View>   

 {/*cada  item do painel*/}
     <View >
     <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:7}}> 
     <Ionicons name="notifications" size={24} color={color} />
     <Text style={{color:color}}>Notificações</Text> 
     </TouchableOpacity>
     </View>   


      {/*cada  item do painel*/}
     <View >
     <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:7}}> 
     <AntDesign name="printer" size={24} color={color} />
     <Text style={{color:color}}>Relatórios</Text> 
     </TouchableOpacity>
     </View>   

    </View>   
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'dodgerblue',
    padding: 8,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dash:{
   flexDirection:'row',
   justifyContent:'space-around'   
  }
});


export default App;