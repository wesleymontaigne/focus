import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Image, SafeAreaView, Button } from 'react-native';
import Swal from 'sweetalert2';
import * as ImagePicker from 'expo-image-picker';
import { MaskedTextInput} from "react-native-mask-text";


function Admin({ navigation }) {
  const [nome, setText] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [sobreNome, setSobreNome] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [objectivo, setObjective] = React.useState('')
  const windowHeight = Dimensions.get('window').height;
  const [image, setImage] = React.useState('https://wesleymontaigne.com/OOP/fotos/logo.png');
  const [namefoto, setNomeFoto] = React.useState('');
  const [Type, setType] = React.useState('');
  const [idade,setIdade]=React.useState();
  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");
  




  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // extract the filetype
      setType(result.uri.substring(result.uri.lastIndexOf(".") + 1));
      setImage(result.uri);
      setNomeFoto(result.uri)
    }
  };



  return (
    <SafeAreaView style={{ height: windowHeight }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'dodgerblue', height: windowHeight }}>
        <View style={{ alignItems: 'center' }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Escolher Foto" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
          </View>
        </View>

        <TextInput
          value={telefone}
          onChangeText={(telefone) => setTelefone(telefone)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderColor: 'white',
            outline: 'none',
            color: 'white',
            placeholderTextColor: 'white'
          }}
          placeholder="Telefone"
          keyboardType='number-pad'

        />

        <TextInput
          value={nome}
          onChangeText={(nome) => setText(nome)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderColor: 'white',
            outline: 'none',
            color: 'white',
            placeholderTextColor: 'white'
          }}
          placeholder="Nome"
          keyboardType='default'

        />

        <TextInput
          value={sobreNome}
          onChangeText={(sobreNome) => setSobreNome(sobreNome)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderColor: 'white',
            outline: 'none',
            color: 'white',
            placeholderTextColor: 'white'
          }}
          placeholder="Sobre Nome"
          keyboardType='default'
        />
        
        
<MaskedTextInput
        mask="(99/99/9999)"
        onChangeText={(text, rawText) => {
          setMaskedValue(text);
          setUnmaskedValue(rawText);
        }}
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderTopWidth: 0,
          borderColor: 'white',
          outline: 'none',
          color: 'white',
          placeholderTextColor: 'white'
        }}
        placeholder='Idade'
        keyboardType="numeric"
      />

        <TextInput
          value={objectivo}
          onChangeText={(objectivo) => setObjective(objectivo)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderColor: 'white',
            outline: 'none',
            color: 'white',
            placeholderTextColor: 'white'
          }}
          placeholder="Objetivo"
          keyboardType='default'

        />

        <TextInput
          value={senha}
          onChangeText={(senha) => setSenha(senha)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderColor: 'white',
            outline: 'none',
            color: 'white',
            placeholderTextColor: 'white'
          }}
          placeholder="Senha"
          secureTextEntry={true}
        />



        <TouchableOpacity onPress={() => {/* do this */

          if (!nome || !senha || !telefone || !sobreNome || !objectivo||!maskedValue||!image) {

            Swal.fire({
              title: 'Erro!',
              text: 'Nenhum campo pode estar em branco',
              icon: 'error',
              confirmButtonText: 'Continuar'
            })

          } if (nome && senha) {

            if (telefone.length < 11) {

              Swal.fire({
                title: 'Erro!',
                text: 'Não esqueça o DDD algo errado o numero de telefone',
                icon: 'error',
                confirmButtonText: 'Continuar'
              })
              return true;
            }

            if(!image){
              Swal.fire({
                title: 'Erro!',
                text: 'Escolha uma foto',
                icon: 'error',
                confirmButtonText: 'Continuar'
              })
              return true;
            }

            {/*set loading from Swal*/}
            {Swal.showLoading()}

            var validatinoApi = 'https://wesleymontaigne.com/OOP/fotos/index.php';
            var headers = {
              'Accept': 'application/json',
              "Content-Type": "multipart/form-data",
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Origin': '*',
              'crossDomain': 'true',
              'Host': 'https://wesleymontaigne.com/OOP/',
              'Origin': 'https://wesleymontaigne.com',

            };
            /*'crossDomain': 'true',*/
            var Data = {
              telefone: telefone,
              nome: nome,
              sobreNome: sobreNome,
              objectivo: objectivo,
              senha: senha,
              image: image,
              namefoto: `photo.${namefoto}`,
              type: `image/${Type}`,
              idade:maskedValue

            };

            fetch(validatinoApi,
              {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data)
              }).then((response) => response.json())
              .then((response) => {
                if (response.statusCode == 200) {
                  {Swal.hideLoading()}
                  navigation.navigate('Dashboard', { id: response.userid, sessionid: response.sessionid })

                } else {

                  Swal.hideLoading()
                  Swal.fire({
                    title: 'Erro!',
                    text: 'Verifique sua internet',
                    icon: 'error',
                    confirmButtonText: 'Continuar'
                  })

                }


              })
              .catch((error) => {
                alert(error);
              });

          }








        }}>
          <View style={{
            backgroundColor: 'white', alignItems: 'center',
            justifyContent: 'center', borderRadius: 10, width: 110
          }}
          >
            <Text style={{ color: 'dodgerblue', padding: 10 }}>Cadastrar</Text>
          </View>
        </TouchableOpacity>
        <View style={{ position: 'absolute', marginTop: windowHeight - 40 }}><Text style={{ color: 'white', fontSize: 10 }}>R. A, 264 - Lua Nova da Pampulha, Contagem - MG, 32187-550</Text></View>
      </View>
    </SafeAreaView>
  );
}


export default Admin;