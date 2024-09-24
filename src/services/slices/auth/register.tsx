import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl";
import { startLoadingActivity, stopLoadingActivity } from "../activity/activitySlice";


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data: any, { dispatch }) => {
        dispatch(startLoadingActivity());
        try {
            const response = await http.post("user/registerUser", data)
            const token = response.data.token
            localStorage.setItem("authToken", token)
            if (response.status = 200) {
                return response.data
            }
        } catch (error) {
            console.log("API Error", error);
            throw error;
        } finally {
            dispatch(stopLoadingActivity())
        }
    }
)

export const sendOtp = createAsyncThunk(
    "auth/sendOtp",
    async (data: any, { dispatch }) => {
        dispatch(startLoadingActivity());
        try {
            const response = await http.post("user/sendOtp", { email: data.email }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status = 200) {
                return response.data
            }
        } catch (error) {
            console.log("API Error", error);
            throw error;
        } finally {
            dispatch(stopLoadingActivity())
        }
    }
)

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (data: any, { dispatch }) => {
        console.log("dataaaaaaaaaaaaaaaa", data)

        dispatch(startLoadingActivity())
        try {
            const response = await http.post("user/verifyOtp", { otp: data.otp }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status = 200) {
                return response.data
            }
        } catch (error) {
            console.log("API Error", error);
            throw error;
        } finally {
            dispatch(stopLoadingActivity())
        }
    }
)

export interface signUp {
    loading: boolean,
    data: []
}

const initialState: signUp = {
    loading: false,
    data: []

}

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = true;
            })

            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(sendOtp.rejected, (state) => {
                state.loading = true;
            })

            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = true;
            })
    }
})

export default signUpSlice.reducer