import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'

interface Props {
    item: any
}

const HistoryCard = ({item}: Props) => {
    return (
        <View style={styles.cardContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={styles.dot} />
                    <Text style={[defaultStyles.textRegular16, { color: 'white' }]}>Today</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text>See Invoice</Text>
                    <AntDesign name="arrowright" size={15} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomColor: 'white', borderBottomWidth: 0.5, paddingBottom: 10 }}>
                <View style={{ gap: 7 }}>
                    <View style={styles.zoneCard}>
                        <Text style={styles.zoneCardText}>Zona {item.zone}</Text>
                    </View>
                    <Text style={styles.polygonText}>{item.polygon}</Text>
                    <View style={styles.lastRow}>
                        <FontAwesome6 name="square-parking" size={20} color={Colors.secondaryColor} />
                        <Text style={styles.streetText}>{item.street}</Text>
                    </View>
                </View>
                <View>
                    <Text style={[defaultStyles.textBold28, { color: 'white' }]}>{item.time}</Text>
                    <Text style={[defaultStyles.textRegular16, { color: 'white' }]}>{item.month}</Text>
                </View>
            </View>
        </View>
    )
}

export default HistoryCard

const styles = StyleSheet.create({
    cardContainer: {
        paddingTop: 7,
        paddingBottom: 40,
        paddingHorizontal: 20,
        backgroundColor: Colors.blackSecondary,
        borderRadius: 4,
        gap: 25
    },
    dot: {
        height: 7,
        width: 7,
        borderRadius: 50,
        backgroundColor: Colors.primaryColor
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.primaryColor,
        alignSelf: 'flex-start',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        gap: 5
    },
    buttonText: {
        fontFamily: 'OpenSans',
        fontSize: 10,
        color: Colors.blackSecondary,
    },
    zoneCard: {
        backgroundColor: Colors.secondaryColor,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    zoneCardText: {
        fontFamily: 'OpenSans',
        fontSize: 10,
        color: 'white'
    },
    polygonText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: 'white'
    },
    streetText: {
        fontFamily: 'OpenSans',
        fontSize: 16,
        color: 'white'
    },
    lastRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
})