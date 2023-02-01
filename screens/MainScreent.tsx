import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Region from '../components/Region';
import regions from '../regions.json';
import { selectFlagCount } from '../slices/mountainSlice';
// import { useDispatch } from 'react-redux';

export default function MainScreen() {
    // const dispatch = useDispatch();
    const mountains = useSelector((state: any) => state.mountain.mountains);
    const putFlagCount = useSelector((state: any) => selectFlagCount(state.mountain));
    // let confettiRef;

    // useEffect(() => {
    //     console.log('[StampMainScreen] useEffect');
    //     dispatch(getStamps());
    // }, []);

    // useEffect(() => {
    //     console.log('[StampMainScreen] useEffect flagCount updated');
    //     if (flagCount == 100) {
    //         confettiRef.startConfetti();
    //     }
    // }, [flagCount]);

    return (
        <View style={styles.container}>
            {/* <Confetti ref={(ref) => (confettiRef = ref)} duration={6000} confettiCount={30} /> */}
            <Text style={styles.text}>도전! 100대 명산!</Text>
            <Text style={styles.text}>정상에 깃발꽂기!</Text>
            <Text style={styles.smallText}>
                100대 명산 얼마나 가봤나요?{'\n'}
                지금까지 가본 산에 깃발을 꽂아보세요.
            </Text>
            <View style={styles.countContainer}>
                <View style={styles.stampCount}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: '#FFFFFF',
                            fontWeight: '600',
                        }}>
                        {putFlagCount}
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
        paddingHorizontal: 20,
        paddingVertical: 60,
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '600',
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
    mapContainer: {},
    regionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
