import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { FontAwesome6, SimpleLineIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, BounceIn, BounceOut, SlideInLeft, SlideOutRight } from 'react-native-reanimated'


interface Props {
    item: any
    onSelectItem: (item: any) => void
}

const ParkingDataCards = ({ item, onSelectItem }: Props) => {
    console.log(item)
    return (
        <Animated.View entering={FadeIn}>
            <TouchableOpacity style={[styles.container, styles.shadowProp]} onPress={() => onSelectItem(item)} >
                <View style={{ gap: 7 }}>
                    <View style={styles.zoneCard}>
                        <Text style={styles.zoneCardText}>Zona {item.item.zone}</Text>
                    </View>
                    <Text style={styles.polygonText}>{item.item.polygon}</Text>
                    <View style={styles.lastRow}>
                        <FontAwesome6 name="square-parking" size={20} color={Colors.secondaryColor} />
                        <Text style={styles.streetText}>{item.item.street}</Text>
                    </View>
                    <View style={styles.lastRow}>
                        <FontAwesome6 name="tag" size={20} color={Colors.secondaryColor} />
                        <Text style={styles.priceText}>${item.item.price}<Text style={{fontFamily: 'OpenSans', color: 'black'}}>/hr</Text></Text>
                    </View>
                </View>
                <View style={{ marginLeft: 'auto', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Image source={require('@/assets/images/rightArrowIcon.png')} resizeMode='contain' style={styles.arrowRight} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default ParkingDataCards

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 10
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
        color: 'black'
    },
    polygonText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: 'black'
    },
    streetText: {
        fontFamily: 'OpenSans',
        fontSize: 16,
        color: 'black'
    },
    priceText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: '#68CC9C'
    },
    lastRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    arrowRight: {
        width: 36,
        height: 36
    },
    shadowProp: {
        shadowColor: Colors.blackBackground,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,

        elevation: 7,
    }
})