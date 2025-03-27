import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const HeaderComponent = () => {
    return (
        <View style={styles.container}>
            {/* <MaterialIcons name="menu" size={42} color={Colors.primaryColor} /> */}
            <Image source={require('@/assets/images/logoParkOn.png')} resizeMode='contain' />
            {/* <FontAwesome5 name="bell" size={30} color="white" /> */}
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.blackSecondary,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    }
})