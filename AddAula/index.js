import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  CheckBox,
  
} from 'react-native';
import Swal from 'sweetalert2';
import Constants from 'expo-constants';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

 



const App = ({navigation,route}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userid,setIdUser]=React.useState(route.params.id);
  const [aula,setAula]=React.useState('Aula 1');
  const [exercicioId,setExercicio]=React.useState('');





  const insertExercide = (Data) =>{
   
    {/*Pegar dados dos usuários*/}
var validationApi ='https://wesleymontaigne.com/OOP/index.php';
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

 fetch(validationApi,
  {
   method:'POST',
   headers:headers,
   body:JSON.stringify(Data)
 }).then((response)=>response.json())
   .then((response)=>{
   if(response.statusCode==200){
   

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

   
  }
  {/*Fim function insert*/}

  {/*deleteExercise*/}

  const deleteExercise = (idproduto,userid,aula) =>{
   
  var Data={
 idproduto:idproduto,
 userid:userid,
 aula:aula
  }  
   
    {/*Pegar dados dos usuários*/}
var validationApi ='https://wesleymontaigne.com/OOP/index.php';
var headers={
 'Accept':'application/json',
 'Content-Type':'application.json',
 'Access-Control-Allow-Methods': 'DELETE',
 'Access-Control-Allow-Origin':'*',
 'crossDomain': 'true',
 'Host': 'https://wesleymontaigne.com/OOP/index.php',
 'Origin': 'https://wesleymontaigne.com',
 
  };
 /*'crossDomain': 'true',*/

 fetch(validationApi,
  {
   method:'DELETE',
   headers:headers,
   body:JSON.stringify(Data)
 }).then((response)=>response.json())
   .then((response)=>{
   if(response.statusCode==200){
    
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

   
  }


  const atributos =(exercicioId,userid,productNome,youtube)=>{
   
    (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Atributos',
        html:'<p>Aula</p>'+
          `<input id="swal-input1" value="${aula}">` +
          '<p>Serie</p>'+
          '<input id="swal-input2" type="number" >'+
          '<p>Rep.</p>'+
          '<input id="swal-input3" type="number" value="3" >'+
          '<p>Duração</p>'+
          '<input id="swal-input4" type="number" >'+
          '<p>Peso</p>'+
          '<input id="swal-input5" type="number" value="15" >'+
          '<p>Evolução</p>'+
          '<input id="swal-input6" type="number" >'+
          '<p>Observação</p>'+
          '<input id="swal-input7" type="number" >',
        focusConfirm: false,
        preConfirm: () => {
        setAula(document.getElementById('swal-input1').value)
         
          return [{
                   nomeExercio:productNome,
                   exercicioId:exercicioId,
                   youtube:youtube,
                   userid:userid, 
                   aula:document.getElementById('swal-input1').value,
                   serie:document.getElementById('swal-input2').value,
                   rep:document.getElementById('swal-input3').value,
                   duracao:document.getElementById('swal-input4').value,
                   peso:document.getElementById('swal-input5').value,
                   evolucao:document.getElementById('swal-input6').value,
                   observacao:document.getElementById('swal-input7').value, 
        },
            
          ]
        }
      })
      
      if (formValues) {

     var resultado=  insertExercide(formValues);
        //Swal.fire(JSON.stringify(formValues))
        
      }
      
      })()

  }


 
   {/*Pegar todos exercicios*/}
   useEffect(() => {
    fetch(`https://wesleymontaigne.com/OOP/?exercise=all`,{method:'GET'})
      .then((response) => response.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        if(!product.isChecked){
        console.log(product.nome)
        atributos(product.id,userid,product.nome,product.youtube);
        }else{
        deleteExercise(product.id,userid,aula)
        }
      



        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

  let selected = products.filter((product) => product.isChecked);

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChange(item.id);
                  }}
                />
                <Text>{item.nome}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
      <Text style={styles.text} onPress={()=>{navigation.replace('Bem Vindo',{id:userid})}}>Terminei</Text>
     {/*<View style={{ flex: 1 }}>{renderFlatList(selected)}</View>
   */} 
   
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
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
});


export default App;