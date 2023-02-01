import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Confetti from 'react-native-confetti';
import { useSelector } from 'react-redux';
import { Mountain } from '../components/Mountain';
import Region from '../components/Region';
import { ModalContext } from '../hooks/ModalContext';
import { selectFlagCountByRegion, selectMountainsByRegion } from '../slices/mountainSlice';
import { MountainObj, RootStackScreenProps } from '../types';

export default function DetailScreen({ navigation, route }: RootStackScreenProps<'Detail'>) {
    const { regionType, regionName } = route.params;
    const { showModal } = useContext(ModalContext);

    const mountains = useSelector((state: any) =>
        selectMountainsByRegion(state.mountain, regionType)
    );
    const flagCount = useSelector((state: any) =>
        selectFlagCountByRegion(state.mountain, regionType)
    );
    //
    let confettiRef: any;

    const handleCompleteRegion = (flag: boolean) => {
        console.log('handle');
        console.log(flagCount);
        console.log(flag);
        console.log(mountains.length);
        if (flagCount == mountains.length - 1 && flag) {
            const message =
                '대단해요!\n' +
                regionName +
                ' 산을 모두 완료하셨습니다!\n다른 도에도 명산들이 많아요!\n지금 바로 도전해 보세요!';
            showModal({
                message: message,
                image: require('../assets/images/completed.png'),
            });
        }
    };

    useEffect(() => {
        console.log('[StampDetailScreen] useEffect flagCount updated');
        if (flagCount == mountains.length) {
            confettiRef.startConfetti();
        }
    }, [flagCount]);

    return (
        <View style={styles.container}>
            <Confetti ref={(ref) => (confettiRef = ref)} duration={6000} confettiCount={30} />
            <Text style={styles.text}>{regionName}</Text>
            <Text style={styles.smallText}>
                {regionName}의 명산{'\n'}기본 산에 스탬프를 꾹!
            </Text>
            <View style={styles.countContainer}>
                <View style={styles.stampCount}>
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
        fontSize: 30,
        textAlign: 'center',
        // fontWeight: '600',
        fontFamily: 'Jalnan',
    },
    smallText: {
        textAlign: 'center',
        color: '#949494',
        marginVertical: '2%',
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stampCount: {
        width: 50,
        height: 50,
        backgroundColor: '#0DD36E',
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
