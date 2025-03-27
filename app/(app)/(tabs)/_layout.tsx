import { Tabs } from 'expo-router';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import icons from '@/constants/Icons';
import { Image } from "expo-image"
import { Text, View } from 'react-native';
import { isIOS } from '@/constants/Platform';
import { defaultStyles } from '@/constants/Styles';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.blackSecondary,
          height: isIOS ? 80 : 60,
          borderTopStartRadius: 8,
          borderTopEndRadius: 8,
        }
      }}>
      <Tabs.Screen
        name="history"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{
                alignItems: 'center',
                gap: 2,
                paddingTop: 5,
                borderTopColor: focused ? Colors.primaryColor : Colors.blackSecondary,
                borderTopWidth: 3,
                height: '100%'
              }}>
                <Image source={focused ? icons.historyIconActive : icons.historyIconLight} contentFit='contain' style={{ height: 26, width: 26, tintColor: focused ? Colors.primaryColor : 'white' }} />
                <Text style={[defaultStyles.textRegular13, { color: focused ? Colors.primaryColor : 'white' }]}>History</Text>
              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{
                alignItems: 'center',
                gap: 2,
                paddingTop: 5,
                borderTopColor: focused ? Colors.primaryColor : Colors.blackSecondary,
                borderTopWidth: 3,
                height: '100%'
              }}>
                <Image source={focused ? icons.homeIconActive : icons.homeIconLight} contentFit='contain' style={{ height: 28, width: 28 }} />
                <Text style={[defaultStyles.textRegular13, { color: focused ? Colors.primaryColor : 'white' }]}>Home</Text>
              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{
                alignItems: 'center',
                gap: 2,
                paddingTop: 5,
                borderTopColor: focused ? Colors.primaryColor : Colors.blackSecondary,
                borderTopWidth: 3,
                height: '100%'
              }}>
                <Image source={focused ? icons.settingsIconActive : icons.settingsIconLight} contentFit='contain' style={{ height: 28, width: 28 }} />
                <Text style={[defaultStyles.textRegular13, { color: focused ? Colors.primaryColor : 'white' }]}>Settings</Text>
              </View>
            )
          }
        }}
      />
    </Tabs>
  )
}

export default TabLayout
