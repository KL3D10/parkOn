import {Config} from '@/config'
import {
    BaseQueryFn,
    FetchArgs,
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import {RootState} from '@/store'
import {Platform} from "react-native";

const baseQuery = fetchBaseQuery({
    baseUrl: Config.API_URL,
    prepareHeaders: (headers, {getState}) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        
    }
    return result
}

const baseOauthQuery = fetchBaseQuery({
    baseUrl: Config.API_URL,
    prepareHeaders: (headers, {getState}) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).auth.token
        // if (Platform.OS === 'android') {
        //     headers.set('Authorization', `Basic ${Config.ANDROID_CRED}`)
        // }else{
        //     headers.set('Authorization', `Basic ${Config.IOS_CRED}`)

        // }
        return headers
    },
})

const baseOauthQueryWithInterceptor: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseOauthQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
    }
    return result
}

export const api = createApi({
    baseQuery: baseQueryWithInterceptor,
    endpoints: () => ({}),
})

export const oauthApi = createApi({
    baseQuery: baseOauthQueryWithInterceptor,
    endpoints: () => ({}),
})