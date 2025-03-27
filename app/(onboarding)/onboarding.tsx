import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { Link, Stack, router } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { Svg, Path } from 'react-native-svg';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, BounceIn, BounceOut, SlideInLeft, SlideOutRight } from 'react-native-reanimated'
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/auth';
import { defaultStyles } from '@/constants/Styles';


const onboardingSteps = [
    {
        icon: require('@/assets/images/onboardingCarIcon.png'),
        title: 'Easy',
        description: 'Clean Interface to get a Perfect Parking Easily'
    },
    {
        icon: require('@/assets/images/onboardingCameraIcon.png'),
        title: 'Safe',
        description: 'We consider only Safe Parkings for our clients'
    },
    {
        icon: require('@/assets/images/onboardingClockIcon.png'),
        title: 'Rapid',
        description: 'Fewer Steps to get a Perfect parking'
    },
]

const OnboardingFirst = () => {

    const [screenIndex, setScreenIndex] = useState(0)

    const data = onboardingSteps[screenIndex]

    const onContinue = () => {
        const isLastScreen = screenIndex === onboardingSteps.length - 1
        if (!isLastScreen) {
            setScreenIndex(screenIndex + 1)
        }
    }
    const onBack = () => {
        const isFirstScreen = screenIndex === 0
        if (!isFirstScreen) {
            setScreenIndex(screenIndex - 1)
        }
    }

    const endOnboarding = () => {
        setScreenIndex(0)
        router.replace('/(onboarding)/termsConditions')
    }

    const swipes = Gesture.Simultaneous(
        Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
        Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
    )

    return (
        <GestureDetector gesture={swipes}>
            <SafeAreaView style={styles.page} edges={['bottom']} >
                <Animated.View style={{ flex: 1 }} entering={FadeIn} exiting={FadeOut} key={screenIndex}>
                    <Svg
                        width={SCREEN_WIDTH}
                        height={578}
                        fill="none"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Path
                            opacity={0.4}
                            d="M100 21h294v407.503a40 40 0 01-21.821 35.63l-214 109.184C131.565 586.895 100 567.564 100 537.686V21z"
                            fill={Colors.primaryColor}
                        />
                        <Path
                            d="M60 8h334v406.115a39.999 39.999 0 01-23.613 36.489l-254 114.072C89.921 576.563 60 557.201 60 528.187V8z"
                            fill={Colors.primaryColor}
                        />
                        <Path
                            d="M0 0h394v404.428a40 40 0 01-25.768 37.382l-314 119.543C28.052 571.32 0 551.984 0 523.971V0z"
                            fill="#fff"
                        />
                    </Svg>
                    <View style={styles.infoContainer}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', height: '50%', width: '60%' }}>
                            <Image source={data.icon} style={{ height: 90, width: 90, }} />
                            <Animated.Text entering={BounceIn} exiting={BounceOut} style={defaultStyles.textBold28}>{data.title}</Animated.Text>
                            <Animated.Text entering={SlideInLeft.delay(400)} exiting={SlideOutRight.delay(200)} style={[ defaultStyles.textRegular20, { textAlign: 'center' }]}>{data.description}</Animated.Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            {onboardingSteps.map((item, index) => (
                                <View key={index} style={index === screenIndex ? styles.activeDot : styles.dot} />
                            ))}
                        </View>
                        {screenIndex === onboardingSteps.length - 1 ?
                            <Pressable style={styles.button} onPress={endOnboarding}>
                                <Animated.Text entering={BounceIn} exiting={BounceOut} style={styles.buttonText}>Get Started</Animated.Text>
                            </Pressable>
                            :
                            <Pressable onPress={onContinue}>
                                <AntDesign name="right" size={40} color="white" />
                            </Pressable>
                        }
                    </View>
                </Animated.View>
            </SafeAreaView>
        </GestureDetector>

    )
}

export default OnboardingFirst

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: Colors.blackBackground,
    },
    infoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 450,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageContent: {
        padding: 20,
        flex: 1
    },
    title: {
        color: '#FDFDFD',
        fontSize: 50,
        fontWeight: 'bold',
        marginVertical: 20
    },
    description: {
        color: 'gray',
        fontSize: 20,
        lineHeight: 25
    },
    footer: {
        flexDirection: 'row',
        marginTop: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#2C2B2D',
        fontSize: 16,
        fontFamily: 'OpenSans'
    },
    dot: {
        backgroundColor: '#F1F1F1',
        width: 10,
        height: 10,
        borderRadius: 50
    },
    activeDot: {
        backgroundColor: Colors.primaryColor,
        width: 30,
        height: 10,
        borderRadius: 50
    }
})