import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";


class PostProfile extends Component {
 constructor(props) {
   super(props);
   this.state = {
     liked: false,
     cantLikes: this.props.postInfo.data.likes.length
   };
 }
 componentDidMount(){
   if (this.props.postInfo.data.likes.includes(auth.currentUser.email)) {
     this.setState({
       liked:true,
       cantLikes: this.props.postInfo.data.likes.length
     })
   }
 }


 render() {
   return (
     <View style={styles.container}>   
       <Text style={styles.descripcion}> 
           {this.props.postInfo.data.descripcion} 
       </Text>
       <Text style={styles.date}> 
           Fecha: { new Date(this.props.postInfo.data.createdAt).toLocaleString()} 
       </Text>
       <Text style={styles.likes}>Cantidad de likes: {this.state.cantLikes}</Text>


       <TouchableOpacity onPress={() => this.props.borrarPost(this.props.postInfo.id)} style={styles.boton} >
             <Text style={styles.botonTexto}>Borrar</Text>
           </TouchableOpacity>
      
     </View>
   );
 }
}


const styles = StyleSheet.create({
 container: {
   backgroundColor: "#fff",
   padding:15,
   marginVertical: 8,
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 2
   },
   shadowOpacity: 0.2,
   shadowRadius: 3.84,
   elevation: 5
 },
 owner: {
   fontWeight: "600",
   marginBottom: 8
 },
 descripcion: {
   color: "666",
   fontSize: 14,
   marginBottom: 10
 },
 date: {
   color: "666",
   fontSize: 10
 },
boton: {
 backgroundColor: "#c7b4d8",
 paddingHorizontal:10,
 paddingVertical: 6,
 textAlign: "center",
 borderRadius: 4,
 borderWidth: 1,
 borderStyle: "solid",
 borderColor: "#c7b4d8",
 marginTop: 10
},
botonTexto: {
   color: "#fff"
},
likes: {
 color: "666",
 fontSize: 12,
 marginTop: 10
}
 });


export default PostProfile;