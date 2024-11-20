import { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

class HomeMenu extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    // falta el component did Mount
    
    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black"/>}}/>
                <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />}}/>
                <Tab.Screen name="NewPost" component={NewPost} options={{headerShown: false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />}}/>
                {/* falta search results */}
            </Tab.Navigator>
        )
    }
}

export default HomeMenu;