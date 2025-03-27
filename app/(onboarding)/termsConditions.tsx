import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut, BounceIn, BounceOut, SlideInLeft, SlideOutRight } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { router } from 'expo-router'


const TermsConditions = () => {

  return (
    <View style={styles.container}>
      <Animated.View entering={BounceIn} exiting={FadeOut} style={styles.boxContainer}>
        <Text style={styles.headerText}>Terms & Conditions</Text>
        <View style={styles.secondRowContainer}>
            <Image source={require("@/assets/images/fileDockIcon.png")} style={{height: 48, width: 48}} resizeMode='contain' />
            <Text style={[styles.infoText, {width: '80%', marginLeft: 10}]}>By continuing I confirm that I agree to ParkOn's <Text style={{color: Colors.primaryColor, textDecorationLine: 'underline'}}>Terms & Conditions</Text> and <Text style={{color: Colors.primaryColor, textDecorationLine: 'underline'}}>Privacy Policy</Text></Text>
        </View>
        <View style={styles.buttonsRowContainer}>
            <Pressable onPress={() => router.replace('/(onboarding)/onboarding')}>
                <Text style={styles.infoText}>I don't agree</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => router.replace('/(onboarding)/generalInfo')}>
                <Text style={[styles.infoText, {color: Colors.blackSecondary}]}>I agree</Text>
            </Pressable>
        </View>
      </Animated.View>
    </View>
  )
}

export default TermsConditions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackBackground,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    boxContainer: {
        backgroundColor: '#2C2B2D',
        width: '100%',
        height: 300,
        borderRadius: 40,
        paddingVertical: 40,
        paddingHorizontal: 32,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
     headerText: {
        fontFamily: 'OpenSansBold',
        color: 'white',
        fontSize: 22
    },
    secondRowContainer: {
        flexDirection: 'row',
        maxWidth: 'auto'
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'OpenSans',
    },
    buttonsRowContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 4
    },
})