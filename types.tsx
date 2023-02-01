/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Main: undefined;
    Detail: { regionType: string; regionName: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

export type SvgRegionProps = { color: string; size: string };

export type RegionProps = {
    regionType: string;
    regionName?: string;
    pressable: boolean;
    pLeft?: number;
    pTop?: number;
    size: string;
};

export type MountainProps = {
    mountainId: number;
    mountainName: string;
    positionX: number;
    positionY: number;
    flag: boolean;
};

export type MountainObj = {
    mountainId: number;
    mountainName: string;
    regionType: string;
    regionName: string;
    location: string;
    positionX: number;
    positionY: number;
    flag: boolean;
};

export type ModalProps = {
    visible: boolean;
    message: string;
    type: string;
    buttonTexts: Array<string>;
    image: string;
};

export type ShowModalProps = {
    message: string;
    type: string;
    buttonTexts: Array<string>;
    async: boolean;
    image?: string;
};
