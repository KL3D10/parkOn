import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { PolygonsData } from '@/assets/data/MapData';
import ParkingDataCards from '../parkingDataCards';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome6, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeOut, BounceIn, BounceOut, SlideInLeft, SlideOutRight } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles';
import { HomeSheetEnum } from '@/helpers/enums';


interface Props {
    title?: string
    screenIndex: number
    changeIndex: (step: number) => void
}
type Ref = BottomSheet;

const HomeBottomSheet = forwardRef<Ref, Props>((props, ref) => {

    const snapPoints = useMemo(() => ['32%', '47%', '90%'], []);

    const HomeSheetSteps: typeof HomeSheetEnum = HomeSheetEnum

    const [sheetIndex, setSheetIndex] = useState(0)
    const [selectedParking, setSelectedParking] = useState<any>({ id: 0 })
    const [homeSheetStep, setHomeSheetStep] = useState(HomeSheetSteps.NO_NEARBY)

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        setSheetIndex(index)
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={'none'} {...props} />, []
    )

    const onSelectItem = (item: any) => {
        setSelectedParking(item.item)
        props.changeIndex(2)
        setHomeSheetStep(HomeSheetSteps.DETAILS)
    }

    const handleShowResults = () => {
        props.changeIndex(1)
        setHomeSheetStep(HomeSheetSteps.SELECT)
    }

    const handleDetailsBack = () => {
        props.changeIndex(1)
        setHomeSheetStep(HomeSheetSteps.SELECT)
    }


    return (
        <BottomSheet
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            handleIndicatorStyle={{ backgroundColor: Colors.blackSecondary }}
            backgroundStyle={{ backgroundColor: Colors.backgroundGreen }}
            enableHandlePanningGesture={homeSheetStep !== HomeSheetSteps.DETAILS}
            enableContentPanningGesture={homeSheetStep !== HomeSheetSteps.DETAILS}
            onChange={handleSheetChanges}
            backdropComponent={props.screenIndex == 2 ? renderBackdrop : null}
        >
            {homeSheetStep === HomeSheetSteps.NO_NEARBY &&
                <BottomSheetView style={[styles.contentContainer, { alignItems: 'center' }]}>
                    <Text style={[defaultStyles.textRegular13, { color: 'black', marginTop: 10 }]}>No nearby parking areas found</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, paddingVertical: 10, gap: 5, width: '90%', borderColor: Colors.textGreen, borderBottomWidth: 1, borderRadius: 14 }}>
                        <Ionicons name="search" size={20} color={Colors.textGreen} />
                        <Text style={[defaultStyles.textBold16, { color: Colors.textGreen }]}>Search address or area code</Text>
                    </View>
                    <Pressable onPress={handleShowResults}>
                        <Ionicons name="add-circle" size={20} color={Colors.textGreen} style={{ marginTop: 10 }} />
                    </Pressable>
                </BottomSheetView>
            }
            {homeSheetStep === HomeSheetSteps.SELECT &&
                <BottomSheetView style={[styles.contentContainer, { paddingHorizontal: 20, gap: 8 }]}>
                    <Text style={[defaultStyles.textBold16, { color: 'black' }]}>Nearby Parking areas</Text>
                    <Text style={[defaultStyles.textRegular16, { color: 'black' }]}>Your GPS position might be uncertain</Text>
                    <View style={{ flex: 1, marginBottom: 10 }}>
                        <Animated.FlatList
                            exiting={FadeOut.duration(0.1)}

                            showsVerticalScrollIndicator={false}
                            data={PolygonsData}
                            renderItem={item => <ParkingDataCards item={item} onSelectItem={(item) => onSelectItem(item)} />}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={{ gap: 10 }}
                        />
                    </View>
                </BottomSheetView>
            }
            {homeSheetStep === HomeSheetSteps.DETAILS &&
                <BottomSheetView style={[styles.contentContainer, { paddingHorizontal: 20, gap: 8 }]}>
                    <TouchableOpacity style={{ marginBottom: 10 }} onPress={handleDetailsBack}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ gap: 5 }}>
                        <View style={styles.zoneCard}>
                            <Text style={styles.zoneCardText}>Zona 3</Text>
                        </View>
                        <Text style={styles.polygonText}>{selectedParking?.polygon}</Text>
                        <Text style={styles.streetText}>{selectedParking?.street}</Text>
                    </View>
                    <View style={defaultStyles.separator} />
                    <View style={{ gap: 15 }}>
                        <View style={{ gap: 5 }}>
                            <Text style={styles.informationText}>Important Area Information</Text>
                            <Text style={styles.zoneCardText}>Attention: from Nov. 2023, paid parking in Area C allowed for a maximum of 2 hours per parking area.</Text>
                        </View>
                        <Text style={styles.zoneCardText}>Price: <Text style={{fontFamily: 'OpenSansBold'}}>${selectedParking.price}</Text>/hr</Text>
                    </View>
                    <View style={defaultStyles.separator} />
                    <View style={{ gap: 5 }}>
                        <AntDesign name="clockcircleo" size={24} color={Colors.primaryColor} />
                        <Text style={styles.informationText}>Restrictions</Text>
                        <Text style={styles.zoneCardText}>Min. parking 0 minutes</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 15 }}>
                        <Pressable style={styles.button} onPress={() => router.push({ pathname: `/(app)/(tabs)/home/${selectedParking.id}`, params: selectedParking.item })}>
                            <Text style={styles.buttonText}>Park Here</Text>
                        </Pressable>
                    </View>
                </BottomSheetView>
            }
        </BottomSheet>
    )
})

export default HomeBottomSheet

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingVertical: 20,
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
        color: 'black'
    },
    streetText: {
        fontFamily: 'OpenSans',
        fontSize: 15,
        color: 'black'
    },
    informationText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: 'black'
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