import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mountainJson from '../mountains.json';
import { MountainObj } from '../types';

const initialState = {
    mountains: mountainJson.data,
};

const mountainSlice = createSlice({
    name: 'mountain',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, initialState);
        },
        putFlag: (state, action: PayloadAction<number>) => {
            console.log(action);
            const selected = state.mountains.find(
                (mountain) => mountain.mountainId == action.payload
            );
            if (selected) selected.flag = true;
        },
        removeFlag: (state, action: PayloadAction<number>) => {
            console.log(action);
            const selected = state.mountains.find(
                (mountain) => mountain.mountainId == action.payload
            );
            if (selected) selected.flag = false;
        },
    },
});

export const selectFlagCount = (state: any) => {
    return state.mountains.filter((mountain: MountainObj) => mountain.flag == true).length;
};

export const selectMountainsByRegion = (state: any, regionType: string) => {
    return state.mountains.filter((mountain: MountainObj) => mountain.regionType == regionType);
};

export const selectFlagCountByRegion = (state: any, regionType: string) => {
    return state.mountains.filter(
        (mountain: MountainObj) => mountain.regionType == regionType && mountain.flag == true
    ).length;
};

export const { reset, putFlag, removeFlag } = mountainSlice.actions;
export default mountainSlice.reducer;
