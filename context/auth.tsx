import { router, useSegments } from 'expo-router';
import * as React from 'react'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProps {
    authState?: { token: string | null, authenticated: boolean | null, onboarded: boolean | null },
    onSignIn?: () => void
    onSignOut?: () => void
    onOnboard?: () => void
}

const AuthContext = React.createContext<AuthProps>({});

export const useAuth = () => {
    return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [authState, setAuthState] = React.useState<{
        token: string | null;
        authenticated: boolean | null;
        onboarded: string | null;
    }>({
        token: null,
        authenticated: null,
        onboarded: null,
    })

    const rootSegment = useSegments()[0]

    React.useEffect(() => {
        const loadData = async () => {
            // const token = await SecureStore.getItemAsync("TOKEN_KEY")
            const token = await AsyncStorage.getItem('TOKEN_KEY')
            console.log('token: ' + token)
            // const isOnboarded = await SecureStore.getItemAsync("ONBOARDED")
            const isOnboarded = await AsyncStorage.getItem('ONBOARDED')
            console.log('onboarded: ' + isOnboarded)

            if (token && isOnboarded) {
                console.log("vlerat jane" + token + " " + isOnboarded)
                setAuthState({
                    authenticated: token ? true : false,
                    onboarded: isOnboarded,
                    token: token,
                })
            }
        }
        loadData()
    }, [])

    React.useEffect(() => {
        if (authState.token === undefined) return;

        if (authState.token == null && authState.onboarded !== null && rootSegment !== "(auth)") {
            router.replace("/(auth)")
        }
        else if (authState.token == null && authState.onboarded == null && rootSegment !== "(onboarding)") {
            router.replace("/(onboarding)")
        }
        else if (authState.token != null && authState.onboarded != null && rootSegment !== "(app)") {
            router.replace("/(app)/(tabs)/home")
        }
    }, [authState, rootSegment])

    const signIn = async () => {
        setAuthState({ authenticated: true, onboarded: 'true', token: '1231fnsdlfkmnsdfdsfsd3asd' })
        // await SecureStore.setItemAsync("TOKEN_KEY", '1231fnsdlfkmnsdfdsfsd3asd')
        await AsyncStorage.setItem('TOKEN_KEY', '1231fnsdlfkmnsdfdsfsd3asd');
    }

    const signOut = async () => {
        setAuthState({ authenticated: false, onboarded: authState.onboarded, token: null })
        // await SecureStore.deleteItemAsync("TOKEN_KEY")
        await AsyncStorage.removeItem('TOKEN_KEY');
    }

    const onboard = async () => {
        setAuthState({ authenticated: authState.authenticated, onboarded: 'true', token: null })
        // await SecureStore.setItemAsync("ONBOARDED", 'true')
        await AsyncStorage.setItem('ONBOARDED', 'true');

    }

    const value = {
        authState,
        onOnboard: onboard,
        onSignIn: signIn,
        onSignOut: signOut
    }

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    )
}