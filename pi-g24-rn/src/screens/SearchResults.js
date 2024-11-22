import { Component } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { db } from "../firebase/config";




class SearchResults extends Component{
   constructor(props){
       super(props)
       this.state = {
           email: "",
           users: [],
           loading: false,
           // inicializador: false
       }
   }


   buscar(text){


       this.setState({email: text, loading: true }) // esto actualiza el texto y activa el loader


       if (text == "") { // si el texto esta vacio, deja de loading y se detiene
           this.setState({users: [], loading: false})
           return;
       }


      
       db.collection("users").where("email", ">=", text).where("email", "<=", text + '\uf8ff').get()
       .then(
           (docs) => {
               let usuarios = [];
               docs.forEach( doc => {
                   usuarios.push({
                       id: doc.id,
                       data: doc.data()
                   })
               })
               this.setState({
                   users: usuarios,
                   loading: false
               })
           })
       .catch((error) => {
           this.setState({loading: false})
           console.log("error buscando usuarios: ", error);
       })
   }


   render(){
       return(
           <View style={styles.container}>
               <Image style={styles.imagen}
                   source={require("../../assets/mind.png")}
                   resizeMode="contain"/>
               <Text style={styles.titulo}>Búsqueda de usuarios</Text>
               <TextInput style={styles.field}
               keyboardType="default"
               placeholder="Buscar por email..."
               onChangeText={ text => this.buscar(text)}
               value={this.state.email}
               />


               {this.state.loading ? (
                   <ActivityIndicator size="large" color="#eeaeca"/>
               ) : this.state.users.length == 0 && this.state.email !== "" ? (
                   <Text>El email no existe</Text>
               ) : (
                   <FlatList
                   data = {this.state.users}
                   keyExtractor={item => item.id}
                   renderItem={({item}) => (
                       <View style={styles.flatList}>
                       <Text>{item.data.email}</Text>
                       </View>
                   )}
                   />
               )
               }
              
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
       alignItems: "center",
   },
   flatList: {
       width: "100%",
       flex: 1,
       padding: 10,
       borderBottomWidth: 1,
       borderBottomColor: "#ccc"
   },
   titulo: {
       fontSize: 20,
       marginVertical:10,
       fontWeight: "bold",
   },
   imagen: {
       height: 140,
   }


})


export default SearchResults;

