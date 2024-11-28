import { StyleSheet } from "react-native";

export const reviewModalStyles = StyleSheet.create({
    modalStyle: {
        alignItems: "center"
    },
    contentContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 10,
        width: 325,
        height: 400,
    },
    contentBody: {
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
    headerText: {
        fontSize: 16,
        marginBottom: 20
    },
    buttonView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
    },
    scoreView: {
        alignItems: "center"
    },
    textInput: {
        height: 150,
        marginLeft: 20,
        marginRight: 20
    }
});

export const modalPickerStyles = {
    width: 120,
    backgroundColor: "#77dd77",
    color: "white",
    marginTop: 20
}
