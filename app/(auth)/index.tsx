import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import PhoneInput, { ICountry } from 'react-native-international-phone-number';
import Entypo from '@expo/vector-icons'
import { router } from 'expo-router';
import { useAuth } from '@/context/auth';
import { defaultStyles } from '@/constants/Styles';

const Authentication = () => {

  const [phoneInputValue, setPhoneInputValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);

  const { onSignIn } = useAuth()

  //   const signIn = () => {
  //     router.replace('/termsConditions')
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackBackground }}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Personal Information</Text>
        <View style={{ gap: 5 }}>
          <View style={{ gap: 5 }}>
            <Text style={[defaultStyles.textRegular12, { color: 'white' }]}>Name</Text>
            <TextInput style={styles.textInput} placeholder='Insert your Name' placeholderTextColor={Colors.borderGrey} />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={[defaultStyles.textRegular12, { color: 'white' }]}>Surname</Text>
            <TextInput style={styles.textInput} placeholder='Insert your Surname' placeholderTextColor={Colors.borderGrey} />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={[defaultStyles.textRegular12, { color: 'white' }]}>Email  <Text style={{ fontSize: 10 }}>(Optional)</Text></Text>
            <TextInput style={styles.textInput} placeholder='Insert your Email' placeholderTextColor={Colors.borderGrey} />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={[defaultStyles.textRegular12, { color: 'white' }]}>Phone Number</Text>
            <PhoneInput
              value={phoneInputValue}
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
        <Pressable style={styles.button} onPress={onSignIn}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>

  )
}

export default Authentication

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 40
  },
  headingText: {
    fontSize: 22,
    fontFamily: 'OpenSansBold',
    color: 'white',
    marginTop: 30
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#2C2B2D',
    fontSize: 16,
    fontFamily: 'OpenSans'
  }
})