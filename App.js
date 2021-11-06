import * as React from 'react';
import { Text, View ,TextInput ,TouchableOpacity ,Dimensions,Image, SafeAreaView,Linking,KeyboardAvoidingView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Swal from 'sweetalert2';
import CadastroExercicios from './CadastrarExercicios';
import Logado from './Logado';
import Exercicio from './Exercicios';
import Admin from './Admin';
import { FontAwesome } from '@expo/vector-icons';

function HomeScreen({ navigation }) {
  const [nome, setText] = React.useState('');
  const [senha,setSenha] = React.useState('');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  return (
    <KeyboardAvoidingView>
    <SafeAreaView style={{height:windowHeight}}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'dodgerblue',height:windowHeight }}>
    <View style={{alignItems:'center'}}
    ><TouchableOpacity onPress={() => navigation.navigate('Admin')}>
    <Image style={{width:150,height:150}} source={require('./assets/logo.png')} />
    </TouchableOpacity>
    </View>
    <TextInput
     value={nome}
     onChangeText={(nome) => setText(nome)}
     style={{height: 40,
      margin: 12,
      borderWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth:0,
      borderTopWidth: 0,
      borderColor:'white',
      outline: 'none',
      color:'white',
      placeholderTextColor:'white'}}
      placeholder="Telefone"
      keyboardType='numeric'
     
    />

    <TextInput
    value={senha}
    onChangeText={(senha) => setSenha(senha)}
      style={{height: 40,
        margin: 12,
        borderWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth:0,
        borderTopWidth: 0,
        borderColor:'white',
        outline: 'none',
        color:'white',
        placeholderTextColor:'white'}}
        placeholder="Senha"
        secureTextEntry={true}
    />



<TouchableOpacity onPress = {() => {/* do this */

if(!nome||!senha){

  Swal.fire({
    title: 'Erro!',
    text: 'Nenhum campo pode estar em branco',
    icon: 'error',
    confirmButtonText: 'Continuar'
  })
  
}if(nome && senha){

var validatinoApi ='https://wesleymontaigne.com/OOP/index.php';
var headers={
 'Accept':'application/json',
 'Content-Type':'application.json',
 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
 'Access-Control-Allow-Origin':'*',
 'crossDomain': 'true',
 'Host': 'https://wesleymontaigne.com/OOP/index.php',
 'Origin': 'https://wesleymontaigne.com',
 
  };
 /*'crossDomain': 'true',*/
 var Data={
  nome:nome,
  senha:senha

 };

 fetch(validatinoApi,
  {
   method:'POST',
   headers:headers,
   body:JSON.stringify(Data)
 }).then((response)=>response.json())
   .then((response)=>{
     if(response.statusCode==200){
      
    navigation.navigate('Bem Vindo',{id:response.userid,sessionid:response.sessionid})

    }else{

   
  Swal.fire({
    title: 'Erro!',
    text: 'Usuário ou senhas errados',
    icon: 'error',
    confirmButtonText: 'Continuar'
  })

    }
   

   })
   .catch((error)=>{
     alert(error);
   });

}








}}>
<View style = {{backgroundColor: 'white', alignItems: 'center',
justifyContent: 'center' ,borderRadius: 10,width:110 }}
>
<Text style = {{ color: 'dodgerblue', padding:10}}>Entrar</Text>
</View>


</TouchableOpacity>
<TouchableOpacity style={{marginTop:14}}>
<FontAwesome name="whatsapp" onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=553195784143&text=Olá tudo bem com vocês?')} size={24} color="white" />
</TouchableOpacity>
<View style={{position:'absolute',marginTop:windowHeight-40}}><Text style={{color:'white',fontSize:10}}>R. A, 264 - Lua Nova da Pampulha, Contagem - MG, 32187-550</Text></View>
</View>

</SafeAreaView>
</KeyboardAvoidingView>
);
}


const Stack = createNativeStackNavigator();
//use navigation hook shown as below


function App() {
  return (
        <NavigationContainer>
    <Stack.Navigator initialRouteName="Focus Fitness" >
    <Stack.Screen name="Focus Fitness" component={HomeScreen}
     options={{
      headerRight:({navigation})=>(
      <TouchableOpacity > 
      <View style={{flexDirection:'row',margin:10}}>
      <View style={{flexDirection:'column',alignItems:'center',flex:1}}>
      <Image  style={{width:60,height:60}} source={require('./assets/logo.png')} />
      </View>
      </View>
      </TouchableOpacity>
       
     ),
    }}
    />
    <Stack.Screen name="Cadastro-Exercicios" component={CadastroExercicios}
    options={{
      headerRight:({navigation})=>(
     <TouchableOpacity> 
         <View style={{flexDirection:'row',margin:10}}>
        <View style={{flexDirection:'column',alignItems:'center',flex:1}}>
        <Image style={{width:60,height:60}} source={require('./assets/logo.png')} />
        </View>
         
        </View>
     </TouchableOpacity>
       
     ),
    }}
    />
    <Stack.Screen name="Bem Vindo" component={Logado}
    options={{
      headerRight:({navigation})=>(
     <TouchableOpacity> 
         <View style={{flexDirection:'row',margin:10}}>
        <View style={{flexDirection:'column',alignItems:'center',flex:1}}>
        <Image style={{width:60,height:60}} source={require('./assets/logo.png')} />
        </View>
         
        </View>
     </TouchableOpacity>
       
     ),
    }}
    />
    <Stack.Screen name="Ficha" component={Exercicio}
    options={{
      headerRight:({navigation})=>(
     <TouchableOpacity> 
         <View style={{flexDirection:'row',margin:10}}>
        <View style={{flexDirection:'column',alignItems:'center',flex:1}}>
        <Image style={{width:60,height:60}} source={require('./assets/logo.png')} />
        </View>
         
        </View>
     </TouchableOpacity>
       
     ),
    }}
    />
    <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;