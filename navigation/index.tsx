import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, ColorSchemeName } from 'react-native';
import { useAppDispatch } from '../hooks/hooks';
import { ModalContext } from '../hooks/ModalContext';
import DetailScreen from '../screens/DetailScreen';

import MainScreen from '../screens/MainScreent';
import { reset } from '../slices/mountainSlice';
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
        <NavigationContainer theme={MyTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
    const { showModal } = React.useContext(ModalContext);
    const dispatch = useAppDispatch();

    const handleResetPress = async () => {
        const response = await showModal({
            type: 'confirm',
            async: true,
            message: '깃발 꽂기를 리셋하시겠습니까?',
            buttonTexts: ['아니오', '네! 리셋할래요'],
        });
        if (!response) return;
        dispatch(reset());
    };

    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false,
            }}>
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerRight: () => (
                        <Ionicons
                            name="refresh"
                            size={24}
                            color="black"
                            onPress={handleResetPress}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    headerShown: true,
                    title: '도전 100대 명산',
                    headerTitleAlign: 'center',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right',
                }}
            />
        </Stack.Navigator>
    );
}
