import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    separator: {
        padding: 4,
        borderBottomColor: Colors.blackSecondary,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    dottedSeparator: {
        padding: 4,
        borderBottomColor: Colors.blackSecondary,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'dashed',
    },
    textRegular10: {
        fontFamily: 'OpenSans',
        fontSize: 10
    },
    textRegular12: {
        fontFamily: 'OpenSans',
        fontSize: 12
    },
    textRegular13: {
        fontFamily: 'OpenSans',
        fontSize: 13
    },
    textRegular16: {
        fontFamily: 'OpenSans',
        fontSize: 16
    },
    textBold16: {
        fontFamily: 'OpenSansBold',
        fontSize: 16
    },
    textRegular20: {
        fontFamily: 'OpenSans',
        fontSize: 20
    },
    textBold20: {
        fontFamily: 'OpenSansBold',
        fontSize: 20
    },
    textBold22: {
        fontFamily: 'OpenSansBold',
        fontSize: 22
    },
    textBold28: {
        fontFamily: 'OpenSansBold',
        fontSize: 28
    },
    textBold40: {
        fontFamily: 'OpenSansBold',
        fontSize: 40
    },
})