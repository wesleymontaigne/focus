import React, {useEffect,useState,useRef} from 'react';
import { Text, View ,StyleSheet ,TouchableOpacity,TouchableHighlight ,StatusBar,Image,Dimensions,SafeAreaView,ActivityIndicator,FlatList,Animated} from 'react-native';
import Swal from 'sweetalert2';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
//importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


function Exercicio({ navigation,route }){
const windowHeight = Dimensions.get('window').height;
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [nome,setNome]=React.useState('');
const [foto,setFoto]=React.useState('../assets/logo.png');
const [datainicio,setdatainicio]=React.useState();
const [objetivo,setObejetivo]=React.useState();
const [iduser,setIdUser]=React.useState(route.params.id);
const [aula,setaula]=React.useState(route.params.aula);
const [startAula,setStartAula]=React.useState(true);


{/*watch vars*/}
const [isTimerStart, setIsTimerStart] = useState(false);
const [isStopwatchStart, setIsStopwatchStart] = useState(false);
const [timerDuration, setTimerDuration] = useState(90000);
const [resetTimer, setResetTimer] = useState(false);
const [resetStopwatch, setResetStopwatch] = useState(false);


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
     console.log(iduser)
    fetch(`https://wesleymontaigne.com/OOP/?id=${iduser}&exercise=true&aula=${aula}`,{method:'GET'})
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  {/*Separator to FlatList*/}
  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
      />
    );
  };

  
  return (
    <SafeAreaView style={{ flex:1,marginTop: StatusBar.currentHeight || 0}}>
    <View style={{ backgroundColor:'dodgerblue',height:windowHeight }}>
    <View style={{flexDirection:'row',margin:7}}>
    <Image style={{width:125,height:125,borderRadius:25}} source={{uri:foto}} />   
    <View style={{marginLeft:7}}>
    <Text style={{color:'white',marginTop:5}}>{nome}</Text> 
    <Text style={{color:'white',marginTop:7}}>Data: {datainicio}</Text>
    <Text style={{color:'white',marginTop:7}}>Objetivo:</Text>
    <Text style={{color:'white',marginTop:7}}>{objetivo}</Text>
     
    
    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{startAula?setStartAula(false):setStartAula(true);
    }}>
    {startAula?<View style={{flexDirection:'row'}}>
     <Entypo name="stopwatch" size={24} color="white"  /><Text style={{color:'white',marginLeft:7}}>Iniciar treino</Text>
    
    </View>:
    <View style={{flexDirection:'row'}}>
    <Entypo name="stopwatch" size={24} color="white"  /><Text style={{color:'yellow',marginLeft:7}}>STOP TREINO</Text>
    </View>
    } 
    </TouchableOpacity>
    </View>
    {startAula?<View></View>:
    <View style={{flex:1,Items:'center',margin:7,alignContent:'center',justifyContent:'center'}}>
    <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            msecs
            start={isStopwatchStart}
            //To start
            reset={resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}>
            <Text style={styles.buttonText}>
              {!isStopwatchStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
        {/*
        <View style={styles.sectionStyle}>
          <Timer
            totalDuration={timerDuration}
            msecs
            //Time Duration
            start={isTimerStart}
            //To start
            reset={resetTimer}
            //To reset
            options={options}
            //options for the styling
            handleFinish={() => {
              alert('Custom Completion Function');
            }}
            //can call a function On finish of the time
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(!isTimerStart);
              setResetTimer(false);
            }}>
            <Text style={styles.buttonText}>
              {!isTimerStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(false);
              setResetTimer(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
        */}
    </View>}
    
   

    </View>
    <Animated.View style={{transform:[{translateY:translateX}]}} >
    <View style={{}}>
    <View style={{backgroundColor: 'dodgerblue'}}>
    {isLoading ? <ActivityIndicator/> : (
      <FlatList
      data={data}
      //data defined in constructor
      ItemSeparatorComponent={ItemSeparatorView}
      keyExtractor={({ id }, index) => id}
      ListFooterComponent={<View><Text>Voltar</Text></View>}
      renderItem={({ item }) => (
     
      <View style={{flex:0,marginBottom:7,marginTop:7}}>
      <View style={{flexDirection:'row',marginLeft:7,alignItems:'center'}}>
      <Image  style={{width:60,height:60,resizeMode:'contain',marginTop:7}} source={require('../assets/g817.png')} />
      <Text style={{color:'white',marginLeft:14,fontSize:16}}>{item.treino}</Text>
      <TouchableOpacity onPress={()=>{
       navigation.navigate('Youtube',{id:item.youtube})
      }}>
      <FontAwesome name="youtube" size={24} color="white" style={{marginLeft:14}} />
      </TouchableOpacity>

      <TouchableOpacity>
       <Foundation name="page-edit" size={24} color="white" style={{marginLeft:14}} /> 
      </TouchableOpacity>
     
      </View >
      <View style={{flex:1,margin:7}}>
      <View style={{flexDirection:'row',alignItems:'center',margin:5}}>
      <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/serie.png')}/>
      <Text style={{color:'white'}}>Serie: {item.serie}</Text>
      </View>
      
      <View style={{flexDirection:'row',alignItems:'center',margin:5}}>
      <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/rep.png')}/>
      <Text style={{color:'white'}}> Repet: {item.rep}</Text>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',margin:5}}>
      <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/duracao.png')}/>
      <Text style={{color:'white'}}> Duraç:{item.duracao}</Text>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',margin:5}}>
      <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/peso.png')}/>
      <Text style={{color:'white'}}> Peso : {item.peso}</Text>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',margin:5}}>
      <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/evolution.png')}/>
      <Text style={{color:'white'}}> Evolu : {item.evolucao}</Text>
      </View>


      </View>
      {/*<Text style={{marginLeft:10,color:'white'}}>SERIE: {item.serie} | REP: {item.rep} | DURA: {item.duracao} |  PESO: {item.peso} | EVOLUCAO: {item.evolucao} |</Text>
      */}
             
      </View>
     
     


      
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



export default Exercicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:50
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
    color:'white'
  },
});

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    color:'white'
  },
  text: {
    fontSize: 25,
    color: 'white',
    marginLeft: 7,
  },
};
