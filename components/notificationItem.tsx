import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'

interface Props {
    notification: any
}

const NotificationItem = ({ notification }: Props) => {
    console.log(notification)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignContent: 'flex-start', gap: 10, flex: 3 }}>
                <Image source={require('@/assets/images/notificationsBell.png')} contentFit='contain' style={{ height: 48, width: 48 }} />
                <View style={[styles.columnTop, { gap: 15 }]}>
                    <View>
                        <Text style={[defaultStyles.textBold16, { color: 'white' }]}>{notification.header}</Text>
                        <Text style={[defaultStyles.textRegular13, { color: 'white' }]}>{notification.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Shiko Detajet</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={[defaultStyles.textRegular10, { color: 'white' }]}>{notification.time}</Text>
            </View>
            <View style={{ padding: 4, borderBottomColor: Colors.blackSecondary, borderBottomWidth: 0.5 }} />
        </View>
    )
}

export default NotificationItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 10, 
        borderBottomColor: Colors.blackSecondary, 
        borderBottomWidth: 0.5 
    },
    columnTop: {
        justifyContent: 'flex-start'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    buttonText: {
        fontFamily: 'OpenSans',
        fontSize: 14,
        color: Colors.blackSecondary,
    }
})