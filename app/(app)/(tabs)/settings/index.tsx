import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderComponent from '@/components/headerComponent'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles } from '@/constants/Styles'
import { Octicons } from '@expo/vector-icons'
import { NotificationData } from '@/assets/data/NotificationData'
import { FlashList } from "@shopify/flash-list";
import NotificationItem from '@/components/notificationItem'
import { router } from 'expo-router'

const Settings = () => {
  const notifications = NotificationData
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackBackground }} edges={['top']}>
      <HeaderComponent />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', borderBottomColor: 'white', borderBottomWidth: 1, padding: 5 }}>
          <Text style={[defaultStyles.textBold16, { color: 'white' }]}>Settings</Text>
        </View>
        <View style={{ flex: 1, paddingTop: 10, gap: 20 }}>
          <View style={[defaultStyles.flexRow, { justifyContent: 'space-between' }]}>
            <Text style={[defaultStyles.textRegular16, { color: 'white' }]}>Profile</Text>
            <TouchableOpacity style={{ marginLeft: 'auto', padding: 5 }} onPress={() => router.push('/(app)/(tabs)/settings/profile')}>
              <Octicons name="pencil" size={20} color={Colors.primaryColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileContainer}>
            <View style={[defaultStyles.flexRow, { justifyContent: 'space-between' }]}>
              <Text style={[defaultStyles.textRegular13, { color: 'white' }]}>Name</Text>
              <Text style={[defaultStyles.textBold16, { color: 'white' }]}>Abby</Text>
            </View>
            <View style={[defaultStyles.flexRow, { justifyContent: 'space-between' }]}>
              <Text style={[defaultStyles.textRegular13, { color: 'white' }]}>Surname</Text>
              <Text style={[defaultStyles.textBold16, { color: 'white' }]}>Adams</Text>
            </View>
            <View style={[defaultStyles.flexRow, { justifyContent: 'space-between' }]}>
              <Text style={[defaultStyles.textRegular13, { color: 'white' }]}>Phone Number</Text>
              <Text style={[defaultStyles.textBold16, { color: 'white' }]}>+355 69 69 696</Text>
            </View>
          </View>
          <Text style={[defaultStyles.textRegular16, {color: 'white'}]}>Notification</Text>
          <View style={{flex: 1}}>
            <FlatList
              data={notifications}
              renderItem={({item}: any) => <NotificationItem notification={item}/>}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{gap: 10}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  profileContainer: {
    paddingVertical: 22,
    paddingHorizontal: 20,
    // width: '100%'
    backgroundColor: Colors.blackSecondary,
    borderRadius: 4,
    gap: 5
  },
})