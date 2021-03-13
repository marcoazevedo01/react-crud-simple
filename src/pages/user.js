import React,{useState ,useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {NavBar} from '../components/navbar';
import {Button, Modal, Col, Form} from 'react-bootstrap';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const User = () => {
  const api = 'http://localhost:5000/';
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [_id, setId] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [msgShow, msgSetShow] = useState(false);

  

  useEffect(()=> {
    listarDados();
  },[])

  //cruds
  async function listarDados(valor){
    console.log(valor);
    if(valor){
      const res = await axios.post(api + 'user', {'nome':valor});
      setLista(res.data.result);
    }else{
      const res = await axios.get(api + 'user/' );
      setLista(res.data.result);
    }
  }

  async function addItem(){
    const obj = {_id, nome, email, senha};
    if(_id.length <2){
     const res = await axios.post(api + 'user/0', obj);
      if(res.data.success === true){
        //mensagemSalvar;
        limparCampos();
      }
    }else{
     const res = await axios.put(api + 'user/'+ _id, obj);
      if(res.data.success === true){
        //mensagemSalvar();
        limparCampos();     
      }
        //validar backend
      if(res.data.success === 'Email já Cadastrado!'){
        //mensagemDuplicidade();      
      }  
    }  
    listarDados();
    setShow(false);
  }

  async function removeItem(){
    await axios.delete(api + 'user/' + _id);
    limparCampos();  
    listarDados();
    msgSetShow(false)
  }

  //manipula
  async function setIdItem(id){
    setId(id);
    msgSetShow(true);
  }

  async function getItem(id){
    const res = await axios.get(api + 'user/' + id);
    setId(res.data._id);
    setNome(res.data.nome);
    setEmail(res.data.email);
    setSenha(res.data.senha);
    setShow(true);
  }

  function limparCampos(){
    setNome('');
    setEmail('');
    setSenha('');
    setId('0');
  }

  return(
    <div className="title">
      <View>  
      <NavBar />       
      <View style={estilos.navbar}>     
        <Text style={estilos.textonavbar}>Lista de Usuários</Text>  
          <TouchableOpacity  
            style={estilos.botao}
            onPress={handleShow}
          >    
          <i className="pi pi-user-plus" style={{'color': 'white' , 'fontSize': '1.4em'}}></i>
        </TouchableOpacity>
      </View>

      <View style={estilos.ViewinputBuscar}>
      <TextInput 
        style={estilos.inputBuscar}
        placeholder="Buscar pelo Nome"
        onChangeText={(buscar) => listarDados(buscar)}
      />   
      </View>
  
      <ScrollView>
        <View style={estilos.grid}>{lista.map(item => (
          <View style={estilos.griditem} key={item._id}>
            <Text style={{color: '#585858'}}>{item.nome} - {item.email}</Text>
            <TouchableOpacity style={estilos.gridbotaoEditar}onPress={() => getItem(item._id)} >
            <i className="pi pi-user-edit"  style={{'color': '#CC961E' , 'fontSize': '1.5em'}}></i>      
            </TouchableOpacity>         
            <TouchableOpacity style={estilos.gridbotaoExcluir} onPress={() =>  setIdItem(item._id)} >
            <i className="pi pi-times"  style={{'color': 'red' , 'fontSize': '1.5em'}}></i>       
            </TouchableOpacity>           
          </View>   
        ))}
        </View>
      </ScrollView>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control 
            type="hidden" 
            value={_id}
            onChangeText={ (_id) => setId(_id)} 
          />
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <TextInput 
              style={estilos.input}
              type="text"           
              placeholder="Ex: Marco A." 
              value={nome}
              onChangeText={ (nome) => setNome(nome)}
            />
          </Form.Group>
          
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <TextInput 
              style={estilos.input}
              placeholder="Ex: Rodolfo@gmail.com" 
              value={email}
              required={true}
              
              onChangeText={ (email) => setEmail(email)}
            />
          </Form.Group>
       
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <TextInput 
              style={estilos.input}
              placeholder="Ex: 321a321"
              value={senha}
              onChangeText={ (senha) => setSenha(senha)}
            />
          </Form.Group>  
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="success" onClick={addItem}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={msgShow} onHide={()=>msgSetShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirme a remocao do usuario
        </Modal.Body>
        <Col style={{'text-align': 'center'}} > 
           <Button variant="secondary"  style={{'margin': '15px'}} onClick={()=>msgSetShow(false)}>
              Cancelar
            </Button> 
           <Button variant="success" onClick={removeItem}>
              Deletar
            </Button>       
        </Col>
      </Modal>

     </View> 
        </div>
    );
    
}
const estilos = StyleSheet.create({
  input: {
    backgroundColor: '#CCCCCC',
    borderRadius: 5,
    margin: 8,
    padding: 8,
    color: '#000',
    fontSize: 13
  },

  navbar: {
    backgroundColor: '#00335c',
    padding: 12,
    flexDirection: 'row'
  },

  textonavbar: {
    fontSize: 20,
    color: '#FFF',
    marginTop: 4,
    marginBottom: 2,
  },

  botao: {
    position: 'absolute',
    right: 13,
    marginTop: 11,
  },


  grid: {
    marginTop: 8,

  },

  griditem: {
    padding: 14,
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  gridbotaoEditar: {
    position: 'absolute',
    right: 65
  },

  gridbotaoExcluir: {
    position: 'absolute',
    right: 20
  },

  inputBuscar: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
    padding: 8,
    color: '#000',
    fontSize: 15,
    borderBottomColor: "#767676",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    position: 'relative',
  },

  ViewinputBuscar: {
    flexDirection: 'row',
  },

  iconeBuscar: {
    position: 'absolute',
    right: 20,
    top: 15,
  }
});

export default User;