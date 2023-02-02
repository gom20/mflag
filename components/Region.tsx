import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../hooks/hooks';
import { selectMountainsByRegion } from '../slices/mountainSlice';
import { RootState } from '../store';
import { MountainObj, RegionProps } from '../types';
import {
    ChungbukSvg,
    ChungnamSvg,
    GangwonSvg,
    GyeongbukSvg,
    GyeongnamSvg,
    JejuSvg,
    JeonbukSvg,
    JeonnamSvg,
    SeoulGeonggiSvg,
} from './SvgRegion';

export function Region({ regionType, regionName, pressable, pLeft, pTop, size }: RegionProps) {
    const [regionColor, setRegionColor] = useState('#E1F7CB');
    const navigation = useNavigation();
    const mountains = useAppSelector((state: RootState) =>
        selectMountainsByRegion(state.mountain, regionType)
    );
    const flag =
        mountains.length > 0
            ? mountains.find((mountain: MountainObj) => mountain.flag == false)
                ? false
                : true
            : false;

    const handleRegionPress = () => {
        navigation.navigate('Detail', {
            regionType: regionType,
            regionName: regionName ? regionName : '',
        });
    };

    const renderSvgRegion = () => {
        switch (regionType) {
            case 'SG':
                return <SeoulGeonggiSvg color={regionColor} size={size} />;
            case 'GW':
                return <GangwonSvg color={regionColor} size={size} />;
            case 'CB':
                return <ChungbukSvg color={regionColor} size={size} />;
            case 'CN':
                return <ChungnamSvg color={regionColor} size={size} />;
            case 'GB':
                return <GyeongbukSvg color={regionColor} size={size} />;
            case 'GN':
                return <GyeongnamSvg color={regionColor} size={size} />;
            case 'JB':
                return <JeonbukSvg color={regionColor} size={size} />;
            case 'JN':
                return <JeonnamSvg color={regionColor} size={size} />;
            case 'JJ':
                return <JejuSvg color={regionColor} size={size} />;
        }
    };

    const renderFlag = () => {
        if (flag) {
            return (
                <Image
                    style={[
                        {
                            width: 15,
                            height: 15,
                            position: 'absolute',
                            top: -13,
                            left: '46%',
                        },
                    ]}
                    source={require('../assets/images/flag.png')}
                    resizeMode="contain"></Image>
            );
        }
    };

    return (
        <>
            {renderSvgRegion()}
            {pressable && (
                <View
                    style={[
                        {
                            position: 'absolute',
                            top: pTop,
                            left: pLeft,
                        },
                        styles.regionPressableContainer,
                    ]}>
                    {renderFlag()}
                    <Pressable
                        onPress={() => {
                            handleRegionPress();
                        }}
                        onTouchStart={() => setRegionColor('#0DD36E')}
                        onTouchEnd={() => setRegionColor('#E1F7CB')}
                        style={styles.regionPressableContainer}>
                        <Image
                            source={require('../assets/images/mountain-icon.png')}
                            style={{ width: 21, height: 16 }}></Image>
                        <Text>{regionName}</Text>
                    </Pressable>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    regionPressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Region;
