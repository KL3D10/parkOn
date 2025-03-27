import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeOut, BounceIn, BounceOut, SlideInLeft, SlideOutRight } from 'react-native-reanimated'
import { router } from 'expo-router'
import { storeData, getItemFor } from '@/helpers/storageHelper'
import { useAuth } from '@/context/auth'

interface SingleItemProps {
    id?: number
    header?: string
    text: string
}

const infoData: SingleItemProps[] = [
    {
        id: 1,
        text: 'Register once'
    },
    {
        id: 2,
        header: 'Can save time: ',
        text: 'extend or stop your parking on the go'
    },
    {
        id: 3,
        header: 'Can save money: ',
        text: 'pay only for the time you park'
    },
    {
        id: 4,
        text: 'No lock in contract period and no account fees'
    },
    {
        id: 5,
        text: 'Stop your parking anytime, the amount you save will be stored as credit to be used for your next parking'
    },
]


const SingleInfoItem = ({ header, text }: SingleItemProps) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('@/assets/images/doneRingIcon.png')} style={{ height: 48, width: 48 }} resizeMode='contain' />
            <Text style={[styles.infoText, { marginLeft: 8, flex: 1 }]}><Text style={styles.infoHeaderText}>{header}</Text>{text}</Text>
        </View>
    )
}

const GeneralInfo = () => {


    const { onOnboard } = useAuth()

    const handleFinishOnboarding = () => {
        onOnboard
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackBackground }}>
            <View style={styles.container}>
                <Text style={styles.headerText}> With <Text style={{ fontFamily: 'OpenSansBold' }}>ParkOn Casual</Text> you:</Text>
                <Animated.View entering={BounceIn} exiting={FadeOut} style={styles.boxContainer}>
                    {infoData.map(item => (<SingleInfoItem key={item.id} header={item.header} text={item.text} />))}
                </Animated.View>
                <View style={styles.separator} />
                <View style={styles.priceInfoContainer}>
                    <Text style={styles.infoHeaderText}>Price information</Text>
                    <Text style={styles.infoText}>The registration is free. ParkOn charges a service fee on top of the parking fee. The service fee depends on your package. Our standard product package is ParkOn Small: service fee 0-1.90$ per parking. No service fee when the parking is free of charge.</Text>
                </View>
                <Pressable style={styles.button} onPress={onOnboard}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default GeneralInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    headerText: {
        color: 'white',
        fontFamily: 'OpenSans',
        fontSize: 22
    },
    boxContainer: {
        backgroundColor: '#2C2B2D',
        width: '100%',
        height: 380,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    separator: {
        padding: 4,
        borderBottomColor: Colors.blackSecondary,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    priceInfoContainer: {
        alignContent: 'flex-start',
        gap: 10
    },
    infoHeaderText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: 'white'
    },
    infoText: {
        fontFamily: 'OpenSans',
        fontSize: 16,
        color: 'white',
    },
    button: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 4
    },
    buttonText: {
        fontFamily: 'OpenSans',
        fontSize: 16,
        color: Colors.blackSecondary,
    }
})