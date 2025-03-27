import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaskedCardText from './maskedCardText'
import { defaultStyles } from '@/constants/Styles'

interface Props {
    item: any
}

const visaLogo = require('@/assets/images/CreditCards/visa.png')
const masterCardLogo = require('@/assets/images/CreditCards/mc.png')

const CreditCard = ({ item }: Props) => {
    return (
        <ImageBackground source={item.background} resizeMode='contain' style={{ height: 220, width: 380, padding: 15, justifyContent: 'space-between', alignSelf: 'center' }}>
            <Image source={item.type === 'VISA' ? visaLogo : masterCardLogo} style={{ height: 40, width: 40 }} resizeMode='contain' />
            <MaskedCardText lastNumbers={item.cardNumber.slice(-4)} dotSize={10} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={[defaultStyles.textRegular10, { color: 'white' }]}>CARD HOLDER</Text>
                    <Text style={defaultStyles.textRegular16}>{item.cardholder}</Text>
                </View>
                <View>
                    <Text style={[defaultStyles.textRegular10, { color: 'white' }]}>EXPIRES</Text>
                    <Text style={defaultStyles.textRegular16}>{item.expires}</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

export default CreditCard

const styles = StyleSheet.create({
    dot: {
        backgroundColor: 'white',
        height: 10,
        width: 10,
        borderRadius: 50
    }
})