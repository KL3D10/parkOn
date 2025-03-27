import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from "@react-native-picker/picker"
import Colors from '@/constants/Colors'
import { isAndroid } from '@/constants/Platform'
import { defaultStyles } from '@/constants/Styles'

const TimePicker = () => {

    const [selectedHours, setSelectedHours] = useState<number>(new Date().getHours())
    const [selectedMinutes, setSelectedMinutes] = useState<number>(new Date().getMinutes())
    
    const createArray = (length: number, startFrom: number) => {
        const arr = [];
        let i = startFrom;
        while(i < length){
            arr.push(i.toString());
            i += 1;
        }
        return arr;
    }
        const AVAILABLE_HOURS = createArray(25, 1);
        const AVAILABLE_MINUTES = createArray(60, 0);
        

    const RenderPickers = () => {
        return (
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    dropdownIconColor={Colors.primaryColor}
                    selectedValue={selectedHours}
                    onValueChange={itemValue => setSelectedHours(itemValue)}
                    mode="dialog"
                >
                    {
                        AVAILABLE_HOURS.map(value => (
                            <Picker.Item key={value} label={value} value={value} fontFamily='OpenSansBold' style={styles.individualItemLabel} />
                        ))
                    }
                </Picker>
                <Text style={[defaultStyles.textBold40, {color: Colors.primaryColor}]}>:</Text>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    dropdownIconColor={Colors.primaryColor}
                    selectedValue={selectedMinutes}
                    onValueChange={itemValue => setSelectedMinutes(itemValue)}
                    mode="dialog"
                >
                    {
                        AVAILABLE_MINUTES.map(value => (
                            <Picker.Item key={value} label={value} value={value} style={styles.individualItemLabel} />
                        ))
                    }
                </Picker>
            </View>
        )
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <RenderPickers />
        </View>
    )
}

export default TimePicker

const styles = StyleSheet.create({
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: isAndroid ? 15 : 0
    },
    picker: {
        flex: 1,
        maxWidth: 150,
        ...Platform.select({
            android: {
                color: Colors.primaryColor,
                backgroundColor: "rgba(92, 92, 92, 0.206)",
                height: 100,
            },
            ios: {
                
            }
        })
    },
    pickerItem: {
        color: Colors.primaryColor,
        fontFamily: 'OpenSansBold',
        fontSize: 40,
        ...Platform.select({
            android: {
                marginLeft: 10,
                marginRight: 10,
                color: Colors.primaryColor,
                backgroundColor: 'black'
            }
        })
    },
    individualItemLabel: {
        fontSize: 50
    }
})