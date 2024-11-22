import { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import PostProfile from "../components/PostProfile";




class Profile extends Component{
   constructor(props){
       super(props)
       this.state = {
           loading: true,
           posts: [],
           infoUser: []
       }
   }


   componentDidMount(){
       // busco los datos del usuario
       db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(
           docs => {
               let info = [];
               docs.forEach( doc => {
                   info.push({
                       id: doc.id,
                       data: doc.data()
                   })
               })
               this.setState({
                   infoUser: info[0].data,
                   loading: false
               }, ()=> console.log("usuario: ", JSON.stringify(this.state.infoUser, null, 4)))
           }
       )


       // busco los posts de este usuario
       db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
           (docs) => {
               let arrayDocs = []
               docs.forEach( doc => {
                   if (doc.data().owner === auth.currentUser.email) {
                       arrayDocs.push({
                           id: doc.id,
                           data: doc.data()
                       })
                   }
               })
               this.setState({
                   posts: arrayDocs,
                   loading: false
               }, ()=> console.log("posteos en el home: ", JSON.stringify(this.state.posts, null, 4)) )
           }
       )
   }


   borrarPost(id){
       db.collection("posts")
       .doc(id)
       .delete()
       .then(() => console.log("Post eliminado"))
       .catch((error) => console.log("Error:", error))
   }


   logout(){
       auth
           .signOut()
           .then(() => {
               this.props.navigation.navigate("Login")
           })
           .catch((error) => console.log(error));
   }


   render(){
       return(
       <View style={styles.container}>
           <Text style={styles.titulo} >Mi Perfil</Text>


           <Text style={styles.nombre}>Nombre: {this.state.infoUser.nombre}</Text>
           <Text style={styles.nombre}>Email: {auth.currentUser.email}</Text>
           <Text style={styles.nombre}>Cantidad total de posts: {this.state.posts.length}</Text>
           <Text style={styles.subtitulo}>Mis posts: </Text>
           {
               this.state.posts.length === 0 ? (
                   <Text style={styles.nombre} > No hay posts aun</Text>
               ) : (
               <FlatList
               data={this.state.posts}
               keyExtractor={item => item.id}
               renderItem={({item}) => <PostProfile postInfo={item} borrarPost={(id) => this.borrarPost(id)} />}
               // paso como parámetro la funcionalidad para el boton de borrar
               />
               )
           }


           <TouchableOpacity onPress={()=> this.logout()} style={styles.logoutButton}>
               <Text style={styles.logoutText}>Logout</Text>
           </TouchableOpacity>


       </View>
       )
   }
}


const styles = StyleSheet.create({
   container:{
       width:"100%",
       flex:1,
       padding: 10,
       alignItems: "center"
   },
   logoutButton: {
       backgroundColor: "#f25330",
       padding: 10,
       borderRadius: 5,
       marginTop: 10,
   },
   logoutText: {
       color: "white",
       textAlign: "center",
   },
   titulo: {
       fontWeight: "bold",
       fontSize: 20,
       marginTop: 10
   },
   nombre: {
       fontSize: 15,
       marginTop: 10
   },
   subtitulo: {
       fontSize: 18,
       marginTop: 10
   }
})




export default Profile;