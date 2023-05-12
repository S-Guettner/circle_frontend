import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Button, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Feed from '../home/feed.js';
import Search from './search.js';
import Upload from './upload.js';
import Profile from './profile.js';

const Tab = createMaterialBottomTabNavigator();

/* const [hidden, setHidden] = useState(false);
const [statusBarStyle, setStatusBarStyle] = useState('default');
const [statusBarTransition, setStatusBarTransition] = useState('fade'); */
 
export default () => {
    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-home' : 'ios-home-outline';
                        } else if (route.name === 'Suche') {
                            iconName = focused ? 'ios-search' : 'ios-search-outline';
                        } else if (route.name === 'Upload') {
                            iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'ios-person' : 'ios-person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen
                    name="Home"
                    component={Feed}
                    options={{
                        headerBackTitleVisible: false,
                        headerLeft: () => <Image style={styles.imageHeaderLeft} source={require('../assets/img/circle_logo.png')} />,
                        tabBarLabel: 'Home',
                    }}
                />
                <Tab.Screen
                    name="Suche"
                    component={Search}
                    options={{
                        tabBarLabel: 'Suche',
                    }}
                />
                <Tab.Screen
                    name="Upload"
                    component={Upload}
                    options={{
                        tabBarLabel: 'Upload',
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                    }}
                />
            </Tab.Navigator>
        </>
    );
}
const styles = StyleSheet.create({
    imageHeaderLeft: {
        marginLeft: 10,
        width: 32,
        height: 32
    }
})
