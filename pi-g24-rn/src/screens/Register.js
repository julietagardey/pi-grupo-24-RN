import { Component } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { auth, db } from "../firebase/config";




class Register extends Component{
   constructor(props){
       super(props)
       this.state = {
           email: "",
           password: "",
           userName: "",
           registered: false,
           error: ""
       }
   }


   // ver si usuario ya esta logueado
   componentDidMount(){
       auth.onAuthStateChanged( user => {
           if (user) {
               this.props.navigation.navigate("HomeMenu")
           }
       })
   }
   envioBlanco(){
       if (this.state.email == "" || this.state.password == "" || this.state.userName == "") { // pregunta si alguno esta vacio
           this.setState({ error: "Todos los campos son obligatorios." });
           return;
       }
   }


   register(){
       auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
           .then((response) => {
               this.setState({registered: true, error: ""}) // limpio error por si hubo error antes de que no completó algún campo
               db.collection("users").add({
                   owner: this.state.email,
                   email: this.state.email,
                   nombre: this.state.userName,
                   createdAt: Date.now()
               })
           })
           .then(()=> this.props.navigation.navigate("HomeMenu"))
           .catch((e) => this.setState({error: e.message}))
   }


   render(){
       const formCompletado = this.state.email != "" && this.state.password != "" && this.state.userName != "" // me va a servir para verificar que no haya datos en blanco


       return(
           <View style={styles.container}>
               <Image style={styles.imagen}
                   source={require("../../assets/mind.png")}
                   resizeMode="contain"/>


               <Text style={styles.titulo} >Registro</Text>


               {this.state.error !== "" && (
                   <Text style={styles.errorText}>{this.state.error}</Text>
               )}


               {/* FORMULARIO DE REGISTER */}
               <TextInput style={styles.field}
               keyboardType="email-address"
               placeholder="email"
               onChangeText={ text => this.setState({email: text})}
               value={this.state.email}
               />
               <TextInput style={styles.field}
               keyboardType="default"
               placeholder="user name"
               onChangeText={ text => this.setState({userName: text})}
               value={this.state.userName}
               />
               <TextInput style={styles.field}
               keyboardType="default"
               placeholder="password"
               secureTextEntry={true}
               onChangeText={ text => this.setState({password: text})}
               value={this.state.password}
               />
              
               {/* la logica que pensamos aca es que si hay algun campo en blanco, el boton se pone gris y no tiene el callback de register */}
               {/* una vez que los campos estan llenos, el boton se pone violeta y se puede enviar, si hay errores los muestra en pantalla  */}
               {formCompletado ? (
                   <TouchableOpacity onPress={()=> this.register()} style={styles.boton}>
                       <Text style={styles.botonTexto}>Registrar</Text>
                   </TouchableOpacity>
               ) : (
                   <TouchableOpacity onPress={() => this.envioBlanco()} style={styles.botonDesactivado}>
                       <Text style={styles.botonTexto}>Registrar</Text>
                   </TouchableOpacity>
               )}
              


               <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.botonLogin}>
                   <Text style={styles.botonTextoLogin}>Ya tengo cuenta</Text>
               </TouchableOpacity>
           </View>
       )
   }
}




const styles = StyleSheet.create({
   field: {
       borderWidth: 1,
       borderColor: "#ccc",
       borderRadius: 6,
       height: 20,
       paddingVertical: 15,
       paddingHorizontal:10,
       borderStyle: "solid",
       marginVertical: 10
   },
   container: {
       paddingHorizontal: 10,
       marginTop: 20,
       alignItems: "center"
   },
   boton: {
       backgroundColor: "#c7b4d8",
       paddingHorizontal:10,
       paddingVertical: 6,
       textAlign: "center",
       borderRadius: 4,
       borderWidth: 1,
       borderStyle: "solid",
       borderColor: "#c7b4d8"
   },
   botonDesactivado: {
       backgroundColor: "#d3d3d3",
       paddingHorizontal:10,
       paddingVertical: 6,
       textAlign: "center",
       borderRadius: 4,
       borderWidth: 1,
       borderStyle: "solid",
       borderColor: "#d3d3d3"
   },
   botonTexto: {
       color: "#fff"
   },
   titulo: {
       fontWeight: "bold",
       fontSize: 20,
       marginTop: 10
   },
   botonLogin: {
       backgroundColor: "#94bbe9",
       paddingHorizontal:10,
       paddingVertical: 6,
       textAlign: "center",
       borderRadius: 4,
       borderWidth: 1,
       borderStyle: "solid",
       borderColor: "#94bbe9",
       marginTop: 10
   },
   botonTextoLogin: {
       color: "white",
       fontWeight: "bold"
   },
   imagen: {
       height: 140,
   },
   errorText: {
       color: "red",
       fontSize: 14,
       marginVertical: 10,
       textAlign: "center"
   }


})


export default Register;