import React, {Component} from 'react'
import {
   Text,
   View,
   TextInput,
   TouchableOpacity
} from 'react-native-web'
import { auth, db } from '../firebase/config'
import { Image, StyleSheet } from 'react-native'


export default class NewPost extends Component {
   constructor(props) {
       super(props)
       this.state = {
           posts: [],
           mensaje: ""
       }
   }


   onSubmit(mensaje){
       if(mensaje === ""){
           return "No puedes crear un posteo vacío"
       }
       db.collection("posts").add({
           owner: auth.currentUser.email,
           descripcion: mensaje,
           createdAt: Date.now(),
           likes: [] // en este array van los usuarios que likearon el post
       })
       .then(this.props.navigation.navigate("Home"))
       .catch(err => console.log(err))
   }


   render() {
       return (
           <View style={styles.container}>
               <Image style={styles.imagen}
                   source={require("../../assets/mind.png")}
                   resizeMode="contain"/>
               <Text style={styles.titulo}>Nuevo posteo</Text>
              


               <TextInput style={styles.field}
                   keyboardType='default'
                   placeholder="Ingrese su posteo"
                   onChangeText={text => this.setState({mensaje: text})}
                   value={this.state.mensaje}
               />
               <TouchableOpacity onPress={() => this.onSubmit(this.state.mensaje)} style={styles.boton}>
                   <Text style={styles.botonTexto}>Cargar posteo</Text>
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
   titulo: {
       fontWeight: "bold",
       fontSize: 20
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
   botonTexto: {
       color: "#fff"
   },
   imagen: {
       height: 140,
   }
})



