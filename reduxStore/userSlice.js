import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid: '',
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUid: (state, action) => {
            state.uid = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
});

export const { setUid, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;