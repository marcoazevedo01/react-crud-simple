import {View, Text, StyleSheet,TouchableHighlight} from "react-native";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

const NavBar = (props) => {

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Sair</Nav.Link>
            <NavDropdown title="Config" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const Footer = (props) => {
  var styles = StyleSheet.create({
    mainviewStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  footer: {
    position: 'relative',
    flex:0.1,
    left: 0,
    right: 0,
   
    backgroundColor:'green',
    flexDirection:'row',
    height:50,
    alignItems:'center',
  },
  bottomButtons: {
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
  footerText: {
    color:'white',
    fontWeight:'bold',
    alignItems:'center',
    fontSize:18,
  },
  textStyle: {
    alignSelf: 'center',
    color: 'orange'
  },
  scrollViewStyle: {
    borderWidth: 2,
    borderColor: 'blue'
  }
  });
  return (
    <div className={'page-footer font-small pt-5'}>
      <View style={styles.mainviewStyle}>
        <View style={styles.footer}>
        <TouchableHighlight style={styles.bottomButtons}>
            <Text style={styles.footerText}>A</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.bottomButtons}>
            <Text style={styles.footerText}>B</Text>
        </TouchableHighlight>
        </View>
    </View>
  </div>
  );
};

export {NavBar, Footer};