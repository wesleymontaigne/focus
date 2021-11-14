import React, {useEffect,useState,useRef} from 'react';
import { Text, View ,TextInput ,TouchableOpacity ,Button,Image,Dimensions,SafeAreaView,ActivityIndicator,FlatList,Animated} from 'react-native';
import Swal from 'sweetalert2';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


function Logado({ navigation,route }){
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [nome,setNome]=React.useState('');
const [foto,setFoto]=React.useState('../assets/logo.png');
const [datainicio,setdatainicio]=React.useState();
const [objetivo,setObejetivo]=React.useState();
const [iduser,setIdUser]=React.useState(route.params.id);



{/*Animations sets*/}
const [listItems, setListItems] = useState(data);
const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
useEffect(()=>{
  Animated.timing(translateX,{toValue:0,duration:2000}).start();
})




{/*Pegar dados dos usuários*/}
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
  app:'focus',
  id:'1',
  };

 fetch(validatinoApi,
  {
   method:'POST',
   headers:headers,
   body:JSON.stringify(Data)
 }).then((response)=>response.json())
   .then((response)=>{
     if(response.statusCode==200){
    setNome(response.data.nome)
    setdatainicio(response.data.datainicio)
    setObejetivo(response.data.objetivo)
    if(response.data.foto){
      setFoto(response.data.foto)
    }

    }else{

   
  Swal.fire({
    title: 'Erro!',
    text: response.statusCode,
    icon: 'error',
    confirmButtonText: 'Continuar'
  })

    }
   

   })
   .catch((error)=>{
     alert(error);
   });

   {/*Pegar todas as aulas*/}
   useEffect(() => {
    fetch(`https://wesleymontaigne.com/OOP/?id=${iduser}`,{method:'GET'})
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <SafeAreaView>
    <View style={{ backgroundColor:'dodgerblue',height:windowHeight }}>
    <View style={{flexDirection:'row',margin:7}}>
    <Image style={{width:125,height:125,borderRadius:25}} source={{uri:foto}} />   
    <View style={{marginLeft:7}}>
    <Text style={{color:'white',marginTop:5}}>{nome}</Text> 
    <Text style={{color:'white',marginTop:7}}>Data: {datainicio}</Text>
    <Text style={{color:'white',marginTop:7}}>Objetivo:</Text>
    <Text style={{color:'white',marginTop:7}}>{objetivo}</Text>
    <View style={{flexDirection:'row',alignContent:'space-around'}}>
    <TouchableOpacity style={{flexDirection:'row',marginRight:7}}>
    <FontAwesome name="credit-card" size={24} color="white" /><Text style={{color:'white',marginLeft:7}}>Em dia</Text>
    </TouchableOpacity> 
    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{
      navigation.replace('AddAula',{id:iduser});
    }} >
    <FontAwesome name="dashboard" size={24} color="white" /><Text style={{color:'white',marginLeft:7}}>Painel</Text>
    
    </TouchableOpacity>
    </View>
    </View>
    </View>
    <Animated.View style={{transform:[{translateY:translateX}]}} >
    <View style={{}}>
    <View style={{ flex: 1,
      backgroundColor: 'dodgerblue',
      alignItems: 'center',
      justifyContent: 'center', }}>
    {isLoading ? <ActivityIndicator/> : (
      <FlatList
      data={data}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Ficha',{id:iduser,aula:item.aula})}>
      <View style={{flex:0}}>
      <View style={{flexDirection:'row',marginLeft:7,alignItems:'center'}}>
      <Image  style={{width:60,height:60,resizeMode:'contain'}} source={require('../assets/pulseHeart.png')} />
      <Text style={{color:'white',marginLeft:14}}>{item.aula}</Text>
      </View>
          
      </View>
      </TouchableOpacity> 


      
        )}
      />
    )}
  </View>

  
    </View>
    </Animated.View>    
    </View>
   </SafeAreaView>
);
}



export default Logado;