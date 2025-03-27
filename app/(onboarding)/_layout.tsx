import { Stack } from "expo-router";

export default function OnboardingLayout() {
    return (
        <Stack
         screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="termsConditions" />
            <Stack.Screen name="generalInfo" />
        </Stack>
    )
}