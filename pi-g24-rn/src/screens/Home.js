import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {auth, db} from "../firebase/config";
import { Component } from "react";
import Post from "../components/Post";




class Home extends Component {
   constructor(props){
       super(props)
       this.state = {
           posts: [],
           loading: true
       }
   }


   componentDidMount(){
       db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
           (docs) => {
               let arrayDocs = []
               docs.forEach( doc => {
                   arrayDocs.push({
                       id: doc.id,
                       data: doc.data()
                   })
               })
               this.setState({
                   posts: arrayDocs,
                   loading: false
               }, ()=> console.log("posteos en el home: ", JSON.stringify(this.state.posts, null, 4)) )
           }
       )
   }


   render(){
       return(
       <View style={styles.flatList}>
           <Text style={styles.titulo} >{`Bienvenido/a ${auth.currentUser.email}`}</Text>
           <Text style={styles.texto}>Todos los Posts</Text>
           {
               this.state.posts.length === 0 ? (
                   <Text> No hay posts aun</Text>
               ) : (
               <FlatList
               data={this.state.posts}
               keyExtractor={item => item.id}
               renderItem={({item}) => <Post postInfo={item}/>}
               />
               )


           }
       </View>
   )}
}


const styles = StyleSheet.create({
   texto: {
       fontSize: 12,
       fontWeight: "bold",
       marginTop: 10
   },
   logoutButton: {
       backgroundColor: "#ff4444",
       padding: 10,
       borderRadius: 5,
       marginTop: 10,
   },
   logoutText: {
       color: "white",
       textAlign: "center",
   },
   flatList: {
       width:"100%",
       flex:1,
       padding: 10,
       alignItems: "center"
   },
   titulo: {
       fontWeight: "bold",
       fontSize: 20,
       marginTop: 10
   }
})


export default Home;

