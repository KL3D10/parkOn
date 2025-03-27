import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'

interface Props {
    dotSize: number,
    lastNumbers: number,
    dotColor?: string
}


const MaskedCardText = ({dotSize, dotColor, lastNumbers}: Props) => {

    const DotGroup = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View style={[styles.dot, {width: dotSize, height: dotSize, backgroundColor: dotColor ?? 'white'}]} />
            <View style={[styles.dot, {width: dotSize, height: dotSize, backgroundColor: dotColor ?? 'white'}]} />
            <View style={[styles.dot, {width: dotSize, height: dotSize, backgroundColor: dotColor ?? 'white'}]} />
            <View style={[styles.dot, {width: dotSize, height: dotSize, backgroundColor: dotColor ?? 'white'}]} />
        </View>
    )

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <DotGroup />
        <DotGroup />
        <DotGroup />
        <Text style={[defaultStyles.textBold16, { color: dotColor ?? 'white', letterSpacing: 4 }]}>{lastNumbers}</Text>
    </View>
    )
}

export default MaskedCardText

const styles = StyleSheet.create({
    dot: {
        borderRadius: 50
    }
})