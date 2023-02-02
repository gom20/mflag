import { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch } from '../hooks/hooks';
import { ModalContext } from '../hooks/ModalContext';
import { putFlag, removeFlag } from '../slices/mountainSlice';
import { MountainProps } from '../types';

export function Mountain({
    mountainId,
    mountainName,
    altitude,
    location,
    positionX,
    positionY,
    flag,
    onPress,
}: MountainProps) {
    const dispatch = useAppDispatch();
    const { showModal } = useContext(ModalContext);

    const handleMountainPress = async () => {
        let confirmMessage = mountainName + '\n고도: ' + altitude + 'm\n\n';
        confirmMessage += flag ? '깃발을 회수하시겠습니까?' : '깃발을 꽂으시겠습니까?';
        const confirmButtonText = flag ? '네! 회수하기' : '네! 깃발꽂기';
        const imageFile = flag
            ? require('../assets/images/mountain-flag.png')
            : require('../assets/images/mountain.png');
        const response = await showModal({
            async: true,
            type: 'confirm',
            message: confirmMessage,
            buttonTexts: ['아니오', confirmButtonText],
            image: imageFile,
        });
        if (!response) return;

        if (flag) {
            dispatch(removeFlag(mountainId));
        } else {
            dispatch(putFlag(mountainId));
        }
        onPress(!flag);
    };

    return (
        <View
            style={[
                {
                    position: 'absolute',
                    top: positionY,
                    left: positionX,
                },
                styles.container,
            ]}>
            {flag && (
                <Image
                    style={styles.flag}
                    source={require('../assets/images/flag.png')}
                    resizeMode="contain"></Image>
            )}
            <Pressable
                onPress={() => {
                    handleMountainPress();
                }}
                style={styles.pressableContainer}>
                <Image
                    source={require('../assets/images/mountain-icon.png')}
                    style={{ width: 21, height: 16 }}></Image>
                <Text style={[styles.text, { color: flag ? '#000000' : '#949494' }]}>
                    {mountainName}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flag: {
        position: 'absolute',
        top: -13,
        left: '43%',
        width: 15,
        height: 15,
    },
    pressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
    },
});
