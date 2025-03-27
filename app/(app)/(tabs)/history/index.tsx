import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import HeaderComponent from '@/components/headerComponent'
import { defaultStyles } from '@/constants/Styles'
import HistoryCard from '@/components/historyCard'
import { HistoryData } from '@/assets/data/HistoryData'

const History = () => {

  const history = HistoryData

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackBackground }} edges={['top']}>
      <HeaderComponent />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', borderBottomColor: 'white', borderBottomWidth: 1, padding: 5 }}>
          <Text style={[defaultStyles.textBold16, { color: 'white' }]}>History</Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={history}
            renderItem={({item}: any) => <HistoryCard item={item}/>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 10}}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default History

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingBottom: 15,
    gap: 20
  },
})