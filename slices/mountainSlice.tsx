import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mountainJson from '../mountains.json';
import { RootState } from '../store';
import { MountainObj } from '../types';

interface MountainState {
    mountains: Array<MountainObj>;
}

const initialState: MountainState = {
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
            const selected = state.mountains.find(
                (mountain) => mountain.mountainId == action.payload
            );
            if (selected) selected.flag = true;
        },
        removeFlag: (state, action: PayloadAction<number>) => {
            const selected = state.mountains.find(
                (mountain) => mountain.mountainId == action.payload
            );
            if (selected) selected.flag = false;
        },
    },
});

export const selectFlagCount = (state: MountainState) => {
    return state.mountains.filter((mountain: MountainObj) => mountain.flag == true).length;
};

export const selectMountainsByRegion = (state: MountainState, regionType: string) => {
    return state.mountains.filter((mountain: MountainObj) => mountain.regionType == regionType);
};

export const selectFlagCountByRegion = (state: MountainState, regionType: string) => {
    return state.mountains.filter(
        (mountain: MountainObj) => mountain.regionType == regionType && mountain.flag == true
    ).length;
};

export const { reset, putFlag, removeFlag } = mountainSlice.actions;
export default mountainSlice.reducer;
