import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { BlurView } from 'expo-blur'
import LottieView from 'lottie-react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

const paymentInvoice = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 17 }} bounces={false}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <TouchableOpacity onPress={() => router.replace('/(app)/(tabs)/home')}>
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={[defaultStyles.textBold20, { color: Colors.blackSecondary }]}>Invoice</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 30 }}>
                        <Text style={[defaultStyles.textRegular16, { color: Colors.blackSecondary }]}>Thank you for your purchase.</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', marginTop: 30, gap: 5 }}>
                        <Text style={[defaultStyles.textBold16, { color: 'black' }]}>ParkOn</Text>
                        <Text style={[defaultStyles.textRegular13, { color: Colors.blackSecondary }]}>+355 69 69 69 696</Text>
                        <Text style={[defaultStyles.textRegular13, { color: Colors.blackSecondary }]}>support@gmail.com</Text>
                        <Text style={[defaultStyles.textRegular13, { color: Colors.blackSecondary }]}>Tirane, Albania</Text>
                    </View>

                    <View style={defaultStyles.separator} />

                    <View style={{ marginTop: 10 }}>
                        <Text style={[defaultStyles.textBold16, { color: 'black' }]}>Customer Details</Text>
                        <View style={{ gap: 10 }}>
                            <View style={[defaultStyles.flexRow, styles.dataRow]}>
                                <Text style={styles.titleText}>Customer Name</Text>
                                <Text style={styles.headerText}>Abby Addams</Text>
                            </View>
                            <View style={[defaultStyles.flexRow, styles.dataRow]}>
                                <Text style={styles.titleText}>Customer Phone</Text>
                                <Text style={styles.headerText}>+355 69 69 699</Text>
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
                        </View>

                        <View style={defaultStyles.separator} />

                        <View style={{ marginTop: 10 }}>
                            <Text style={[defaultStyles.textBold16, { color: 'black' }]}>Summation</Text>
                            <View style={{ gap: 10 }}>
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
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Download PDF</Text>
                            <FontAwesome name="file-pdf-o" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 25, marginTop: 10, alignItems: 'center', marginBottom: 30 }}>
                        <Text style={[defaultStyles.textRegular16, { color: 'black' }]}>Have any concerns? Send us an email via</Text>
                        <Text style={[defaultStyles.textBold16, { color: 'black' }]}>contact@support.com</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default paymentInvoice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: '#f3fff9',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        height: '80%',
        width: '100%',
        paddingTop: 30,
        // marginBottom: 60
    },
    headerText: {
        fontFamily: 'OpenSansBold',
        color: Colors.blackSecondary,
        fontSize: 16
    },
    dataRow: {
        justifyContent: 'space-between',
    },
    titleText: {
        fontFamily: 'OpenSans',
        fontSize: 13,
        color: Colors.blackSecondary
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        gap: 10
    },
    buttonText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: Colors.blackSecondary,
    },
})