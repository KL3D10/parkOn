import { StyleSheet, Text, View, Dimensions, Image, ImageBackground } from 'react-native'
import React, { useRef, useState } from 'react'
import HeaderComponent from '@/components/headerComponent'
import Colors from '@/constants/Colors'
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from '@/constants/Screen';
import { CardsData } from '@/assets/data/CardsData';
import CreditCard from '@/components/creditCard';
import { withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import PaymentBottomSheet from '@/components/BottomSheets/PaymentBottomSheet';
import { router } from 'expo-router';

const Payment = () => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const onChangeIndex = (index: number) => {
        bottomSheetRef.current?.snapToIndex(index)
    }

    const onConfirm = () => {
        // bottomSheetRef.current?.close()
        router.push('/(app)/(modals)/paymentSuccess')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackBackground }} edges={['top']}>
            <HeaderComponent />
            <View style={styles.container}>
                <Carousel
                    loop={false}
                    width={SCREEN_WIDTH}
                    height={SCREEN_WIDTH / 2}
                    data={CardsData}
                    mode='parallax'
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item, index }) => (
                        <CreditCard item={item} />
                    )}
                />
                <PaymentBottomSheet ref={bottomSheetRef} onChangeIndex={(index) => onChangeIndex(index)} onConfirm={onConfirm} onBackScreen={() => router.back()}/>
            </View>
        </SafeAreaView>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 25,
        gap: 15,
        alignItems: 'center'
    },
    dot: {
        backgroundColor: 'white',
        height: 10,
        width: 10,
        borderRadius: 50
    }
})