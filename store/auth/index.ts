import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'
import { Role } from '@/types/role'

type AuthState = {
    token: string | null
    onboarded: boolean | null
    role: Role | null
}

const slice = createSlice({
    name: 'auth',
    initialState: {token: null, onboarded: null, role: null} as AuthState,
    reducers: {
        saveOnboarded: ( state, {payload: {onboarded}}: PayloadAction<{ onboarded: boolean }>) => {
            state.onboarded = onboarded
        },
        saveToken: ( state, {payload: {token}}: PayloadAction<{ token: string }>) => {
            state.token = token
        },
        logout: (state) => {
            state.token = null
        }
    },
})

export const {saveToken} = slice.actions
export const {saveOnboarded} = slice.actions
export const {logout} = slice.actions

export default slice.reducer

export const selectToken = (state: RootState) => state.auth.token
export const selectOnboarded = (state: RootState) => state.auth.onboarded
export const selectRole = (state: RootState) => state.auth.onboarded
