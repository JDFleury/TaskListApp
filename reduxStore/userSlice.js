import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid: 'hello World!',
    expiration: new Date()
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUid: (state, action) => {
            state.uid = action.payload
        },
        setExpiration: (state, action) => {
            state.expiration = action.payload
        }
    }
});

export const { setUid, setExpiration } = userSlice.actions;
export default userSlice.reducer;