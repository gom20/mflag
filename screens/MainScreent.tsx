import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, Text, ToastAndroid, View, Image } from 'react-native';
import Confetti from 'react-native-confetti';
import Region from '../components/Region';
import { useAppSelector } from '../hooks/hooks';
import regions from '../regions.json';
import { selectFlagCount } from '../slices/mountainSlice';
import { RootState } from '../store';

export default function MainScreen() {
    const mountains = useAppSelector((state: RootState) => state.mountain.mountains);
    const flagCount = useAppSelector((state: RootState) => selectFlagCount(state.mountain));

    const defaultMessage = '100대 명산 얼마나 가봤나요?\n지금까지 가본 산에 깃발을 꽂아보세요.';
    const completedMessage = '대단해요!\n깃발을 모두 꽂았어요!\n당신은 이제 진정산 등산왕!';
    const defaultColor = '#0DD36E';
    const completedColor = '#D95B3B';
    const [color, setColor] = useState(defaultColor);
    const [message, setMessage] = useState(defaultMessage);

    let confettiRef: Confetti | any;

    useEffect(() => {
        if (flagCount == 100) {
            confettiRef.startConfetti();
            setColor(completedColor);
            setMessage(completedMessage);
        } else {
            setColor(defaultColor);
            setMessage(defaultMessage);
        }
    }, [flagCount]);

    useFocusEffect(
        React.useCallback(() => {
            let exit: boolean;
            let timeout: NodeJS.Timeout;
            const onBackPress = () => {
                if (!exit) {
                    ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
                    exit = true;
                    timeout = setTimeout(() => {
                        exit = false;
                    }, 2000);
                } else {
                    exit = false;
                    clearTimeout(timeout);
                    BackHandler.exitApp();
                }
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Confetti ref={(ref) => (confettiRef = ref)} duration={6000} confettiCount={30} />
            {flagCount == 100 && (
                <Image
                    source={require('../assets/images/totalstamp.png')}
                    style={{
                        position: 'absolute',
                        top: 15,
                        right: 20,
                        width: 110,
                        height: 110,
                        transform: [{ rotate: '20deg' }],
                    }}></Image>
            )}
            <Text style={styles.text}>도전! 100대 명산</Text>
            <Text style={styles.smallText}>{message}</Text>
            <View style={styles.countContainer}>
                <View style={[styles.stampCount, { backgroundColor: color }]}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: '#FFFFFF',
                            fontWeight: '600',
                        }}>
                        {flagCount}
                    </Text>
                </View>
                <Text style={styles.totalCount}> / {mountains.length}</Text>
            </View>

            <View style={styles.mapContainer}>
                {regions.data.map((region) => (
                    <View
                        key={region.regionType}
                        style={{
                            position: 'absolute',
                            top: region.top,
                            left: region.left,
                        }}>
                        <Region
                            regionType={region.regionType}
                            regionName={region.regionName}
                            pressable={true}
                            pTop={region.pressableTop}
                            pLeft={region.pressableLeft}
                            size="SMALL"
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 27,
        textAlign: 'center',
        fontFamily: 'Jalnan',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
    },
    smallText: {
        textAlign: 'center',
        color: '#949494',
        marginVertical: '2%',
    },
    countContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stampCount: {
        width: 50,
        height: 50,

        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalCount: {
        color: '#949494',
        fontSize: 18,
    },
    mapContainer: {},
    regionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
