import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import NewPost from "../screens/NewPost";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Component } from "react";
import { auth } from "../firebase/config";
import SearchResults from "../screens/SearchResults";


const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if (!user) {
                this.props.navigation.navigate("Login")
            }
        })
    }
    render(){
        return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black" />}}/>
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />}}/>
            <Tab.Screen name="NewPost" component={NewPost} options={{headerShown: false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />}}/> 
            <Tab.Screen name="SearchResults" component={SearchResults} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />}}/> 
        </Tab.Navigator>
        )
    }  
}

export default HomeMenu;