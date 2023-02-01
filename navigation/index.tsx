import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import DetailScreen from '../screens/DetailScreen';

import MainScreen from '../screens/MainScreent';
import { RootStackParamList } from '../types';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'rgb(255, 255, 255)',
        },
    };

    return (
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : MyTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
