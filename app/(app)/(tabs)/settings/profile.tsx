import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderComponent from '@/components/headerComponent'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { AntDesign } from '@expo/vector-icons'
import PhoneInput, { ICountry } from 'react-native-international-phone-number'
import { router } from 'expo-router'

const Profile = () => {

    const [phoneInputValue, setPhoneInputValue] = useState('')
    const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackBackground }} edges={['top']}>
            <HeaderComponent />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 5, borderBottomColor: 'white', borderBottomWidth: 1, padding: 5 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <AntDesign name="arrowleft" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={[defaultStyles.textBold16, { color: 'white' }]}>Profile</Text>
                </View>
                <View style={{ gap: 10 }}>
                    <View style={{ gap: 5 }}>
                        <Text style={[defaultStyles.textRegular12, { color: 'white' }]}>Name</Text>
                        <TextInput style={styles.textInput} placeholder='Insert your Name' placeholderTextColor={Colors.borderGrey} value='Abby' />
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text style={[defaultStyles.textRegular12, { color: 'white' }]}>Surname</Text>
                        <TextInput style={styles.textInput} placeholder='Insert your Surname' placeholderTextColor={Colors.borderGrey} value='Adams' />
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text style={[defaultStyles.textRegular12, { color: 'white' }]}>Phone Number</Text>
                        <PhoneInput
                            value={phoneInputValue}
                            defaultValue='+3556969696'
                            onChangePhoneNumber={(value) => setPhoneInputValue(value)}
                            selectedCountry={selectedCountry}
                            onChangeSelectedCountry={(country) => setSelectedCountry(country)}
                            defaultCountry='AL'
                            modalNotFoundCountryMessage="No country found"
                            phoneInputStyles={{
                                container: {
                                    backgroundColor: Colors.blackBackground,
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: Colors.borderGrey,
                                    borderRadius: 4
                                },
                                flagContainer: {
                                    borderTopLeftRadius: 4,
                                    borderBottomLeftRadius: 4,
                                    backgroundColor: Colors.blackBackground,
                                    justifyContent: 'center',
                                },
                                flag: {},
                                caret: {
                                    color: '#F3F3F3',
                                    fontSize: 16,
                                },
                                divider: {
                                    backgroundColor: Colors.borderGrey,
                                },
                                callingCode: {
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: '#F3F3F3',
                                },
                                input: {
                                    color: Colors.borderGrey,
                                    fontSize: 14
                                },
                            }}
                            modalStyles={{
                                modal: {
                                    backgroundColor: '#333333',
                                    borderWidth: 1,
                                    marginBottom: 20
                                },
                                backdrop: {},
                                divider: {
                                    backgroundColor: 'transparent',
                                },
                                countriesList: {},
                                searchInput: {
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#F3F3F3',
                                    color: Colors.borderGrey,
                                    backgroundColor: '#333333',
                                    paddingHorizontal: 12,
                                    height: 46,
                                },
                                countryButton: {
                                    borderWidth: 1,
                                    borderColor: '#F3F3F3',
                                    backgroundColor: '#666666',
                                    marginVertical: 4,
                                    paddingVertical: 0,
                                    borderRadius: 4
                                },
                                noCountryText: {},
                                noCountryContainer: {},
                                flag: {
                                    color: '#FFFFFF',
                                    fontSize: 20,
                                },
                                callingCode: {
                                    color: '#F3F3F3',
                                },
                                countryName: {
                                    color: '#F3F3F3',
                                },
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Ruaj</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 25,
        paddingBottom: 15,
    },
    textInput: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.borderGrey,
        paddingVertical: 13,
        paddingHorizontal: 10,
        color: Colors.borderGrey
    },
    button: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 4
    },
    buttonText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: Colors.blackSecondary,
    }
})