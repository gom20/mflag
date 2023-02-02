import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, RootTagContext } from 'react-native';
import Confetti from 'react-native-confetti';
import { Mountain } from '../components/Mountain';
import Region from '../components/Region';
import { useAppSelector } from '../hooks/hooks';
import { ModalContext } from '../hooks/ModalContext';
import { selectFlagCountByRegion, selectMountainsByRegion } from '../slices/mountainSlice';
import { RootState } from '../store';
import { MountainObj, RootStackScreenProps } from '../types';

export default function DetailScreen({ navigation, route }: RootStackScreenProps<'Detail'>) {
    const { regionType, regionName } = route.params;
    const { showModal } = useContext(ModalContext);

    const defaultMessage = regionName + '의 명산\n가본 산에 깃발을 꽂아보세요';
    const completedMessage = '짝짝짝!\n이구역 등산왕은 바로 당신!\n모든 곳에 깃발을! 대단해요!';
    const defaultColor = '#0DD36E';
    const completedColor = '#D95B3B';
    const [color, setColor] = useState(defaultColor);
    const [message, setMessage] = useState(defaultMessage);

    const mountains = useAppSelector((state: RootState) =>
        selectMountainsByRegion(state.mountain, regionType)
    );
    const flagCount = useAppSelector((state: RootState) =>
        selectFlagCountByRegion(state.mountain, regionType)
    );
    let confettiRef: Confetti | any;

    const handleCompleteRegion = (flag: boolean) => {
        if (flagCount == mountains.length - 1 && flag) {
            const message =
                '대단해요!\n' +
                regionName +
                ' 산을 모두 완료하셨습니다!\n다른 도에도 명산들이 많아요!\n지금 바로 도전해 보세요!';
            showModal({
                message: message,
                image: require('../assets/images/clap.png'),
            });
        }
    };

    useEffect(() => {
        if (flagCount == mountains.length) {
            confettiRef.startConfetti();
            setMessage(completedMessage);
            setColor(completedColor);
        } else {
            setMessage(defaultMessage);
            setColor(defaultColor);
        }
    }, [flagCount]);

    return (
        <View style={styles.container}>
            <Confetti ref={(ref) => (confettiRef = ref)} duration={6000} confettiCount={30} />
            {flagCount == mountains.length && (
                <Image
                    source={require('../assets/images/stamp.png')}
                    style={{
                        position: 'absolute',
                        top: 15,
                        right: 20,
                        width: 110,
                        height: 110,
                        transform: [{ rotate: '20deg' }],
                    }}></Image>
            )}
            <Text style={styles.text}>{regionName}</Text>
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
            <View style={styles.regionContainer}>
                <View>
                    <Region regionType={regionType} pressable={false} size={'LARGE'} />
                    {mountains.map((mountain: MountainObj) => {
                        return (
                            <Mountain
                                key={mountain.mountainId}
                                mountainId={mountain.mountainId}
                                mountainName={mountain.mountainName}
                                positionX={Number(mountain.positionX)}
                                positionY={Number(mountain.positionY)}
                                altitude={mountain.altitude}
                                location={mountain.location}
                                flag={mountain.flag}
                                onPress={handleCompleteRegion}></Mountain>
                        );
                    })}
                </View>
            </View>
            <Text style={styles.footerText}>출처 : 산림청 선정 100대 명산</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
    },
    text: {
        marginTop: 20,
        fontSize: 30,
        textAlign: 'center',
        // fontWeight: '600',
        fontFamily: 'Jalnan',
    },
    smallText: {
        textAlign: 'center',
        color: '#949494',
        // marginVertical: '2%',
    },
    countContainer: {
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
    regionContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    footerText: {
        color: '#949494',
        fontSize: 8,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
});
