import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { PolygonsData } from '@/assets/data/MapData';
import HeaderComponent from '@/components/headerComponent';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import SliderSvg from '@/assets/images/svg/sliderImage';
import AddVehicleBottomSheet from '@/components/BottomSheets/AddVehicleBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/Styles';
import TimePicker from '@/components/timePicker';

const TimeSelect = () => {

  const selectedParkingId = useLocalSearchParams();
  const selectedParking = PolygonsData.find(polygon => polygon.id.toString() === selectedParkingId.id)
  console.log(selectedParking)

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedCar, setSelectedCar] = useState<any>()

  const handleCarSelected = (selectedCar: any) => {
    bottomSheetRef.current?.close()
    setSelectedCar(selectedCar)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackBackground }} edges={['top']} >
      <HeaderComponent />
      <View style={styles.container}>
        <View style={{ gap: 10 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.zoneCard}>
            <Text style={styles.zoneCardText}>Zona 3</Text>
          </View>
          <Text style={styles.polygonText}>{selectedParking?.polygon}</Text>
          <Text style={styles.streetText}>Parkim ne rruge - {selectedParking?.street}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }} onPress={() => bottomSheetRef.current?.expand()}>
              <Image source={require('@/assets/images/carCircleIcon.png')} style={styles.carImage} />
              {selectedCar ? <Text style={styles.vehicleText}>{selectedCar.registrationNo}</Text> : <Text style={styles.vehicleText}>Shto automjetin</Text>}
            </TouchableOpacity>
          </View>
          <View style={[defaultStyles.separator, { borderBottomColor: 'white' }]} />
        </View>

        <View style={{ gap: 25, justifyContent: 'space-between', flex: 1, marginTop: 5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <Text style={[defaultStyles.textBold16, { color: 'white' }]}>0h:00m, Valid thru</Text>
            <TimePicker/>
            <Text style={[defaultStyles.textBold16, { color: 'white' }]}>Price: --</Text>
            <Text style={[defaultStyles.textRegular16, { color: 'white' }]}>Incl. Service Fee</Text>
          </View>
          <Pressable style={[styles.button, {opacity: selectedCar ? 1 : 0.5}]} onPress={() => router.push('/(app)/(tabs)/home/payment')} disabled={!selectedCar}>
            <Text style={styles.buttonText}>Rezervo</Text>
          </Pressable>
        </View>
        <AddVehicleBottomSheet ref={bottomSheetRef} onSelectCar={(selectedCar) => handleCarSelected(selectedCar)} />
      </View>
    </SafeAreaView>
  )
}

export default TimeSelect

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  leftArrow: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
  zoneCard: {
    backgroundColor: Colors.secondaryColor,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneCardText: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    color: 'black'
  },
  polygonText: {
    fontFamily: 'OpenSansBold',
    fontSize: 28,
    color: 'white'
  },
  streetText: {
    fontFamily: 'OpenSans',
    fontSize: 15,
    color: 'white'
  },
  carImage: {
    height: 48,
    width: 48,
    resizeMode: 'contain'
  },
  vehicleText: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    color: 'white'
  },
  hoursSquare: {
    backgroundColor: Colors.backgroundGreenLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  hoursText: {
    fontFamily: 'OpenSansBold',
    fontSize: 60,
    color: Colors.blackSecondary
  },
  button: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4
  },
  buttonText: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    color: Colors.blackSecondary,
  }
})