import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideOutRight, SlideInRight, BounceIn } from 'react-native-reanimated'
import { PolygonsData } from '@/assets/data/MapData';
import ParkingDataCards from '../parkingDataCards';
import { FontAwesome6, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CarsData } from '@/assets/data/CarData';
import CarInfoCard from '@/components/carInfoCard';
import { SelectCarSheetEnum } from '@/helpers/enums';
import { defaultStyles } from '@/constants/Styles';

interface Props {
    title?: string
    onSelectCar: (car: any) => void
}
type Ref = BottomSheet;

const AddVehicleBottomSheet = forwardRef<Ref, Props>((props, ref) => {

    const snapPoints = useMemo(() => ['60%'], []);

    const StepsEnum: typeof SelectCarSheetEnum = SelectCarSheetEnum

    const [carEditData, setCarEditData] = useState<any>({ registrationNo: '', carType: '' })
    const [newCar, setNewCar] = useState(false)
    const [sheetStep, setSheetStep] = useState(StepsEnum.SELECT)

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={'close'} {...props} />, []
    )

    const handleCarSelected = (selectedCar: any) => {
        props.onSelectCar(selectedCar)
    }

    const handleEditCar = (selectedCar: any) => {
        setCarEditData({ registrationNo: selectedCar.registrationNo, carType: selectedCar.type })
        setSheetStep(StepsEnum.EDIT)
    }

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            handleIndicatorStyle={{ backgroundColor: Colors.blackSecondary }}
            backgroundStyle={{ backgroundColor: Colors.backgroundGreen }}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
        >
            {sheetStep == StepsEnum.SELECT ?
                <BottomSheetView style={styles.contentContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.textContainer}>
                            <Animated.Text entering={BounceIn} style={styles.headerText}>Confirm vehicle</Animated.Text>
                            <Animated.Text entering={BounceIn} style={styles.subHeaderText}>Please enter correct details for vehicle rego!</Animated.Text>
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={CarsData}
                            renderItem={item => <CarInfoCard carData={item.item} onEdit={(selectedCar) => handleEditCar(selectedCar)} onSelect={(selectedCar) => handleCarSelected(selectedCar)} />}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={{ gap: 10 }}
                        />
                        <View style={{ marginTop: 'auto', marginBottom: 20 }}>
                            <Pressable style={styles.button} onPress={() => setSheetStep(StepsEnum.ADD_NEW)}>
                                <Text style={styles.buttonText}>Add New Vehicle</Text>
                            </Pressable>
                        </View>
                    </View>
                </BottomSheetView>
                :
                <BottomSheetView style={styles.contentContainer}>
                    <Animated.View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => setSheetStep(StepsEnum.SELECT)}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <BottomSheetView style={styles.textContainer}>
                            <Animated.Text entering={SlideInLeft} style={styles.headerText}>{newCar ? 'Add' : 'Edit'} vehicle</Animated.Text>
                            <Animated.Text entering={SlideInLeft} style={styles.subHeaderText}>Ploteso te dhenat e automjetit</Animated.Text>
                        </BottomSheetView>
                        <BottomSheetView style={{ gap: 5 }}>
                            <Animated.Text entering={SlideInLeft} style={defaultStyles.textRegular12}>Vehicle registration number</Animated.Text>
                            <BottomSheetTextInput style={styles.textInput} placeholder='Registration No.' value={carEditData?.registrationNo} />
                        </BottomSheetView>
                        <BottomSheetView style={{ gap: 5 }}>
                            <Animated.Text entering={SlideInLeft} style={defaultStyles.textRegular12}>Type of your car</Animated.Text>
                            <BottomSheetTextInput style={styles.textInput} placeholder='Type' value={carEditData?.carType} />
                        </BottomSheetView>
                        <View style={{ marginTop: 'auto', marginBottom: 20 }}>
                            <Pressable style={styles.button} onPress={() => { }}>
                                <Text style={styles.buttonText}>Save The Vehicle</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </BottomSheetView>
            }
        </BottomSheet>
    )
})

export default AddVehicleBottomSheet

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    topContainer: {
        gap: 20,
        // backgroundColor: 'red',
        flex: 1
    },
    textContainer: {
    },
    headerText: {
        fontFamily: 'OpenSansBold',
        color: Colors.blackSecondary,
        fontSize: 16
    },
    subHeaderText: {
        fontFamily: 'OpenSans',
        color: Colors.blackSecondary,
        fontSize: 16
    },
    carInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: Colors.blackSecondary
    },
    carImage: {
        height: 48,
        width: 48,
        resizeMode: 'contain'
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
    },
    textInput: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.borderGrey,
        paddingVertical: 13,
        paddingHorizontal: 10
    }
})