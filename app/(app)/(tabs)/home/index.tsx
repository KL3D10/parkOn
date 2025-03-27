import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Image } from "expo-image"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import HeaderComponent from '@/components/headerComponent'
import { AnimationType, INFINITE_ANIMATION_ITERATIONS, LatLng, LeafletView, MapShapeType, WebViewLeafletEvents, WebviewLeafletMessage } from 'react-native-leaflet-view';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { centerScreenMarker, locationDotPng, locationPinSvg } from '@/constants/General'
import HomeBottomSheet from '@/components/BottomSheets/HomeBottomSheet'
import * as Location from 'expo-location';
import icons from '@/constants/Icons'
import { router } from 'expo-router'

type LatLngObject = { lat: number; lng: number };

const Home = () => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);
    const snapPoints = useMemo(() => ['30%', '40%', '65%'], []);
    const [screenIndex, setScreenIndex] = useState<number>(0)
    const [userPosition, setUserPosition] = useState<LatLng>({ lat: null, lng: null })
    const [mapCenterPosition, setMapCenterPosition] = useState<LatLng>({ lat: null, lng: null });
    const [mapMessage, setMapMessage] = useState<WebviewLeafletMessage | null>(null)
    const [mapShapes, setMapShapes] = useState([
        {
            shapeType: MapShapeType.POLYGON,
            color: "blue",
            id: "3",
            positions: [
                { lat: 41.328736, lng: 19.8169219 },
                { lat: 41.328961, lng: 19.818263 },
                { lat: 41.328252, lng: 19.8184239 },
                { lat: 41.32809, lng: 19.81707 }
            ]
        },
        {
            shapeType: MapShapeType.POLYGON,
            color: "blue",
            id: "5",
            positions: [
                { lat: 41.325521, lng: 19.81697559 },
                { lat: 41.3238134, lng: 19.8174047 },
                { lat: 41.3241357, lng: 19.8197221 },
                { lat: 41.325876, lng: 19.8190784 },
            ],
        },
    ])

    const onMessageReceived = (message: WebviewLeafletMessage) => {
        switch (message.event) {
            case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
                Alert.alert(
                    `Map Marker Touched, ID: ${message?.payload?.mapMarkerID || "unknown"}`
                );

                break;
            case WebViewLeafletEvents.ON_MAP_TOUCHED:
                const position: LatLngObject = message?.payload?.touchLatLng as LatLngObject
                Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
                break;
            default:
                console.log("App received", message);
                setMapCenterPosition(message?.payload?.mapCenterPosition)
        }
    };

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        // setSheetIndex(index)
    }, []);

    // useEffect(() => {
    //     (async () => {

    //       let location = await Location.getCurrentPositionAsync({});
    //       setUserPosition({lat: location.coords.latitude, lng: location.coords.longitude});
    //       setMapCenterPosition({lat: location.coords.latitude, lng: location.coords.longitude});
    //     })();
    //   }, []);

    const fetchLocation = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setUserPosition({ lat: latitude, lng: longitude });
            setMapCenterPosition({ lat: latitude, lng: longitude });
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    useEffect(() => {
        fetchLocation()
    }, [])


    const handleLocationArrowPress = () => { fetchLocation() }
    const snapToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index)

    const changeIndex = (step: number) => {
        bottomSheetRef.current?.snapToIndex(step)
        setScreenIndex(step)
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackBackground }} edges={['top']}>
            <HeaderComponent />
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.text} />
                    <TextInput placeholder='Search address or area code' placeholderTextColor={Colors.text} style={{ fontSize: 14, marginLeft: 8, color: Colors.text, flex: 1 }} />
                </View>
                <View style={styles.mapContainer}>
                    <LeafletView
                        mapLayers={[
                            {
                                attribution:
                                    '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                                baseLayerIsChecked: true,
                                baseLayerName: "OpenStreetMap.Mapnik",
                                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            }
                        ]}
                        mapCenterPosition={userPosition}
                        onMessageReceived={onMessageReceived}
                        ownPositionMarker={userPosition && {
                            id: '0',
                            icon: locationDotPng,
                            position: userPosition,
                            animation: {
                                type: AnimationType.PULSE,
                                duration: 4,
                                delay: 0.5,
                                iterationCount: 10
                            },
                        }}
                        mapShapes={mapShapes}
                        mapMarkers={[

                        ]}
                    />
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        <Image source={require('@/assets/images/centerScreenMarker.png')} contentFit='contain' style={{ height: 59, width: 44, marginBottom: 90 }} />
                    </View>
                    <TouchableOpacity style={styles.locationContainer} onPress={handleLocationArrowPress}>
                        <Image source={require('@/assets/images/locationArrowIcon.png')} style={{ height: 35, width: 35 }} contentFit='contain' />
                    </TouchableOpacity>
                </View>
                <HomeBottomSheet ref={bottomSheetRef} screenIndex={screenIndex} changeIndex={(step) => changeIndex(step)} />
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        width: '100%',
        height: '63%',
        alignItems: 'center'
    },
    locationContainer: {
        position: 'absolute',
        top: 25,
        right: 15,
        backgroundColor: Colors.blackSecondary,
        borderRadius: 50,
        padding: 5
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.blackSecondary,
        height: 44,
        marginBottom: 1,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: Colors.primaryColor,
        alignContent: 'center',
        padding: 10
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 20
    },
})