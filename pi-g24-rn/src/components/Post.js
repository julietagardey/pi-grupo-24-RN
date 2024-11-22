import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";


class Post extends Component {
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


 likear(){
   db.collection("posts")
   .doc(this.props.postInfo.id)
   .update({
       likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
   })
   .then( () => {
     this.setState({
     liked: true,
     cantLikes: this.props.postInfo.data.likes.length
     })
   })
 }


 deslikear(){
   db.collection("posts")
   .doc(this.props.postInfo.id)
   .update({
       likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
   })
   .then( () => {
     this.setState({
     liked: false,
     cantLikes: this.props.postInfo.data.likes.length
     })
   })
 }




 render() {
   return (
     <View style={styles.container}>
       <Text style={styles.owner}> 
           By: {this.props.postInfo.data.owner} 
       </Text>    
       <Text style={styles.descripcion}> 
           {this.props.postInfo.data.descripcion} 
       </Text>
       <Text style={styles.date}> 
           Fecha: { new Date(this.props.postInfo.data.createdAt).toLocaleString()} 
       </Text>
       {
         this.state.liked ? (
           <TouchableOpacity onPress={() => this.deslikear()} style={styles.botonNM} >
             <Text style={styles.botonTexto}>Ya no me gusta</Text>
           </TouchableOpacity>
         ) : (
           <TouchableOpacity onPress={() => this.likear()} style={styles.botonMG}>
             <Text style={styles.botonTexto}>Me gusta</Text>
           </TouchableOpacity>
         )
       }
       <Text style={styles.likes}>Cantidad de likes: {this.state.cantLikes}</Text>
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
 botonMG: {
   backgroundColor: "#eeaeca",
   paddingHorizontal:10,
   paddingVertical: 6,
   textAlign: "center",
   borderRadius: 4,
   borderWidth: 1,
   borderStyle: "solid",
   borderColor: "#eeaeca",
   marginTop: 10
},
botonNM: {
 backgroundColor: "#6ca5e9",
 paddingHorizontal:10,
 paddingVertical: 6,
 textAlign: "center",
 borderRadius: 4,
 borderWidth: 1,
 borderStyle: "solid",
 borderColor: "#6ca5e9",
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


export default Post;