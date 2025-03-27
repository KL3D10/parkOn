import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
                name="(modals)/authentication"
                options={{
                    presentation: 'transparentModal',
                    headerTransparent: true,
                    animation: 'slide_from_bottom'
                }}
            />
            <Stack.Screen
                name="(modals)/paymentSuccess"
                options={{
                    presentation: 'transparentModal',
                    animation: 'fade',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="(modals)/paymentInvoice"
                options={{
                    presentation: 'transparentModal',
                    headerTransparent: true,
                    animation: 'slide_from_bottom'
                }}
            />
        </Stack>
    )
}