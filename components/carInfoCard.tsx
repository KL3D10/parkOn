import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'

interface Props {
    carData: any
    onSelect?: (car: any) => void
    onEdit?: (car: any) => void
}

const CarInfoCard = ({ carData, onEdit, onSelect}: Props) => {

    const handleSelect = () => {
        if (onSelect) {
          onSelect(carData);
        }
      };

      const handleEdit = () => {
        if (onEdit) {
          onEdit(carData);
        }
      };

    return (
        <TouchableOpacity style={styles.carInfoContainer} onPress={handleSelect}>
            <Image source={require('@/assets/images/carCircleIcon.png')} style={styles.carImage} />
            <Text style={styles.registrationNoText}>{carData.registrationNo}</Text>
            <TouchableOpacity style={{ marginLeft: 'auto', padding: 5 }} onPress={handleEdit}>
                <Octicons name="pencil" size={20} color={Colors.primaryColor} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default CarInfoCard

const styles = StyleSheet.create({
    carInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: Colors.blackSecondary,
        gap: 7
    },
    carImage: {
        height: 48,
        width: 48,
        resizeMode: 'contain'
    },
    registrationNoText: {
        fontFamily: 'OpenSansBold',
        color: Colors.blackSecondary,
        fontSize: 16
    },
})