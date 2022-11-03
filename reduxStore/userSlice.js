import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid: 'hello World!',
    expiration: new Date(),
    isLoggedIn: false
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
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
});

export const { setUid, setExpiration, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;