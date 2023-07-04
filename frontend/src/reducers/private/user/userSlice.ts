import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Auth } from '../../../reducers/auth/authSlice';
import { IToken, Product } from '../../../types';
import errorHandler from '../../../utils/errorHandler';
import userService from './userService';

const storedToken = typeof window !== 'undefined' ? localStorage.getItem('ent-token') : null;
export const token2 = storedToken ? JSON.parse(storedToken) : '';

type User = {
    savedItems: Product[];
    _id: string;
    username: string;
    email: string;
    role: string;
};

interface IUserState {
    user: User;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: object | string | null;
}

const initialState: IUserState = {
    user: {
        _id: '',
        username: '',
        email: '',
        savedItems:[],
        role: ''
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
};

// Get user
export const getUser = createAsyncThunk<User, void>('user', async (_, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
        return await userService.getUser(token);
    } catch (error: any) {
        errorHandler(error, thunkAPI);
        throw error;
    }
});

export const privateSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.user.savedItems === action.payload.savedItems
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload ? action.payload : "Something went wrong";
            });
    },
});

export const { resetUser } = privateSlice.actions;
export default privateSlice.reducer;
