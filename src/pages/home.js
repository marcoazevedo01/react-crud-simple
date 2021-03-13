import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {Alert,Containerm,Form,Button} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import Background from '../components/background';
import axios from 'axios';

const Home = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState(''); 
    const [msgShow, msgSetShow] = useState(false); 
    let history = useHistory();

    async function logar(){
      const obj = {email, senha};
      const res = await axios.post('http://localhost:5000/login', obj);
      console.log(res);
      if(res.data.sucess){
        history.push("/user");
      }else{
       msgSetShow(true);
      }
    }
  
    const estilos = StyleSheet.create({
        modal: {
            flex: 1,
            backgroundColor: '#b2b2b2'
        },

        textoModal: {          
            marginLeft: 15,
            fontSize: 35,
        },

        modalHeader: {
            marginLeft: -10,
            marginTop: 20,
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 30,
        },

        input: {
            backgroundColor: '#CCCCCC',
            borderRadius: 5,
            margin: 10,
            padding: 10,
            color: '#000',
            fontSize: 13
        },

        botaoModal: {
            backgroundColor: '#00335c',
            borderRadius: 5,
            margin: 8,
            padding: 12,
            color: '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'

        },

        textoBotaoModal: {
            fontSize: 16,
            color: '#FFF',
        },
    });
    return(
        <div className="col-md-12">  
            <Background>   
                <Alert variant={"danger"} show={msgShow}>
                    Email ou senha incorretos      
                </Alert>
                <View style={estilos.modalHeader}>
                    <Text style={estilos.textoModal}>Login</Text>
                </View> 
                     
                <TextInput 
                    type="email"
                    style={estilos.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={ (email) => setEmail(email)}
                />
                 
                <TextInput 
                    secureTextEntry={true}
                    style={estilos.input}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={ (senha) => setSenha(senha)}
                />
                    
                <TouchableOpacity  
                    style={estilos.botaoModal}
                    onPress={()=>logar()}
                >         
                <Text style={estilos.textoBotaoModal}>Entrar</Text>
                </TouchableOpacity>             
            </Background>
        </div>
    );
}
  
export default Home;