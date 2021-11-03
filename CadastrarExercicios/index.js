import * as React from 'react';
import { Text, View ,TextInput ,TouchableOpacity ,Button,Image} from 'react-native';
import Swal from 'sweetalert2'

function Cadastro({ navigation }) {
  const [nome, setText] = React.useState('');
  const [senha,setSenha] = React.useState('');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'dodgerblue' }}>
    <View style={{alignItems:'center'}}
    ><TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
    <Image style={{width:150,height:150}} source={require('../assets/logo.png')} />
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

var validatinoApi ='https://wesleymontaigne.com/controller/api/api.php';
var headers={
 'Accept':'application/json',
 'Content-Type':'application.json',
 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
 'Access-Control-Allow-Origin':'*',
 'crossDomain': 'true',
 'Host': 'https://wesleymontaigne.com/controller/api/api.php',
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
    alert(response.statusCode)

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
<Text style = {{ color: 'dodgerblue', padding:10}}>Cadastrar</Text>
</View>
</TouchableOpacity>
</View>
);
}



export default Cadastro;