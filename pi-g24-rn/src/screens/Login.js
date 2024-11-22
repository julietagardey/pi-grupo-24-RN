import { Component } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { auth } from "../firebase/config"

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            logued: false,
            error: ""
        }
    }

    // ver si usuario ya esta logueado
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if (user) {
                console.log("usuario logueado: ", JSON.stringify(user,null,4));
                this.props.navigation.navigate("HomeMenu")
            }
        })
    }

    login(){

        if (!this.state.email.includes("@")) {
            this.setState({error: "Email mal formateado."})
            return;
        }
        if (this.state.password.length < 6) {
            this.setState({error: "La contraseña debe tener al menos 6 caracteres."})
            return;
        }

        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                this.setState({logued: true, error: ""}) // limpio los errores que había antes por si ahora después aparece error de credenciales
            })
            .then(() => this.props.navigation.navigate("HomeMenu"))
            .catch((error) => {
                this.setState({error: "Credenciales incorrectas."})
            })
    }

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.imagen} 
                    source={require("../../assets/mind.png")}
                    resizeMode="contain"/>

                <Text style={styles.titulo}>Login</Text>

                {this.state.error !== "" && (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                )}
                

                {/* FORMULARIO DE LOGIN */}
                <TextInput style={styles.field}
                keyboardType="email-address"
                placeholder="email"
                onChangeText={ text => this.setState({email: text})}
                value={this.state.email}
                />
                <TextInput style={styles.field}
                keyboardType="default"
                placeholder="password"
                secureTextEntry={true}
                onChangeText={ text => this.setState({password: text})}
                value={this.state.password}
                />
                <TouchableOpacity onPress={()=> this.login()} style={styles.boton}>
                    <Text style={styles.botonTexto}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")} style={styles.botonRegister}>
                    <Text style={styles.botonTextoRegister}>No tengo cuenta</Text>
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
        alignItems: "center",
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
    titulo: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10
    },
    botonRegister: {
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
    botonTextoRegister: {
        color: "white",
        fontWeight: "bold"
    },
    botonEntrar: {
        backgroundColor: "yellow",
        paddingHorizontal:10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "yellow"
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


export default Login;