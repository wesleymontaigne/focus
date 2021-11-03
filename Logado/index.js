import React, { useEffect, useState } from 'react';
import { Text, View ,TextInput ,TouchableOpacity ,Button,Image,Dimensions,SafeAreaView} from 'react-native';
import Swal from 'sweetalert2';


function Logado({ navigation }) {
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  fetch('https://wesleymontaigne.com/controller/api/')
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);
  
  return (
    <SafeAreaView>
    <View style={{ backgroundColor:'dodgerblue',height:windowHeight }}>
    <View style={{flexDirection:'row',margin:7}}>
    <Image style={{width:125,height:125,borderRadius:25}} source={{uri:'https://i.pravatar.cc/300'}} />   
    <View style={{marginLeft:7}}>
    <Text style={{color:'white',marginTop:5}}>Wesley Montaigne</Text> 
    <Text style={{color:'white',marginTop:7}}>Data: 11/10/21</Text>
    <Text style={{color:'white',marginTop:7}}>Objetivo:</Text>
    <Text style={{color:'white',marginTop:7}}>Fortalecimento</Text> 
    </View>
    </View>

    <View style={{}}>
    <Text style={{color:'white',fontSize:10,marginLeft:14}}>Aulas</Text>
    <View style={{flexDirection:'row',marginLeft:7,alignItems:'center'}}>
    <Image  style={{width:60,height:60,resizeMode:'contain'}} source={require('../assets/pulseHeart.png')} />
    <Text style={{color:'white',marginLeft:14}}>Aula 1</Text>
    </View>
    </View>
    
    </View>
   </SafeAreaView>
);
}



export default Logado;