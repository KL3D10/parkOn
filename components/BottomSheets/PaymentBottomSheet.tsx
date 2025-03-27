import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { AntDesign } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import MaskedCardText from '../maskedCardText'
import { Link } from 'expo-router'
import { PaymentSheetEnum } from '@/helpers/enums'

interface Props {
    title?: string
    onChangeIndex: (index: number) => void
    onConfirm: () => void
    onBackScreen: () => void
}
type Ref = BottomSheet;

const PaymentBottomSheet = forwardRef<Ref, Props>((props, ref) => {

    const snapPoints = useMemo(() => ['47%', '65%', '90%'], []);

    const PaymentSheetSteps: typeof PaymentSheetEnum = PaymentSheetEnum

    const [sheetIndex, setSheetIndex] = useState(0)

    const [paymentSheetStep, setPaymentSheetStep] = useState(PaymentSheetSteps.SAVED_CARD)

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={'none'} {...props} />, []
    )

    const handlePaymentContinue = () => {
        setPaymentSheetStep(PaymentSheetSteps.SUMMARY)
        props.onChangeIndex(2)
    }

    const handlePaymentConfirm = () => {
        props.onConfirm()
    }

    const handleAddNewCard = () => {
        setPaymentSheetStep(PaymentSheetSteps.NEW_CARD)
        props.onChangeIndex(1)
    }

    const handleGoBack = () => {
        switch (paymentSheetStep) {
            case PaymentSheetSteps.SAVED_CARD:
                props.onBackScreen()
                break;
            case PaymentSheetSteps.NEW_CARD:
                setPaymentSheetStep(PaymentSheetSteps.SAVED_CARD)
                props.onChangeIndex(0)
            case PaymentSheetSteps.SUMMARY:
                setPaymentSheetStep(PaymentSheetSteps.SAVED_CARD)
                props.onChangeIndex(0)
        }
    }

    return (
        <BottomSheet
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            handleIndicatorStyle={{ backgroundColor: Colors.blackSecondary }}
            backgroundStyle={{ backgroundColor: Colors.backgroundGreen }}
            enablePanDownToClose={false}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
            backdropComponent={renderBackdrop}
        >
            {paymentSheetStep !== PaymentSheetSteps.SUMMARY ?
                <BottomSheetView style={styles.contentContainer}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        { paymentSheetStep == PaymentSheetSteps.NEW_CARD && <BottomSheetView style={{ gap: 5 }}>
                            <Text style={defaultStyles.textRegular12}>Full Name</Text>
                            <BottomSheetTextInput style={styles.textInput} placeholder='Abby Adams' />
                        </BottomSheetView>}
                        { paymentSheetStep == PaymentSheetSteps.NEW_CARD && <BottomSheetView style={{ gap: 5 }}>
                            <Text style={defaultStyles.textRegular12}>Credit card number</Text>
                            <BottomSheetTextInput style={styles.textInput} placeholder='1234 1234 1234 1234' />
                        </BottomSheetView>}
                        <BottomSheetView style={{ flexDirection: 'row', gap: 7 }}>
                            <BottomSheetView style={{ gap: 5, flex: 1 }}>
                                <Text style={defaultStyles.textRegular12}>Exp Date</Text>
                                <BottomSheetTextInput style={styles.textInput} placeholder='MM/YY' />
                            </BottomSheetView>
                            <BottomSheetView style={{ gap: 5, flex: 1 }}>
                                <Text style={defaultStyles.textRegular12}>CVV</Text>
                                <BottomSheetTextInput style={styles.textInput} placeholder='***' />
                            </BottomSheetView>
                        </BottomSheetView>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={handlePaymentContinue}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <TouchableOpacity style={{alignItems: 'center', paddingVertical: 12,}} onPress={() => handleAddNewCard()}>
                                <Text style={styles.buttonText}>Add New Card</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheetView>
                :
                <BottomSheetView style={styles.contentContainer}>
                    <View style={[defaultStyles.flexRow, { gap: 5 }]}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headingText}>Review Summary</Text>
                    </View>
                    <View style={{ gap: 10, flex: 1 }}>
                        <View style={[defaultStyles.flexRow, styles.dataRow]}>
                            <Text style={styles.titleText}>Parking Area</Text>
                            <Text style={styles.headerText}>Zona C, Poligoni 02</Text>
                        </View>
                        <View style={[defaultStyles.flexRow, styles.dataRow]}>
                            <Text style={styles.titleText}>Address</Text>
                            <Text style={styles.headerText}>Rruga “Asim Zeneli”</Text>
                        </View>
                        <View style={[defaultStyles.flexRow, styles.dataRow]}>
                            <Text style={styles.titleText}>Vehicle</Text>
                            <Text style={styles.headerText}>Mercedes Benz (AA123AA)</Text>
                        </View>
                        <View style={[defaultStyles.flexRow, styles.dataRow]}>
                            <Text style={styles.titleText}>Date</Text>
                            <Text style={styles.headerText}>March 29, 2024</Text>
                        </View>
                        <View style={[defaultStyles.flexRow, styles.dataRow]}>
                            <Text style={styles.titleText}>Duration</Text>
                            <Text style={styles.headerText}>2 hour</Text>
                        </View>
                        <View style={[defaultStyles.flexRow, styles.dataRow]}>
                            <Text style={styles.titleText}>Hours</Text>
                            <Text style={styles.headerText}>16:00 PM - 18:00 PM</Text>
                        </View>
                        <View style={defaultStyles.separator} />
                        <View style={[defaultStyles.flexRow, styles.dataRow]}>
                            <Text style={styles.titleText}>Amount</Text>
                            <Text style={styles.headerText}>2.41 $</Text>
                        </View>
                        <View style={[defaultStyles.flexRow, styles.dataRow]}>
                            <Text style={styles.titleText}>Taxes & Fee (20%)</Text>
                            <Text style={styles.headerText}>0,41 $</Text>
                        </View>
                        <View style={[defaultStyles.flexRow, styles.dataRow, { marginTop: 15 }]}>
                            <Text style={styles.titleText}>Total</Text>
                            <Text style={styles.headerText}>2.90 $</Text>
                        </View>
                        <View style={defaultStyles.separator} />
                        <View style={[defaultStyles.flexRow, styles.dataRow, { marginTop: 15 }]}>
                            <View style={[defaultStyles.flexRow, { gap: 10 }]}>
                                <AntDesign name="creditcard" size={38} color={Colors.primaryColor} />
                                <MaskedCardText dotSize={8} lastNumbers={8014} dotColor={Colors.blackSecondary} />
                            </View>
                        </View>
                        <View style={{ marginTop: 'auto', marginBottom: 20 }}>
                            <TouchableOpacity style={styles.button} onPress={handlePaymentConfirm}>
                                <Text style={styles.buttonText}>Confirm Payment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheetView>
            }
        </BottomSheet>
    )
})

export default PaymentBottomSheet

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        gap: 25
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
    },
    headingText: {
        fontFamily: 'OpenSansBold',
        fontSize: 20,
        color: Colors.blackSecondary
    },
    dataRow: {
        justifyContent: 'space-between',
    },
    titleText: {
        fontFamily: 'OpenSans',
        fontSize: 13,
        color: Colors.blackSecondary
    }
})