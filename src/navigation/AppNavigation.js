import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { THEME } from '../theme'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'


const navigatorOption = {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: THEME.MAIN_COLOR
        },
        headerTintColor: '#fff'
    }
}

const PostNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Post: PostScreen
    },
    navigatorOption
)

const BookedNavigator = createStackNavigator(
{
    Booked: BookedScreen,
    Post: PostScreen
},
{
    initialRouteName: 'Booked', 
    navigatorOption
}
)

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: 'Все',
            tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.tintColor} />
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: 'Избранное',
            tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.tintColor} />
        }
    }
}

const BottomNavigator = Platform.OS==='android' ? createMaterialBottomTabNavigator(bottomTabsConfig,{
    activeTintColor: '#fff',
    shifting: true,
    barStyle:{
        backgroundColor: THEME.MAIN_COLOR
    }
}) :  createBottomTabNavigator(
    bottomTabsConfig,
    {
    tabBarOptions: {
        activeTintColor: THEME.MAIN_COLOR
    }
})


const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, navigatorOption)


const CreateNavigator = createStackNavigator({
    Create: CreateScreen
}, navigatorOption)



const MainNavigator = createDrawerNavigator({
    PostTabs: {
        screen: BottomNavigator,
        navigationOptions:{
            drawerLabel: 'Главная'
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions:{
            drawerLabel: 'О приложении'
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions:{
            drawerLabel: 'Новый пост'
        }
    }
},{
    contentOptions:{
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle:{
            fontFamily: 'open-bold'
        }
    }
})


export const AppNavigation = createAppContainer(MainNavigator)